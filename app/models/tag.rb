class Tag < ActiveRecord::Base
  has_many :tag_relationships
  has_many :post_references, :through => :tag_relationships, class_name: "Post", :source => :reference
#  has_many :project_references, :through => :tag_relationships, class_name: "Project"
end
