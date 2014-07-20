require 'rails_helper'

describe "StaticPages" do
  before do
    @user = FactoryGirl.create(:user, { name: 'Nick' })
  end

  describe "#home" do
    before do
      @post1 = FactoryGirl.create(:post, { title: "Post 1 Title", user_id: @user.id })
      @post2 = FactoryGirl.create(:post, { title: "Post 2 Title", user_id: @user.id })
      @private_post = FactoryGirl.create(:post, { title: "Private Post", user_id: @user.id, published: false })
      @project1 = FactoryGirl.create(:project, { name: "Project 1 Title" })
      @project2 = FactoryGirl.create(:project, { name: "Project 2 Title" })
      visit root_path
    end

    it "Has the correct content" do

      # Is the logo on the page?
      expect(page).to have_css('.site-logo')

      # Check to make sure we have the right links on the page
      expect(page).to have_content('Post 2 Title')
      expect(page).to have_content('Project 2 Title')
    end

    it "does not show the private post" do
      expect(page).to_not have_content(@private_post.title)
    end
  end

  describe "#connect" do
    before { visit '/connect' }

    it "Has the correct content" do
      expect(page).to have_content('Email Me')
    end

  end
end
