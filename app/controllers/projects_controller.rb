class ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :edit, :update, :destroy]

  # GET /projects
  def index
    @projects = Project.all
  end

  # GET /projects/1
  def show
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

    if @project.save
      redirect_to @project, notice: 'Project was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /projects/1
  def update
    if @project.update(project_params)
      redirect_to @project, notice: 'Project was successfully updated.'
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
                                      :slug)
    end
end
