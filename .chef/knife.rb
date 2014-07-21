cookbook_path ["./chef/cookbooks", "./site-cookbooks"]
node_path     "./chef/nodes"
role_path     "./chef/roles"
data_bag_path "./chef/data_bags"
environment_path "./chef/environments"
#encrypted_data_bag_secret "data_bag_key"

knife[:berkshelf_path] = "./chef/cookbooks"
