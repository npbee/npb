class UserSessionsController < ApplicationController
  #skip_before_filter :require_login, except: [:destroy]
  layout "admin"
  
  def new
    @user = User.new
  end

  def create
    if @user = login(params[:email], params[:password], params[:remember])
      redirect_back_or_to(:admin, success: 'Login successful')
    else
      flash.now[:error] = 'Login failed'
      render action: 'new'
    end
  end

  def destroy
    logout
    redirect_to(login_path, notice: 'Logged out')
  end
end
