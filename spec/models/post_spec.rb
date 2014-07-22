require 'rails_helper'

RSpec.describe Post, :type => :model do
  describe "Post Model" do
    before do
      @post = FactoryGirl.create(:post)
    end

    it "should respond to the right attributes" do
      expect(@post).to respond_to(:title)
      expect(@post).to respond_to(:body)
      expect(@post).to respond_to(:slug)
      expect(@post).to respond_to(:tags)
      expect(@post).to respond_to(:published)
    end

    describe "title validation" do
      context "when title is submitted without content" do
        before { @post.title = '' } 
        it "should not be valid" do
          expect(@post).to_not be_valid
        end
      end
    end

    describe "body validation" do
      context "when body is submitted without content" do
        before { @post.body = '' }
        it "should not be valid" do 
          expect(@post).to_not be_valid
        end
      end
    end

    describe "slug validation" do
      context "when slug is submitted without content" do
        before { @post.slug = '' }
        it "should not be valid" do
          expect(@post).to_not be_valid
        end
      end

      context "when slug has special characters" do
        before { @post.slug = 'post#2' }
        it "should not be valid" do
          expect(@post).to_not be_valid
        end
      end

    end

    describe "tag retrieval" do
      before do
        @post_tag = FactoryGirl.create(:tag, { name: "Post Tag" })
        @project_tag = FactoryGirl.create(:tag, { name: "Project Tag" })
        @project = FactoryGirl.create(:project)
        @post_tag_relationship = FactoryGirl.create(:tag_relationship, { tag_id: @post_tag.id, reference_id: @post.id, reference_type: 'post' })
        @project_tag_relationship = FactoryGirl.create(:tag_relationship, { tag_id: @project_tag.id, reference_id: @project.id, reference_type: 'project' })
      end

      it "should retrieve only the post tags" do
        expect(@post.tags).to include(@post_tag)
      end

      it "should not retrive the project tags" do
        expect(@post.tags).to_not include(@project_tag)
      end
    end
  end
end
