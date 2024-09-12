# QuoteTodo
サービスURL：https://quotetodo.com
[![Image from Gyazo](https://i.gyazo.com/0117e1b461e339642848e09b250e9f99.png)](https://gyazo.com/0117e1b461e339642848e09b250e9f99)
## ■サービス概要
「QuoteTodo」は、タスク管理とモチベーションアップを両立するTodoリストアプリです。  
タスクのリマインドと一緒に著名人の名言が送信されユーザーのモチベーションを高めながらタスクを管理する手助けをします。  
また、ポモドーロ機能を使用して集中してタスクに取り組もことができます。  
ただのタスク管理アプリでは物足りない、日々のやる気を向上させたいと考える人向けのツールです。

## ■ このサービスへの思い・作りたい理由
私自身、日常のタスク管理においてモチベーションを保つことが難しいと感じることがありました。  
そのような時に著名人の名言を見ると頑張ろうと思えた経験があります。  
その経験から名言とTodo管理を組み合わせたアプリを開発することにしました。  
また、タスク管理とポモドーロ機能を兼ね備えたアプリがほとんどなくそのようなアプリを作成したいという気持ちがありました。  
このサービスを通じて、日々のタスクをよりポジティブに進められるサポートにしたいと考えています。

## ■サービスの利用イメージ
### トップページ
[![Image from Gyazo](https://i.gyazo.com/be4887143a1098dbb4fbe32cc46ea0c1.gif)](https://gyazo.com/be4887143a1098dbb4fbe32cc46ea0c1)

### リスト作成・削除機能
[![Image from Gyazo](https://i.gyazo.com/1e28e4832f00cec81f00215a269ed83b.gif)](https://gyazo.com/1e28e4832f00cec81f00215a269ed83b)

### カード作成機能
[![Image from Gyazo](https://i.gyazo.com/3d2187f5871e3898eb1dae277a02c537.gif)](https://gyazo.com/3d2187f5871e3898eb1dae277a02c537)

### カードの編集・削除機能
[![Image from Gyazo](https://i.gyazo.com/af03c9aacdeb6b0dacbc5b9998ea6feb.gif)](https://gyazo.com/af03c9aacdeb6b0dacbc5b9998ea6feb)
カードをクリック後、モーダル内で直接編集と削除が行えます。
### カードのドラッグ&ドロップ、検索機能
[![Image from Gyazo](https://i.gyazo.com/c62a87fdf4f14070842ed4c7d084d4a9.gif)](https://gyazo.com/c62a87fdf4f14070842ed4c7d084d4a9)
リスト内、異なるリスト間でドラッグ&ドロップによりカードの移動ができます。
| LINEリマインド機能| ポモドーロタイマー機能 |
| ------------- | ------------- |
| [![Image from Gyazo](https://i.gyazo.com/7712190d4d21a33379cfbedc1de9559b.png)](https://gyazo.com/7712190d4d21a33379cfbedc1de9559b)  | [![Image from Gyazo](https://i.gyazo.com/fd9ad644cc5086ad09d6d253a44606fc.png)](https://gyazo.com/fd9ad644cc5086ad09d6d253a44606fc)  |
| LINEにてログインをしている場合は、タスクのリマインド通知が送信されます。  また、リッチメニューより今日のTodoを押下することで、当日が期限のタスクを一覧で確認することが可能です。  | 各カードごとにポモドーロタイマーを使用して作業をすることが可能です。  |

###
## ■ ユーザー層について
単純なタスク管理アプリでは物足りないユーザー  
日々のタスク管理をより楽しくしたいユーザー

## ■ ユーザーの獲得について
コミュニティやSNSでの発信

## ■ サービスの差別化ポイント・推しポイント
カンバンボード方式×ポモドーロタイマーが使用できるTodoアプリ。  
名言によるモチベーションアップ: 他のTodoアプリとは異なり、著名人の名言がユーザーを励まし、モチベーションを維持する遊び心を加えています。  
ポモドーロタイマー: 通常のTodo機能に加えてポモドーロタイマー機能も追加することでより集中してタスクに取り組むことができます。

## ■ 機能候補
### 【MVPリリース】
* ユーザー登録機能
* パスワードリセット機能
* ゲストログイン機能
* ユーザー削除(退会)機能
* ユーザー情報機能
* ログイン機能
* ログアウト機能
* タスク管理機能（追加・編集・削除）
* Linebot用いた機能
  * タスク通知機能


### 【本リリース】
* タスクの自動削除機能
* タスクの検索機能
* タスクの並べ替え機能
* ポモドーロタイマー機能
* 利用規約
* プライバシーポリシー

## ■ 機能の実装方針予定
* 一般的なTodoアプリ機能を実装
* バックグラウンドで目標期限を取得する機能を実装
* 通知機能を実装（Linebotを使用予定）
* 目標期限が過ぎた場合、UIを通常時から変更させる
* 位置情報を取得機能を実装しメッセージのバリエーションを増やす

## ■使用予定の技術スタック
### 開発環境
- Docker
- Docker Compose

### サーバサイド
- Ruby on Rails 7系
  - Ruby 3.2.2
  - Rails 7.0.4.3

### フロントエンド
- 初期リリースではRailsを使用
- React（Railsで全て作成し本リリース後に徐々に移行）
- CSSフレームワーク: Bootstrap 5系

### WebAPI
- LINE Messaging API

### インフラ
- Webアプリケーションサーバ: Heroku
- セッションサーバ: Heroku Redis
- データベースサーバ : Heroku Postgers

### その他
- VCS: GitHub
- CI/CD: GitHub Actions

## ■画面遷移図
[Figma](https://www.figma.com/design/GyVsRGDJAEHDvSPuTnjwvn/Mary-s-todo-list?node-id=0%3A1&t=rRKr0DnFP1VOrjKy-1)

## ■ER図
[![Image from Gyazo](https://i.gyazo.com/a3c54e855daa116f10c6bf0352a02e14.png)](https://gyazo.com/a3c54e855daa116f10c6bf0352a02e14)
