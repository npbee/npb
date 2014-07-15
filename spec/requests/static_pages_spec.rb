require 'rails_helper'

describe "StaticPages" do

  describe "#home" do
    before { visit root_path }

    it "Has the correct content" do

      # Is the logo on the page?
      expect(page).to have_css('.site-logo')

      # Check to make sure we have the right links on the page
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