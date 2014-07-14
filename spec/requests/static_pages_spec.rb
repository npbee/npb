require 'rails_helper'

describe "StaticPages" do

  describe "#home" do
    before { visit root_path }

    it "Has the correct content" do
      expect(page).to have_css('.site-logo')
    end
  end
end