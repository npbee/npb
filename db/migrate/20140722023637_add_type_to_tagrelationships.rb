class AddTypeToTagrelationships < ActiveRecord::Migration
  def change
    add_column :tag_relationships, :type, :string
  end
end
