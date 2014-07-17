require 'rails_helper'

describe "StaticPages" do

  describe "#home" do
    before do
      @user = FactoryGirl.create(:user)
      @post1 = FactoryGirl.create(:post, { title: "Post 1 Title", user_id: @user.id })
      @post2 = FactoryGirl.create(:post, { title: "Post 2 Title", user_id: @user.id })
      visit root_path
    end

    it "Has the correct content" do

      # Is the logo on the page?
      expect(page).to have_css('.site-logo')

      # Check to make sure we have the right links on the page
      expect(page).to have_content('Post 2 Title')
    end
  end

  describe "#connect" do
    before { visit '/connect' }

    it "Has the correct content" do
      expect(page).to have_content('Email Me')
      expect(page).to have_content('Connect')
    end

  end
end
