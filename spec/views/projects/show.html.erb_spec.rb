require 'rails_helper'

RSpec.describe "projects/show", :type => :view do
  before(:each) do
    @project = assign(:project, Project.create!(
      :name => "Name",
      :role => "Role",
      :url => "Url",
      :body => "MyText",
      :logo => "Logo",
      :thumbnail => "Thumbnail",
      :small_screen => "Small Screen",
      :medium_screen => "Medium Screen",
      :large_screen => "Large Screen"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Name/)
    expect(rendered).to match(/Role/)
    expect(rendered).to match(/Url/)
    expect(rendered).to match(/MyText/)
    expect(rendered).to match(/Logo/)
    expect(rendered).to match(/Thumbnail/)
    expect(rendered).to match(/Small Screen/)
    expect(rendered).to match(/Medium Screen/)
    expect(rendered).to match(/Large Screen/)
  end
end
