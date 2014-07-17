class Tag < ActiveRecord::Base
  has_many :tag_relationships
  has_many :references, :through => :tag_relationships
end
