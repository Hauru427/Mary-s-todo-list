require 'rails_helper'

RSpec.describe User, type: :model do
  it 'ユーザー名、メールアドレスがあり、パスワードが3文字以上であれば有効であること' do
    user = build(:user)
    expect(user).to be_valid
  end

  it 'メールアドレスはユニークであること' do
    user1 = create(:user)
    user2 = build(:user)
    user2.email = user1.email
    user2.valid?
    expect(user2.errors[:email]).to include('はすでに存在します')
  end

  it 'メールアドレス、ユーザー名は必須項目であること' do
    user = build(:user)
    user.email = nil
    user.user_name = nil
    user.valid?
    expect(user.errors[:email]).to include("を入力してください")
    expect(user.errors[:user_name]).to include("を入力してください")
  end

  it 'ユーザー名は255文字以下であること' do
    user = build(:user)
    user.user_name = "a" * 256
    user.valid?
    expect(user.errors[:user_name]).to include('は255文字以内で入力してください')
  end
end
