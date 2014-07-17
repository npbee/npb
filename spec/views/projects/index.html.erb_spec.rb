require 'rails_helper'

RSpec.describe "projects/index", :type => :view do
  before(:each) do
    assign(:projects, [
      Project.create!(
        :name => "Name",
        :role => "Role",
        :url => "Url",
        :body => "MyText",
        :logo => "Logo",
        :thumbnail => "Thumbnail",
        :small_screen => "Small Screen",
        :medium_screen => "Medium Screen",
        :large_screen => "Large Screen"
      ),
      Project.create!(
        :name => "Name",
        :role => "Role",
        :url => "Url",
        :body => "MyText",
        :logo => "Logo",
        :thumbnail => "Thumbnail",
        :small_screen => "Small Screen",
        :medium_screen => "Medium Screen",
        :large_screen => "Large Screen"
      )
    ])
  end

  it "renders a list of projects" do
    render
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => "Role".to_s, :count => 2
    assert_select "tr>td", :text => "Url".to_s, :count => 2
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
    assert_select "tr>td", :text => "Logo".to_s, :count => 2
    assert_select "tr>td", :text => "Thumbnail".to_s, :count => 2
    assert_select "tr>td", :text => "Small Screen".to_s, :count => 2
    assert_select "tr>td", :text => "Medium Screen".to_s, :count => 2
    assert_select "tr>td", :text => "Large Screen".to_s, :count => 2
  end
end
