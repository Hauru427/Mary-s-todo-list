require 'rails_helper'

RSpec.describe 'ログイン・ログアウト', type: :system do
  let(:user) { create(:user) }

  describe '通常画面' do
    describe "ログイン" do
      context "認証情報が正しい場合" do
        it 'ログインできること' do
          visit '/login'
          fill_in "メールアドレス",	with: user.email
          fill_in "パスワード",	with: "12345678"
          click_button 'ログイン'
          sleep 1
          expect(page.current_path).to eq('/list')
        end
      end

      context "PWに誤りがある場合" do
        it 'ログインできないこと' do
          visit '/login'
          fill_in "メールアドレス",	with: user.email
          fill_in "パスワード",	with: "1234"
          click_button 'ログイン'
          expect(current_path).to eq('/login'), 'ログイン失敗時にログイン画面に戻ってきていません'
        end
      end
    end

    describe "ログアウト" do
      before do
        login_as(user)
      end
      it 'ログアウトできること' do
        find('.common-menu-toggle', match: :first, visible: true).click
        find('a', text: 'ログアウト', match: :first, visible: true).click
        sleep 1
        expect(current_path).to eq root_path
      end
    end
  end
end
