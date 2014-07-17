class RemoveReferenceIdFromTags < ActiveRecord::Migration
  def change
    remove_column :tags, :reference_id
  end
end
