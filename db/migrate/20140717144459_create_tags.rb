class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.integer :reference_id
      t.string :tag

      t.timestamps
    end
  end
end
