require 'rails_helper'

RSpec.describe 'お問い合わせ', type: :system do
  describe "問い合わせフォームのテスト" do
    it "フォームページにアクセスできる" do
      visit new_contact_path
      expect(page).to have_content('お問い合わせ')
    end

    it "正しい入力で確認ページに遷移する" do
      visit new_contact_path

      fill_in "contact[name]",	with: "テスト君"
      fill_in "contact[email]",	with: "test@example.com"
      fill_in 'contact[subject]', with: 'テスト件名'
      fill_in 'contact[message]', with: 'これはテストメッセージです。'

      click_button '入力内容確認'

      expect(page).to have_content('テスト君')
      expect(page).to have_content('test@example.com')
      expect(page).to have_content('テスト件名')
      expect(page).to have_content('これはテストメッセージです。')
    end

    it "入力不備がある場合、エラーメッセージが表示される" do
      visit new_contact_path

      fill_in 'contact[name]', with: ''
      fill_in 'contact[email]', with: ''
      fill_in 'contact[subject]', with: ''
      fill_in 'contact[message]', with: ''

      click_button '確認'

      expect(page).to have_content('名前を入力してください')
      expect(page).to have_content('メールアドレスを入力してください')
      expect(page).to have_content('件名を入力してください')
      expect(page).to have_content('メッセージを入力してください')
    end

    it '確認ページから戻るボタンを押した場合、入力データが保持される' do
      visit new_contact_path

      fill_in 'contact[name]', with: 'テスト君'
      fill_in 'contact[email]', with: 'test@example.com'
      fill_in 'contact[subject]', with: 'テスト件名'
      fill_in 'contact[message]', with: 'これはテストメッセージです。'

      click_button '確認'
      click_button '戻る'

      expect(page).to have_field('contact[name]', with: 'テスト君')
      expect(page).to have_field('contact[email]', with: 'test@example.com')
      expect(page).to have_field('contact[subject]', with: 'テスト件名')
      expect(page).to have_field('contact[message]', with: 'これはテストメッセージです。')
    end

    it '確認ページで送信ボタンを押すと完了ページに遷移し、メールが送信される' do
      visit new_contact_path

      fill_in 'contact[name]', with: 'テスト君'
      fill_in 'contact[email]', with: 'test@example.com'
      fill_in 'contact[subject]', with: 'テスト件名'
      fill_in 'contact[message]', with: 'これはテストメッセージです。'

      click_button '確認'
      click_button '送信'

      expect(page).to have_content('お問い合わせありがとうございました。')
    end
  end
end
