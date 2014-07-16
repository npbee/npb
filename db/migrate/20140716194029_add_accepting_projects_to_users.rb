class AddAcceptingProjectsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :accepting_projects, :boolean
  end
end
