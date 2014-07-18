module ApplicationHelper
  def markdown(text)
    render_options = {
      filter_html: true
    }
    renderer = Redcarpet::Render::HTML.new(render_options)

    extensions = {
      fenced_code_blocks: true
    }
    Redcarpet::Markdown.new(renderer, extensions).render(text).html_safe
  end
end
