require 'rails_helper'
require 'support/requests_spec_helper'

RSpec.describe "Projects", :type => :request do
  include RequestsSpecHelper
  
  describe "requests" do
    before do
      @guest = FactoryGirl.create(:user)
      @admin = FactoryGirl.create(:user, { email: 'admin@test.com', admin: true })
      @project = FactoryGirl.create(:project, { user_id: @admin.id })
    end


    ###############
    # NOT LOGGED IN
    ###############
    context "when not logged in" do
      describe "accessing the project index page" do
        before { visit '/projects' }
        it "should allow access" do
          expect(page.current_path).to eq('/projects')
        end
      end

      describe "accessing a project creation page" do
        before { visit '/projects/new' }
        it "should redirect to the login page" do
          expect(page.current_path).to eq('/login')
        end
      end
   
      describe "accessing a project edit page" do
        before do
          visit edit_project_path(@project)
        end

        it 'should redirect to the login page' do
          expect(page.current_path).to eq('/login')
        end

      end

      describe "accessing a project show page" do
        before do
          visit project_path(@project)
        end

        it "should allow access" do
          expect(page.current_path).to eq(project_path(@project))
        end

        it "should not have an edit link" do
          expect(page).to_not have_content('Edit')
        end
      end
    end

    ###############
    # LOGGED IN AS GUEST
    ###############
    context "when logged in as guest" do
      before do
        login_user("test@test.com", "foobar85")
        visit project_path(@project)
      end

      describe "listing the edit link on a project page" do
        it "should not display an edit link on a project page" do
          expect(page).to_not have_content('Edit')
        end
      end

     describe "creating projects" do 
       before do
         visit new_project_path
         fill_in "Name", with: "My Name"
         fill_in "Role", with: "My Role"
         fill_in "Url", with: "Url"
         select "2014", :from => "project[date_completed(1i)]"
         select "July", :from => "project[date_completed(2i)]"
         select "19", :from => "project[date_completed(3i)]"
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

      describe "editing a project" do
        before do
          visit edit_project_path(@project)
          fill_in "Name", with: "My new name"
          click_on "Update Project"
        end
        it "should not be allowed" do
          expect(@project.name).to eq('MyString')
        end
      end

    end

    ###############
    # LOGGED IN AS ADMIN
    ###############
    context "when logged in and admin" do
       before do
         login_user('admin@test.com', 'foobar85')
         visit project_path(@project)
       end

       describe "the edit link on a project" do
         it "should be display" do
           expect(page).to have_content('Edit')
         end
       end

       describe "project creation" do
         before do
           visit new_project_path
           fill_in "Name", with: "My Name"
           fill_in "Role", with: "My Role"
           fill_in "Url", with: "Url"
           select "2014", :from => "project[date_completed(1i)]"
           select "July", :from => "project[date_completed(2i)]"
           select "19", :from => "project[date_completed(3i)]"
           fill_in "Body", with: "My Body"
           fill_in "Logo", with: "/logo.jpg"
           fill_in "Thumbnail", with: "/thumbnail.jpg"
           fill_in "Small screen", with: "/small.jpg"
           fill_in "Medium screen", with: "/medium.jpg"
           fill_in "Large screen", with: "/large.jpg"
           fill_in "Tag list", with: "ruby, javascript"
           fill_in "Slug", with: "my-slug"
         end
         it "should be allowed" do
           expect{ click_button "Create Project" }.to change(Project, :count).by(1)
         end
       end

       describe "project updating" do
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
  
   # ###############
   # # OTHER
   # ###############
    describe "the projects index page" do
      before do
        visit projects_path
      end
      it "should display projects thumbs" do
        thumbnail_src = page.find('.work-thumb__icon')['src']
        expect(thumbnail_src).to eq("/assets/images/thumb.jpg")
      end
    end
  end
end
