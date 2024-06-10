require 'rails_helper'

RSpec.describe "Lists", type: :system do
  let(:user) { create(:user) }
  let(:list) { create(:list, user: user)}

  describe "リストのCRUD" do
    describe "リストの作成" do
      context "ログインしていない場合" do
        it 'ログインページにリダイレクトされること' do
          visit '/list/new'
          Capybara.assert_current_path("/login", ignore_query: true)
          expect(current_path).to eq('/login'), 'リスト作成画面にアクセスしたときにログインしていません'
        end
      end

      context "ログインしている場合" do
        it 'リストが作成できること' do
          login_as_general
          fill_in 'Title', with: 'Test title'
          click_on('作成')
          Capybara.assert_current_path("/", ignore_query: true)
          expect(current_path).to eq('/'), 'TODO一覧画面に遷移していません'
          expect(page).to have_content('Test title'),'作成したリストが表示されていません'
        end

        # it 'リストの作成に失敗すること' do
        #   click_on('作成')
        #   expect(page).to have_content('タイトルを入力してください'), 'エラーメッセージ「タイトルを入力してください」が表示されていません'
        # end
      end
    end
  end
end
