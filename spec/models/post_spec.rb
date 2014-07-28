require 'rails_helper'

RSpec.describe Post, :type => :model do
  describe "Post Model" do
    before(:all) do
      @post = FactoryGirl.create(:post)
      @project = FactoryGirl.create(:project)
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
        after { @post.title = 'MyTitle' }
      end
    end

    describe "body validation" do
      context "when body is submitted without content" do
        before { @post.body = '' }
        it "should not be valid" do 
          expect(@post).to_not be_valid
        end
        after { @post.body = 'MyBody' }
      end
    end

    describe "slug validation" do
      context "when slug is submitted without content" do
        before { @post.slug = '' }
        it "should not be valid" do
          expect(@post).to_not be_valid
        end
        after { @post.slug = 'my-slug-1' }
      end

      context "when slug has special characters" do
        before { @post.slug = 'post#2' }
        it "should not be valid" do
          expect(@post).to_not be_valid
        end
        after { @post.slug = 'my-slug-1' }
      end

      context "when slug is not unique" do
        before do
          @new_post = FactoryGirl.build(:post, { slug: @post.slug })
        end
        it "should not be valid" do
          expect(@new_post).to_not be_valid
        end
      end

      context "when a slug is unique" do
        before do
          @new_post = FactoryGirl.build(:post)
        end
        it "should be valid" do
          expect(@new_post).to be_valid
        end
      end

    end

    describe "tag retrieval" do
      before(:all) do
        @post_tag = FactoryGirl.create(:tag, { name: "Post Tag" })
        @project_tag = FactoryGirl.create(:tag, { name: "Project Tag" })
        @post_tag_relationship = FactoryGirl.create(:tag_relationship, { tag_id: @post_tag.id, reference_id: @post.id, reference_type: 'post' })
        @project_tag_relationship = FactoryGirl.create(:tag_relationship, { tag_id: @project_tag.id, reference_id: @project.id, reference_type: 'project' })
      end

      it "should retrieve only the post tags" do
        expect(@post.tags).to include(@post_tag)
      end

      it "should not retrive the project tags" do
        expect(@post.tags).to_not include(@project_tag)
      end

      after(:all) do
        @post_tag.destroy
        @project_tag.destroy
        @post_tag_relationship.destroy
        @project_tag_relationship.destroy
      end
    end

    after(:all) do
      @post.destroy
      @project.destroy
    end
  end
end
