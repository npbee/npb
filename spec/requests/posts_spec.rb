require 'rails_helper'

RSpec.describe "Posts", :type => :request do
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
    end
    describe "associating a user to a post" do
      before do
        @post = FactoryGirl.create(:post, { user_id: @user.id })
      end
      it "should retrieve the user on a post" do
        expect(@post.user).to eq(@user)
      end
    end
  end
end
