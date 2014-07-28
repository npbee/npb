require 'rails_helper'
require 'support/requests_spec_helper'

RSpec.describe "Tag", :type => :request do
  include RequestsSpecHelper
  
  describe "requests::" do

    before(:all) do
      @admin = FactoryGirl.create(:user, {
                                    name: "Admin",
                                    email: "admin@admin.com",
                                    password: "foobar85",
                                    password_confirmation: "foobar85",
                                    admin: true })
      @guest = FactoryGirl.create(:user, { 
                                    name: "Guest",
                                    email: "guest@guest.com",
                                    password: "guessing",
                                    password_confirmation: "guessing",
                                    admin: false })
      @tag = FactoryGirl.create(:tag)
    end

    ###############
    # NOT LOGGED IN
    ###############
    context "When not logged in" do

      describe "the tag index page" do
        before { visit '/tags' }
        it "should be accessible" do
          expect(page.current_path).to eq('/tags')
        end
      end

      describe "the tag creation page" do
        before { visit '/tags/new' }
        it "should not be accessible" do
          expect(page.current_path).to eq('/login')
        end
      end
   
      describe "the tag editing page" do
        before { visit edit_tag_path(@tag) }
        it "should not be accessible" do
          expect(page.current_path).to eq('/login')
        end
      end

      describe "the tag show page" do
        before { visit tag_path(@tag) }
        it "should not have an edit link" do
          expect(page).to_not have_content('Edit')
        end
      end

    end

    ###############
    # LOGGED IN AS GUEST
    ###############
    context "When logged in as a guest" do
      before do
        login_user("guest@guest.com", "guessing")
      end

      describe "the tag show page" do
        before { visit tag_path(@tag) }
        it "should not have an edit link" do
          expect(page).to_not have_content('Edit')
        end
      end
      
    end
    
    ###############
    # LOGGED IN AS ADMIN
    ###############
    context "When logged in as an admin" do
      before do
        login_user("admin@admin.com", "foobar85")
        visit tag_path(@tag)
      end

      describe "the tag show page" do
        it "should have an edit link" do
          expect(page).to have_content('Edit')
        end
      end
    end

    after(:all) do
      @admin.destroy
      @guest.destroy
      @tag.destroy
    end
    
  end
end

