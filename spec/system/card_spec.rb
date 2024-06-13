require 'rails_helper'

RSpec.describe "Cards", type: :system do
  let(:user) { create(:user) }
  let(:list) { create(:list, user: user)}
  let(:card) { create(:card, list: list)}

  describe "カードのCRUD" do
    describe "カードの作成" do
      context "ログインしていない場合" do
        it 'ログインページにリダイレクトされること' do
          visit "/list/#{list.id}/card/new"
          Capybara.assert_current_path("/login", ignore_query: true)
          expect(current_path).to eq('/login'), 'カード作成画面にアクセスしたときにログインしていません'
        end
      end

      context "ログインしている場合" do
        before do
          login_as(user)
          list
        end
        it 'カードが作成できること' do
          find('.far.fa-plus-square').click
          fill_in 'card_title', with: 'Test title of card'
          fill_in 'card_memo', with: 'Test memo'
          click_on('作成')
          sleep 1
          expect(page.current_path).to eq('/list'), 'カード作成後にリスト一覧画面に遷移していません'
          expect(page).to have_content('Test title of card'),'作成したカードが表示されていません'
        end

        # it 'カードの作成に失敗すること' do
        #   click_on('作成')
        #   expect(page).to have_content('タイトルを入力してください'), 'エラーメッセージ「タイトルを入力してください」が表示されていません'
        # end
      end
    end

    describe 'カードの詳細' do
      context 'ログインしていない場合' do
        it 'ログインページにリダイレクトされること' do
          visit list_card_path(list, card)
          expect(current_path).to eq login_path
        end
      end

      context 'ログインしている場合' do
        before do
          login_as(user)
          list
          card
        end
        it 'カードの詳細が表示されること' do
          click_on('Test Card')
          sleep 1
          expect(current_path).to eq("/list/#{list.id}/card/#{card.id}"), 'カードのタイトルリンクからカード詳細画面へ遷移できません'
          expect(page).to have_content card.title
          expect(page).to have_content card.memo
          expect(page).to have_content list.title
        end
        it '正しい内容が表示されていること' do
          click_on('Test Card')
          expect(page).to have_content('Test Memo'),'作成したカードが表示されていません'
        end
      end
    end

    describe "カードの編集" do
      context "ログインしていない場合" do
        it "ログインページにリダイレクトされること" do
          visit "/list/#{list.id}/card/#{card.id}/edit"
          expect(current_path).to eq('/login'), 'カード編集画面にアクセスしたときにログインしていません'
        end
      end

      context "ログインしている場合" do
        it '掲示板の編集ができること' do
          login_as(user)
          list
          card
          find('.fas.fa-bars').click
          click_link '編集する'
          fill_in 'card_title', with: 'Edit Test of card'
          fill_in 'card_memo', with: 'Edit Test of memo'
          click_button '更新する'
          sleep 1
          expect(current_path).to eq('/list')
          expect(page).to have_content('Edit Test of card'), '編集したカードのタイトルが表示されていません'
        end
      end
    end

    describe "カードの削除" do
      it '正常に削除が実行されること' do
        login_as(user)
          list
          card
          find('.fas.fa-bars').click
          click_link '削除する'
          sleep 1
          expect(page.driver.browser.switch_to.alert.text).to eq "削除しますか？"
          page.driver.browser.switch_to.alert.accept
          sleep 1
          expect(current_path).to eq('/list')
          expect(Card.count).to eq 0
      end
    end
  end
end
