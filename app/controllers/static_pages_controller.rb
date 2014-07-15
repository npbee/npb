class StaticPagesController < ApplicationController

  def home
    @body_class = 'homepage'
  end

  def connect
    @alt_header = "Connect"
    @alt_header_url = '/connect'
    @body_class = 'connect'
  end

end
