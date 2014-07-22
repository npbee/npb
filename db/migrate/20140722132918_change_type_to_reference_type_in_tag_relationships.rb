class ChangeTypeToReferenceTypeInTagRelationships < ActiveRecord::Migration
  def change
    rename_column :tag_relationships, :type, :reference_type
  end
end
