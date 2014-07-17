class CreateTagRelationships < ActiveRecord::Migration
  def change
    create_table :tag_relationships do |t|
      t.integer :reference_id
      t.string :tag

      t.timestamps
    end
  end
end
