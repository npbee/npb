# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :project do
    name "MyString"
    role "MyString"
    url "MyString"
    date_completed "2014-07-17"
    body "MyText"
    logo "MyString"
    thumbnail "thumb.jpg"
    small_screen "small.jpg"
    medium_screen "medium.jpg"
    large_screen "large.jpg"
    published true
  end
end
