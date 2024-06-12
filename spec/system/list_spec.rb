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
        before do
          login_as(user)
        end
        it 'リストが作成できること' do
          click_on('リスト作成')
          fill_in 'list_title', with: 'Test title'
          click_on('作成')
          sleep 1
          expect(page.current_path).to eq('/list'), 'リスト作成後にリスト一覧画面に遷移していません'
          expect(page).to have_content('Test title'),'作成したリストが表示されていません'
        end

        # it 'リストの作成に失敗すること' do
        #   click_on('作成')
        #   expect(page).to have_content('タイトルを入力してください'), 'エラーメッセージ「タイトルを入力してください」が表示されていません'
        # end
      end
    end

    describe "リストの一覧" do
      context "ログインしていない場合" do
        it "ログインページにリダイレクトされること" do
          visit '/list'
          Capybara.assert_current_path("/login", ignore_query: true)
          expect(current_path).to eq('/login'), 'リスト一覧画面にアクセスしたときにログインしていません'
        end
      end

      context "ログインしている場合" do
        it 'リスト一覧に遷移できること' do
          login_as(user)
          Capybara.assert_current_path("/list", ignore_query: true)
          expect(current_path).to eq('/list')
        end
      end
    end

    describe "リストの編集" do
      context "ログインしていない場合" do
        it "ログインページにリダイレクトされること" do
          visit "/list/#{list.id}/edit"
          Capybara.assert_current_path("/login", ignore_query: true)
          expect(current_path).to eq('/login'), 'リスト編集画面にアクセスしたときにログインしていません'
        end
      end

      context "ログインしている場合" do
        it '掲示板の編集ができること' do
          login_as(user)
          list
          find('.list_header_action .fas.fa-pen').click
          fill_in 'list_title', with: 'Edit Test'
          click_button '編集する'
          sleep 1
          expect(current_path).to eq('/list')
          expect(page).to have_content('Edit Test'), '編集したリストのタイトルが表示されていません'
        end
      end
    end
    describe "リストの削除" do
      context "正常に削除できること" do
        it '' do
          login_as(user)
            list
            find('.list_header_action .fas.fa-trash').click
            sleep 1
            expect(page.driver.browser.switch_to.alert.text).to eq "削除しますか？"
            page.driver.browser.switch_to.alert.accept
            expect(current_path).to eq('/list')
            expect(List.count).to eq 0
        end
      end
    end
  end
end
