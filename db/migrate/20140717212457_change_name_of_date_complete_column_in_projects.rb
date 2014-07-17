class ChangeNameOfDateCompleteColumnInProjects < ActiveRecord::Migration
  def change
    rename_column :projects, :date_complete, :date_completed
  end
end
