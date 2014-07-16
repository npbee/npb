require 'rails_helper'

# Specs in this file have access to a helper object that includes
# the StaticPagesHelper. For example:
#
# describe StaticPagesHelper do
#   describe "string concat" do
#     it "concats two strings with spaces" do
#       expect(helper.concat_strings("this","that")).to eq("this that")
#     end
#   end
# end
RSpec.describe AdminPagesHelper, :type => :helper do
  def login_user(email, password) do
    visit '/login'^
    fill_in 'email', with: email
    fill_in 'password', with: password
    click_on 'Login'
    visit '/admin'
end

