class Project < ActiveRecord::Base
  validates :name, :presence => true 
  validates :role, :presence => true 
  validates :url, :presence => true 
  validates :body, :presence => true 
  validates :logo, :presence => true 
  validates :thumbnail, :presence => true 

  belongs_to :user
  has_many :tag_relationships, :foreign_key => "reference_id"
  has_many :tags, :through => :tag_relationships 
  
  def self.find(input)
    input.to_i == 0 ? find_by_slug(input) : super
  end
 
  def tag_list
    self.tags.map { |tag| tag.name }.join(', ')
  end

  def tag_list=(new_value)
    tag_names = new_value.split(/,\s+/)
    self.tags = tag_names.map { |name| Tag.where('name = ?', name).first or Tag.create(:name => name) }
  end

end
