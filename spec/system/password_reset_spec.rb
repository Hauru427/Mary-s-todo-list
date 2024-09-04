# require 'rails_helper'

# RSpec.describe 'パスワードリセット機能', type: :feature do
#   let(:user) { create(:user) }
#   before do
#     login_as(user)
#   end

#   context "パスワードリセット申請" do
#     it 'ユーザーがパスワードリセットをリクエストできること' do
#       visit new_password_reset_path
#       fill_in 'メールアドレス', with: user.email
#       click_button '申請'
#       expect(page).to have_content 'パスワードリセットのメールを送信しました'
#     end
#   end

#   context "パスワードをリセットできること" do
#     it 'ユーザーが有効なトークンでリセットを行う' do
#       visit new_password_reset_path
#       fill_in 'メールアドレス', with: user.email
#       click_button '申請'

#       user.reload
#       visit edit_password_reset_path(user.reset_password_token)

#       fill_in "パスワード",	with: "newpassword"
#       fill_in "パスワード確認",	with: "newpassword"
#       click_button 'リセット'

#       expect(page).to have_content 'パスワードがリセットされました'

#       visit login_path
#       fill_in 'メールアドレス', with: user.email
#       fill_in 'パスワード', with: 'newpassword'
#       click_button 'ログイン'
#       expect(page.current_path).to eq('/list')
#     end
#   end
# end
