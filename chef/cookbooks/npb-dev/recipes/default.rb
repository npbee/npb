
execute "bundle install" do
  user 'deploy'
  command "cd /vagrant && bundle"
end

