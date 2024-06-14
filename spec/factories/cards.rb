FactoryBot.define do
  factory :card do
    title { "Test Card" }
    memo { "Test Memo" }
    due_date { DateTime.now + 1.day }
    association :list
  end
end
