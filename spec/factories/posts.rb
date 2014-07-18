# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :post do
    title "MyString"
    body "MyText"
    slug "MySlug"
    excerpt "MyExcerpt"
    user_id 1
  end
end
