require 'rails_helper'

RSpec.describe "アカウント削除", type: :system do
  let!(:user) { create(:user) }

  before do
    login_as(user)
    visit profile_path
  end

  it "プロフィールページに削除ボタンが表示されていること" do
    expect(page).to have_link('アカウント削除', href: user_path(user))
  end

  it "ユーザーを削除できること" do
    accept_confirm do
      click_link 'アカウント削除'
    end

    expect(page).to have_current_path(root_path)
    expect(page).to have_content('アカウントを削除しました')
    expect(User.exists?(user.id)).to be_falsey
  end
end
