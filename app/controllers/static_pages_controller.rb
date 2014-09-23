class StaticPagesController < ApplicationController
  before_filter :require_login, :only => [:admin]
  
  def home
    @body_class = 'homepage'
    @post = Post.published.first
    @project = Project.published.first
  end

  def connect
    @alt_header = "Connect"
    @alt_header_url = '/connect'
    @body_class = 'connect'
    @available = User.find_by_name('Nick').accepting_projects
  end

  def resume
    @body_class = 'resume'
    render :layout => 'resume'
  end

  def admin
    @user = current_user
    render :layout => 'admin'
  end

end
