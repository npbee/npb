require 'rails_helper'

describe "Admin pages" do

    describe "home page" do

      describe "when not logged in" do
        before { visit '/admin' }

        it "should redirect to the login page" do
          expect(current_path).to eq('/login')
        end
      end

      describe "when logged in" do
        before do
          @user = User.new(email: "nick@example.com", password: "foobar85", password_confirmation: "foobar85")
          @user = login(@user.email, @user.password)
          visit { '/admin' }
        end

        it "should redirect to admin page" do
          expect(current_path).to eq('/admi')
        end
      end
    end
  end