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
        @tag = FactoryGirl.create(:tag)
        @tag_relationship = FactoryGirl.create(:tag_relationship, { tag_id: @tag.id, reference_id: @post.id })
      end

      it "should retrive the right tags" do
        expect(@post.tags).to include(@tag)
      end
    end
  end
end
