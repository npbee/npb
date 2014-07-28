class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  #before_filter :require_login

  private
  def not_authenticated
    redirect_to login_path, alert: 'Please login'
  end

  def check_access(item)
    if logged_in? && current_user.has_access_to?(item)
      item
    elsif ( item.instance_of?(Post) || item.instance_of?(Project) ) && item.published
      item
    else
      redirect_to root_path
    end
  end
end
