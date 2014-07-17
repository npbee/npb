class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :name
      t.string :role
      t.string :url
      t.date :date_complete
      t.text :body
      t.string :logo
      t.string :thumbnail
      t.string :small_screen
      t.string :medium_screen
      t.string :large_screen

      t.timestamps
    end
  end
end
