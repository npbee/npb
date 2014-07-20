class Post < ActiveRecord::Base
  validates :title, :presence => true
  validates :body, :presence => true
  validates :slug, :presence => true, format: {
                                        with: /\A[a-zA-Z\-\d]+\z/,
                                        message: 'does not allow special characters'}

  belongs_to :user
  has_many :tag_relationships, :foreign_key => "reference_id"
  has_many :tags, :through => :tag_relationships
  accepts_nested_attributes_for :tags

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
    self.tags = tag_names.map { |name| Tag.where('name = ?', name).first or Tag.create(:name => name) }
  end

end
