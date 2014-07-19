require 'rails_helper'

RSpec.describe User, :type => :model do
  describe "Model" do

    before do
      @user = FactoryGirl.create(:user)
    end

    describe "proper attributes" do
      it "should respond to the proper values" do
        expect(@user).to respond_to(:email)
        expect(@user).to respond_to(:password)
        expect(@user).to respond_to(:password_confirmation)
        expect(@user).to respond_to(:accepting_projects)
        expect(@user).to respond_to(:admin)
      end
    end

    describe "when email is empty" do
      before do
        @user.email = ""
      end

      it "should not be valid" do
        expect(@user).to_not be_valid
      end
    end

    describe "when password is empty" do
      before { @user.password = '' }

      it "should not be valid" do
        expect(@user).to_not be_valid
      end
    end

    describe "when passwords do not match" do
      before do
        @user.password = 'foobar85'
        @user.password_confirmation = 'foobar86'
      end

      it 'should not be valid' do
        expect(@user).to_not be_valid
      end
    end

    describe "Accepting Projects" do
      it "should be false by default" do
        expect(@user.accepting_projects).to eq(false)
      end
    end
    
  end
end
