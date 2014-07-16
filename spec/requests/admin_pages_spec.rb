require 'rails_helper'
require 'support/requests_spec_helper'

describe "Admin pages" do
  include RequestsSpecHelper

  describe "home page" do
    describe "when not logged in" do
      before { visit '/admin' }

      it "should redirect to the login page" do
        expect(current_path).to eq('/login')
      end
    end

    describe "when logged in" do
      before do
        @user = FactoryGirl.create(:user)
        login_user('test@test.com', 'foobar85')
      end

      it "should allow the admin home page to load" do
        expect(current_path).to eq('/admin')
      end
    end
  end
end
