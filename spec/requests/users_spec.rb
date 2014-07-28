require 'rails_helper'
require 'support/requests_spec_helper'

RSpec.describe "User", :type => :request do
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
    end

    ###############
    # NOT LOGGED IN
    ###############
    context "When not logged in" do

      user_resources = %w(/users /users/new)

      user_resources.each do |url|
        describe "user path '#{url}'" do
          before { visit url }
          it "should not allow access" do
            expect(page.current_path).to eq('/')
          end
        end
      end

    end

    ###############
    # When logged in as guest
    ###############
    context "When logged in as a guest" do
      before do
        login_user('guest@guest.com', 'guessing')
      end

      user_resources = %w(/users /users/new)

      user_resources.each do |url|
        describe "user path '#{url}'" do
          before { visit url }
          it "should not allow access" do
            expect(page.current_path).to eq('/')
          end
        end
      end

    end

    ###############
    # When logged in as an admin
    ###############
    context "When logged in as an admin" do
      before { login_user('admin@admin.com', 'foobar85') }

      user_resources = %w(/users /users/new)

      user_resources.each do |url|
        describe "user path '#{url}'" do
          before { visit url }
          it "should allow access" do
            expect(page.current_path).to eq(url)
          end
        end
      end

    end
    
    after(:all) do
      @admin.destroy
      @guest.destroy
    end
  end
end
