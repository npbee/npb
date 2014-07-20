class ChangePublicToPublishedPosts < ActiveRecord::Migration
  def change
    rename_column :posts, :public, :published
  end
end
