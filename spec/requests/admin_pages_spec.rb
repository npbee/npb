require 'rails_helper'
require 'support/requests_spec_helper'

describe "Admin pages" do
  include RequestsSpecHelper

  describe "home page autorization" do
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

  describe "Updating user accepting_projects attribute" do
    before do
      @user = FactoryGirl.create(:user)
      login_user('test@test.com', 'foobar85')
      visit '/admin'
    end

    it 'should default to false' do
      expect(page).to have_content('Not Available')
    end

    describe "when checked" do
      before do 
        check('user_accepting_projects')
        click_on('Save Changes')
      end

      it "should update the user attribute" do
        expect(page).to_not have_content('Not Available')
      end
    end

    #it 'should update the user attributes' do
     # expect(page).to have_content('You ARE currently accepting projects.')
    #end
  end

end
