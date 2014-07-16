# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :user do
    name "Test User"
    email "test@test.com"
    password "foobar85"
    password_confirmation "foobar85"
    accepting_projects false
  end
end
