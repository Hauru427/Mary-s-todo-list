FactoryBot.define do
  factory :card do
    title { "Test Card" }
    memo { "Test Memo" }
    association :list
  end
end
