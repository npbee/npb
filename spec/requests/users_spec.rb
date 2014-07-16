require 'rails_helper'
require 'support/requests_spec_helper'

RSpec.describe "Users", :type => :request do
  include RequestsSpecHelper
  
  describe "User pages" do
    before do
      @user = FactoryGirl.create(:user)
    end

    context "when not logged in" do
      before { visit '/users/' }
      it "should redirect to the login page" do
        expect(page.current_path).to eq('/login')
      end
    end

    context "when logged in" do
      before do
        login_user('test@test.com', 'foobar85')
        visit '/users'
      end

      it 'should allow access to the page' do
        expect(page.current_path).to eq('/users')
      end
    end
  end
end
