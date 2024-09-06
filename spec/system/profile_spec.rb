require 'rails_helper'

RSpec.describe "Profile", type: :system do
  let(:user) { create(:user) }

  before do
    login_as(user)
    visit edit_profile_path
  end

  it "プロフィールページが表示されること" do
    expect(page).to have_content('プロフィール')
    expect(page).to have_field('user[email]', with: user.email)
    expect(page).to have_field('user[user_name]', with: user.user_name)
  end

  it "プロフィール編集ページが表示されること" do
    expect(page).to have_content('プロフィール編集')
    expect(page).to have_field('user[email]', with: user.email)
    expect(page).to have_field('user[user_name]', with: user.user_name)
  end

  context "有効な情報で更新する場合" do
    it "プロフィールが更新されること" do
      fill_in 'user[email]', with: 'newemail@example.com'
      fill_in 'user[user_name]', with: '新しいユーザー名'
      click_button '更新'

      expect(page).to have_current_path(profile_path)
      expect(page).to have_content('プロフィールが変更されました')
      expect(page).to have_content('newemail@example.com')
      expect(page).to have_content('新しいユーザー名')
    end
  end

  context "無効な情報で更新する場合" do
    it "更新に失敗し、エラーメッセージが表示されること" do
      fill_in 'user[email]', with: ''
      fill_in "user[user_name]",	with: ''
      click_button '更新'

      expect(page).to have_content('メールアドレスを入力してください')
      expect(page).to have_content('ユーザー名を入力してください')
    end
  end
end
