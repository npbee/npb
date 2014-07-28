require 'rails_helper'
require 'support/requests_spec_helper'

RSpec.describe "Post", :type => :request do
  include RequestsSpecHelper
  
  describe "requests::" do
    before(:all) do
      @guest = FactoryGirl.create(:user)
      @admin = FactoryGirl.create(:user, { email: 'admin@test.com', admin: true })
      @post = FactoryGirl.create(:post, { user_id: @admin.id })
      @project = FactoryGirl.create(:project)
      @private_post = FactoryGirl.create(:post, { title: "My Private Post", published: false })
    end


    ###############
    # NOT LOGGED IN
    ###############
    context "When not logged in" do
      describe "the post index page" do
        before { visit '/blog' }
        it "should be accessible" do
          expect(page.current_path).to eq('/blog')
        end
      end

      describe "the post creation page" do
        before { visit '/posts/new' }
        it "should not be accessible" do
          expect(page.current_path).to eq('/login')
        end
      end
   
      describe "the post edit page" do
        before { visit edit_post_path(@post) }
        it 'should not be accessible' do
          expect(page.current_path).to eq('/login')
        end
      end

      describe "a published post" do
        before { visit post_path(@post) }
        it "should be accessible" do
          expect(page.current_path).to eq(post_path(@post))
        end

        it "should not have an edit link" do
          expect(page).to_not have_content('Edit')
        end
      end

      describe "a private post" do
        before { visit post_path(@private_post) }
        it "should not be accessible" do
          expect(page.current_path).to eq(root_path)
        end
      end
    end

    ###############
    # LOGGED IN AS GUEST
    ###############
    context "When logged in as a guest" do
      before do
        login_user("test@test.com", "foobar85")
        visit post_path(@post)
      end

      describe "the edit link on a post page" do
        it "should not be visible" do
          expect(page).to_not have_content('Edit')
        end
      end

      describe "post creation" do 
        before do
          visit new_post_path
        end

        it "should not be allowed" do
          fill_in "Title", with: "My Title"
          fill_in "post[body]", with: "My Body"
          fill_in "Slug", with: "My-Slug"
          fill_in "Excerpt", with: "My Excerpt"
          expect{ click_button "Create Post" }.not_to change(Post, :count)
        end
      end

      describe "post editing" do
        before do
          visit edit_post_path(@post)
          fill_in "Title", with: "My new title"
          click_on "Update Post"
        end
        it "should not be allowed" do
          expect(@post.title).to eq('MyTitle')
        end
      end

      describe "a published post" do
        before do
          visit post_path(@post)
        end
        it "should be accessible" do
          expect(page.current_path).to eq(post_path(@post))
        end
      end

      describe "a private post" do
        before do
          visit post_path(@private_post)
        end
        it "should not be accessible" do
          expect(page.current_path).to eq('/')
        end
      end

    end

    ###############
    # LOGGED IN AS ADMIN
    ###############
    context "When logged in as an admin" do
       before do
         login_user('admin@test.com', 'foobar85')
         visit post_path(@post)
       end

       describe "the edit link on a post" do
         it "should be visible" do
           expect(page).to have_content('Edit')
         end
       end

       describe "post creation" do
         before { visit new_post_path }
         it "should be allowed" do
           fill_in "Title", with: "My Title"
           fill_in "post[body]", with: "My Body"
           fill_in "Slug", with: "My-Slug"
           fill_in "Excerpt", with: "My Excerpt"
           expect{ click_button "Create Post" }.to change(Post, :count).by(1)
         end
       end

       describe "post editing" do
         before do
           visit edit_post_path(@post)
           fill_in "Title", with: "My new Title"
           click_on "Update Post"
         end
         it "should be allowed" do
           expect(page).to have_content('My new Title')
         end
       end

       describe "a private post" do
         before do
           visit post_path(@private_post)
         end
         it "should be accessible" do
           expect(page.current_path).to eq(post_path(@private_post))
         end
       end

    end
  
    ###############
    # OTHER
    ###############
    describe "the posts index page" do
      before do
        visit posts_path
      end
      it "should display post excerpts only for published posts" do
        expect(page).not_to have_content(@private_post.title)
      end
    end

    after(:all) do
      @guest.destroy
      @admin.destroy
      @post.destroy
      @project.destroy
      @private_post.destroy
    end
  end
end
