FactoryGirl.define do
  factory :message do
    body Faker::Lorem.sentence
    user
    group
  end
end
