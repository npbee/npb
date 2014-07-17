require 'rails_helper'

RSpec.describe Post, :type => :model do
  describe "Post Model" do
    before do
      @post = FactoryGirl.create(:post)
    end

    it "should respond to the right attributes" do
      expect(@post).to respond_to(:title)
      expect(@post).to respond_to(:body)
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
  end
end
