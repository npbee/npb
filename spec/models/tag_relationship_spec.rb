require 'rails_helper'

RSpec.describe TagRelationship, :type => :model do
  describe "TagRelationship model" do
    before do
      @tag_relationship = FactoryGirl.create(:tag_relationship)
    end

    it "should respond to the proper attributes" do
      expect(@tag_relationship).to respond_to(:tag_id)
      expect(@tag_relationship).to respond_to(:reference_id)
      expect(@tag_relationship).to respond_to(:type)
    end
  end
end
