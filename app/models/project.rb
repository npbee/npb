class Project < ActiveRecord::Base
  validates :name, :presence => true 
  validates :role, :presence => true 
  validates :url, :presence => true 
  validates :body, :presence => true 
  validates :logo, :presence => true 
  validates :thumbnail, :presence => true 
  validates :slug, :uniqueness => true
  validates_format_of :thumbnail,
                      :small_screen,
                      :medium_screen,
                      :large_screen,
                      :with => /(.)+\.(jpg|svg|png|jpeg)\z/,
                      message: "path should end in .jpg, .svg, .png, or .jpeg."

  belongs_to :user
  has_many :tag_relationships, 
            -> { where reference_type: 'project' },
            :foreign_key => "reference_id"
  
  has_many :tags, :through => :tag_relationships 
  
  default_scope { order('created_at DESC') }
  scope :published, -> { where(published: true) }

  def self.find(input)
    input.to_i == 0 ? find_by_slug(input) : super
  end
 
  def tag_list
    self.tags.map { |tag| tag.name }.join(', ')
  end

  def tag_list=(new_value)
    tag_names = new_value.split(/,\s+/)
    self.tags = tag_names.map { |name| Tag.where('name = ?', name.downcase).first or Tag.create(:name => name.downcase) }
  end

end
