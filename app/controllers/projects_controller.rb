class ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :edit, :update, :destroy]
  before_filter :require_login, only: [:new, :edit, :create, :update, :destroy]
  layout "admin", only: [:new, :create, :edit]
  
  # GET /projects
  def index
    @projects = Project.published.all
  end

  # GET /projects/1
  def show
    @edit_link = true
  end

  # GET /projects/new
  def new
    @project = Project.new
  end

  # GET /projects/1/edit
  def edit
  end

  # POST /projects
  def create
    @project = current_user.projects.build(project_params)

    if !current_user.admin
      redirect_to admin_path, notice: "You cannot create projects as a guest."
    elsif current_user.admin && @project.save
      redirect_to @project, notice: 'Project was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /projects/1
  def update
    if !current_user.admin
      redirect_to admin_path, notice: "You cannot update posts as a guest."
    elsif current_user.admin && @project.update(project_params)
      redirect_to admin_path, notice: 'Project was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /projects/1
  def destroy
    @project.destroy
    redirect_to projects_url, notice: 'Project was successfully destroyed.'
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_project
      @project = Project.find(params[:id])
      @project_images = [@project.small_screen, @project.medium_screen, @project.large_screen]
      check_access(@project)
    end

    # Only allow a trusted parameter "white list" through.
    def project_params
      params.require(:project).permit(:name, 
                                      :role, 
                                      :url, 
                                      :date_completed, 
                                      :body, 
                                      :logo, 
                                      :thumbnail, 
                                      :small_screen, 
                                      :medium_screen, 
                                      :large_screen, 
                                      :tag_list,
                                      :slug,
                                      :published)
    end
end
