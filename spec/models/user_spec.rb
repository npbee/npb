require 'rails_helper'

RSpec.describe User, :type => :model do
  describe "Model" do

    before(:all) do
      @user = FactoryGirl.build(:user)
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
      before { @user.email = "" }
      it "should not be valid" do
        expect(@user).to_not be_valid
      end
      after { @user.email = "test@test.com" }
    end

    describe "when password is empty" do
      before { @user.password = '' }
      it "should not be valid" do
        expect(@user).to_not be_valid
      end
      after { @user.password = 'foobar85' }
    end

    describe "when passwords do not match" do
      before { @user.password_confirmation = 'foobar86' }
      it 'should not be valid' do
        expect(@user).to_not be_valid
      end
      after { @user.password_confirmation = 'foobar85' }
    end

    describe "Accepting Projects" do
      it "should be false by default" do
        expect(@user.accepting_projects).to eq(false)
      end
    end
    
  end
end
