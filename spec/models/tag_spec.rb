require 'rails_helper'

RSpec.describe Tag, :type => :model do
  describe "Tag model" do
    before do
      @tag = FactoryGirl.create(:tag)
      @post = FactoryGirl.create(:post)
      @tag_relationship = FactoryGirl.create(:tag_relationship, { tag_id: @tag.id, reference_id: @post.id })
    end
    
    it "should respond to the proper attributes" do
      expect(@tag).to respond_to(:name)
      expect(@tag).to respond_to(:post_references)
    end

    it "should populate the references" do
      expect(@post.tags).to include(@tag)
      expect(@tag.post_references).to include(@post)
    end
  end
end
