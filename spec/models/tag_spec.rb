require 'rails_helper'

RSpec.describe Tag, :type => :model do
  describe "Tag model" do
    before(:all) do
      @post = FactoryGirl.create(:post)
      @project = FactoryGirl.create(:project)
      @post_tag = FactoryGirl.create(:tag)
      @project_tag = FactoryGirl.create(:tag)
      @post_tag_relationship = FactoryGirl.create(:tag_relationship, { tag_id: @post_tag.id, reference_id: @post.id, reference_type: 'post' })
      @project_tag_relationship = FactoryGirl.create(:tag_relationship, { tag_id: @project_tag.id, reference_id: @project.id, reference_type: 'project' })
    end
    
    it "should respond to the proper attributes" do
      expect(@post_tag).to respond_to(:name)
      expect(@post_tag).to respond_to(:post_references)
      expect(@post_tag).to respond_to(:project_references)
    end

    it "should populate the post references" do
      expect(@post_tag.post_references).to include(@post)
      expect(@post_tag.post_references).to_not include(@project)
    end

    it "should populate the project references" do
      expect(@project_tag.project_references).to include(@project)
      expect(@project_tag.project_references).to_not include(@post)
    end

    after(:all) do
      @post.destroy
      @project.destroy
      @post_tag.destroy
      @project_tag.destroy
      @post_tag_relationship.destroy
      @project_tag_relationship.destroy
    end
  end
end
