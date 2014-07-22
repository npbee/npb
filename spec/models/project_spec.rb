require 'rails_helper'

RSpec.describe Project, :type => :model do
  describe "Project Model" do
    before do
      @project = FactoryGirl.create(:project)
    end

    it "should respond to the right attributes" do
      expect(@project).to respond_to(:name)
      expect(@project).to respond_to(:role)
      expect(@project).to respond_to(:url)
      expect(@project).to respond_to(:date_completed)
      expect(@project).to respond_to(:body)
      expect(@project).to respond_to(:logo)
      expect(@project).to respond_to(:thumbnail)
      expect(@project).to respond_to(:small_screen)
      expect(@project).to respond_to(:medium_screen)
      expect(@project).to respond_to(:large_screen)
      expect(@project).to respond_to(:user)
      expect(@project).to respond_to(:tags)
      expect(@project).to respond_to(:slug)
    end
    
    describe "when name is submitted blank" do
      before { @project.name = '' }
      it "should not be valid" do
        expect(@project).to_not be_valid
      end
    end

    describe "when role is submitted blank" do
      before { @project.role = '' }
      it "should not be valid" do
        expect(@project).to_not be_valid
      end
    end

    describe "when url is submitted blank" do
      before { @project.url = '' }
      it "should not be valid" do
        expect(@project).to_not be_valid
      end
    end

    describe "when body is submitted blank" do
      before { @project.body = '' }
      it "should not be valid" do
        expect(@project).to_not be_valid
      end
    end

    describe "when logo is submitted blank" do
      before { @project.logo = '' }
      it "should not be valid" do
        expect(@project).to_not be_valid
      end
    end

    describe "when thumbnail is submitted blank" do
      before { @project.thumbnail = '' }
      it "should not be valid" do
        expect(@project).to_not be_valid
      end
    end

    describe "tag retrieval" do
      before do
        @tag = FactoryGirl.create(:tag)
        @tag_relationship = FactoryGirl.create(:tag_relationship, { reference_id: @project.id, tag_id: @tag.id, reference_type: 'project' })
      end

      it "should retrive the tags" do
        expect(@project.tags).to include(@tag)
      end
    end

    describe "screenshot file extension types" do
      context "when file extension is wrong" do
        before do
          @project.thumbnail = '/luray/logo.smg'
        end

        it "should not be valid" do
          expect(@project).to_not be_valid
        end
      end

      context "when file extension is correct" do
        before do
          @project.small_screen = '/luray/small.jpg'
        end

        it "should be valid" do
          expect(@project).to be_valid
        end
      end
    end

  end
end
