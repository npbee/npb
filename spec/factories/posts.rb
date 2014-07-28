# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :post do
    title "MyTitle"
    body "MyBody"
    sequence(:slug) { |s| "my-slug-#{s}" }
    excerpt "MyExcerpt"
    user_id 1
    published true
  end
end
