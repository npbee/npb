class RemoveTagStringFromTagRelationships < ActiveRecord::Migration
  def change
    remove_column :tag_relationships, :tag, :string
    add_column :tag_relationships, :tag_id, :integer
  end
end
