Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "static_pages#top"
  resources :users, only: %i[new create destroy]
  # ログイン関連
  get 'login', to: 'user_sessions#new'
  post 'login', to: 'user_sessions#create'
  delete 'logout', to: 'user_sessions#destroy'

  # # リスト関連
  resources :list, only: %i[index new create edit update destroy] do
    resources :card, only: %i[new create show edit update destroy]
  end

  # React化に伴い、ListとCardのルーティングを下記のように変更
  resources :cards, only: [:index, :create, :update, :destroy] do
    post :update_all_position, on: :collection
  end

  resources :lists, only: [:index, :create, :destroy] do
    delete :destroy_all_cards, on: :member
  end

  # linebot
  post '/callback', to: 'reminders#callback'

  # Lineログイン・認証
  post "oauth/callback" => "oauths#callback"
  get "oauth/callback" => "oauths#callback" # for use with Github, Facebook
  get "oauth/:provider" => "oauths#oauth", :as => :auth_at_provider

  # プロフィール
  resource :profile, only: %i[show edit update]

  # パスワードリセット
  resources :password_resets, only: %i[create edit update new]

  # ポモドーロタイマー
  resources :pomodoro_sessions, only: [:create, :index]
end
