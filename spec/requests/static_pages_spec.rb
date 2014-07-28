require 'rails_helper'

RSpec.describe "Static Page", :type => :request do
  describe "requests::" do
    before(:all) do
      @user = FactoryGirl.create(:user, { name: 'Nick' })
    end

    context "The home page" do
      before(:all) do
        @post1 = FactoryGirl.create(:post, { title: "Post 1 Title", user_id: @user.id })
        @post2 = FactoryGirl.create(:post, { title: "Post 2 Title", user_id: @user.id })
        @private_post = FactoryGirl.create(:post, { title: "Private Post", user_id: @user.id, published: false })
        @project1 = FactoryGirl.create(:project, { name: "Project 1 Title" })
        @project2 = FactoryGirl.create(:project, { name: "Project 2 Title" })
      end

      before(:each) do
        visit root_path
      end

      it "should list the most recently created published post" do
        expect(page).to have_content('Post 2 Title')
      end

      it "should list the most recently created published project" do
        expect(page).to have_content('Project 2 Title')
      end

      after(:all) do
        @post1.destroy
        @post2.destroy
        @private_post.destroy
        @project1.destroy
        @project2.destroy
      end
    end

    context "The Conenct page" do
      before { visit '/connect' }
      it "should have an email me link" do
        expect(page).to have_content('Email Me')
      end
    end

    after(:all) do
      @user.destroy
    end
  end
end
