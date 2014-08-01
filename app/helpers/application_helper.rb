module ApplicationHelper
  def markdown(text)
    #render_options = {
      #filter_html: false
    #}
    #renderer = Redcarpet::Render::HTML.new(render_options)
    renderer = PygmentizeHTML
    extensions = {
      fenced_code_blocks: true
    }
    Redcarpet::Markdown.new(renderer, extensions).render(text).html_safe
  end

  class PygmentizeHTML < Redcarpet::Render::HTML
    def block_code(code, language)
      require 'pygmentize'
      Pygmentize.process(code, language)
    end
  end

  def script_tag
    if Rails.env.production? 
      return 'build'
    else
      return 'main'
    end
  end

  def user_authorized?
    logged_in? && current_user.admin
  end

  end
