require 'rails_helper'
require 'support/requests_spec_helper'

RSpec.describe "Project", :type => :request do
  include RequestsSpecHelper
  
  describe "requests::" do

    before(:all) do
      @guest = FactoryGirl.create(:user, { name: 'Guest' })
      @admin = FactoryGirl.create(:user, { name: 'Admin', email: 'admin@test.com', admin: true })
      @project = FactoryGirl.create(:project, { user_id: @admin.id })
      @post = FactoryGirl.create(:post)
      @private_project = FactoryGirl.create(:project, { name: "Private Project", published: false })
    end


    ###############
    # NOT LOGGED IN
    ###############
    context "When not logged in" do
      describe "the project index page" do
        before { visit '/projects' }
        it "should be accessible" do
          expect(page.current_path).to eq('/projects')
        end
      end

      describe "the project creation page" do
        before { visit '/projects/new' }
        it "should not be accessible" do
          expect(page.current_path).to eq('/login')
        end
      end
   
      describe "the project edit page" do
        before { visit edit_project_path(@project) }
        it "should not be accessible" do
          expect(page.current_path).to eq('/login')
        end
      end

      describe "a published project" do
        before { visit project_path(@project) }
        it "should be accessible" do
          expect(page.current_path).to eq(project_path(@project))
        end
        it "should not have an edit link" do
          expect(page).to_not have_content('Edit')
        end
      end

      describe "a private project" do
        before { visit project_path(@private_project) }
        it "should not be accessible" do
          expect(page.current_path).to eq('/')
        end
      end

    end

    ###############
    # LOGGED IN AS GUEST
    ###############
    context "When logged in as guest" do
      before do
        login_user("test@test.com", "foobar85")
        visit project_path(@project)
      end

      describe "a project page" do
        it "should not have an edit link" do
          expect(page).to_not have_content('Edit')
        end
      end

     describe "project creation" do 
       before do
         visit new_project_path
         fill_in "Name", with: "My Name"
         fill_in "Role", with: "My Role"
         fill_in "Url", with: "Url"
         fill_in "Date completed", :with => "07/19/2014"
         fill_in "Body", with: "My Body"
         fill_in "Logo", with: "/logo.jpg"
         fill_in "Thumbnail", with: "/thumbnail.jpg"
         fill_in "Small screen", with: "/small.jpg"
         fill_in "Medium screen", with: "/medium.jpg"
         fill_in "Large screen", with: "/large.jpg"
         fill_in "Tag list", with: "ruby, javascript"
         fill_in "Slug", with: "my-slug"
       end

       it "should not be allowed" do
         expect{ click_button "Create Project" }.not_to change(Project, :count)
       end
     end

      describe "projecting editing" do
        before do
          visit edit_project_path(@project)
          fill_in "Name", with: "My new name"
          click_on "Update Project"
        end
        it "should not be allowed" do
          expect(@project.name).to eq('MyString')
        end
      end 
      
      describe "a private project" do
        before do
          visit project_path(@private_project)
        end
        it "should not be accessible" do
          expect(page.current_path).to eq('/')
        end
      end


    end

    ###############
    # LOGGED IN AS ADMIN
    ###############
    context "When logged in as an admin" do
       before do
         login_user('admin@test.com', 'foobar85')
         visit project_path(@project)
       end

       describe "a project page" do
         it "should have an edit link" do
           expect(page).to have_content('Edit')
         end
       end
      
       describe "projecting updating" do
         before do
           visit edit_project_path(@project)
           fill_in "Name", with: "My new name"
           click_on "Update Project"
         end
         it "should be allowed" do
           expect(page).to have_content('My new name')
         end
       end

   end
  
   ################
   # OTHER
   ################
    describe "the projects index page" do
      before do
        visit projects_path
      end
      it "should display projects thumbs of published projects" do
        expect(page).to_not have_content(@private_project.name)
      end
    end

    after(:all) do
      @guest.destroy
      @admin.destroy
      @project.destroy
      @post.destroy
      @private_project.destroy
    end

  end
end
