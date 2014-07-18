require 'rails_helper'
require 'support/requests_spec_helper'

RSpec.describe "Posts", :type => :request do
  include RequestsSpecHelper
  
  describe "Post requests" do
    before do
      @user = FactoryGirl.create(:user)
    end

    context "when not logged in" do
      context "and accessing the post index page" do
        before { visit '/blog' }
        it "should allow for anyone to access it" do
          expect(page.current_path).to eq('/blog')
        end
      end

      context "and accessing a post creation page" do
        before { visit '/posts/new' }
        it "should redirect to the login page" do
          expect(page.current_path).to eq('/login')
        end
      end
   
      context "and accessing a post edit page" do
        before do
          @post = FactoryGirl.create(:post)
          visit edit_post_path(@post)
        end

        it 'should redirect to the login page' do
          expect(page.current_path).to eq('/login')
        end

      end

      context "and accessing a post show page" do
        before do
          @post = FactoryGirl.create(:post, { user_id: @user.id })
          visit post_path(@post)
        end
        it "should not have an edit link" do
          expect(page).to_not have_content('Edit')
        end
      end
    end

    context "when logged in" do
      before do
        login_user("test@test.com", "foobar85")
        @post = FactoryGirl.create(:post, { user_id: @user.id })
        visit post_path(@post)
      end
      it "should display an edit link on a post page" do
        expect(page).to have_content('Edit')
      end
    end

    describe "associating a user to a post" do
      before do
        @post = FactoryGirl.create(:post, { user_id: @user.id })
      end
      it "should retrieve the user on a post" do
        expect(@post.user).to eq(@user)
      end
    end

    describe "correct content on posts index" do
      before do
        @post = FactoryGirl.create(:post)
        visit posts_path
      end
      it "should display post excerpts" do
        expect(page).to have_content(@post.excerpt)
      end
    end
  end
end
