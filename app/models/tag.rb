class Tag < ActiveRecord::Base
  has_many :tag_relationships

  has_many :post_tag_relationships,
          -> { where reference_type: 'post' },
          :class_name => 'TagRelationship'

  has_many :post_references, 
          :through => :post_tag_relationships, 
          :source => :reference,
          :class_name => "Post"

  has_many :project_tag_relationships,
        -> { where reference_type: 'project' },
        :class_name => 'TagRelationship'

  has_many :project_references, 
          :through => :project_tag_relationships, 
          class_name: "Project", 
          :source => :reference

  default_scope { order('name ASC') }
  
  def self.find(input)
    input.to_i == 0 ? find_by_name(input) : super
  end

end
