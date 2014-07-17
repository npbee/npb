require 'rails_helper'
require 'support/requests_spec_helper'

RSpec.describe "Tags", :type => :request do
  include RequestsSpecHelper
  
  describe "Tag requests" do
    before do
      @user = FactoryGirl.create(:user)
    end

    context "when not logged in" do
      context "and accessing the tag index page" do
        before { visit '/tags' }
        it "should allow for anyone to access it" do
          expect(page.current_path).to eq('/tags')
        end
      end

      context "and accessing a tag creation page" do
        before { visit '/tags/new' }
        it "should redirect to the login page" do
          expect(page.current_path).to eq('/login')
        end
      end
   
      context "and accessing a tag edit page" do
        before do
          @tag = FactoryGirl.create(:tag)
          visit edit_tag_path(@tag)
        end

        it 'should redirect to the login page' do
          expect(page.current_path).to eq('/login')
        end

      end

      context "and accessing a tag show page" do
        before do
          @tag = FactoryGirl.create(:tag)
          visit tag_path(@tag)
        end
        it "should not have an edit link" do
          expect(page).to_not have_content('Edit')
        end
      end
    end

    context "when logged in" do
      before do
        login_user("test@test.com", "foobar85")
        @tag = FactoryGirl.create(:tag)
        visit tag_path(@tag)
      end
      it "should display an edit link on a tag page" do
        expect(page).to have_content('Edit')
      end
    end

  end
end

