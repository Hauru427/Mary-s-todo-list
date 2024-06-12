FactoryBot.define do
  factory :list do
    title { "Test List" }
    association :user
  end
end
