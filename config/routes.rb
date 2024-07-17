Rails.application.routes.draw do
  get 'profiles/show'
  get 'profiles/edit'
  get 'profiles/update'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "static_pages#top"
  resources :users, only: %i[new create]
  # ログイン関連
  get 'login', to: 'user_sessions#new'
  post 'login', to: 'user_sessions#create'
  delete 'logout', to: 'user_sessions#destroy'

  # リスト関連
  resources :list, only: %i[index new create edit update destroy] do
    resources :card, only: %i[new create show edit update destroy]
  end

  # linebot
  post '/callback', to: 'reminders#callback'

  # Lineログイン・認証
  post "oauth/callback" => "oauths#callback"
  get "oauth/callback" => "oauths#callback" # for use with Github, Facebook
  get "oauth/:provider" => "oauths#oauth", :as => :auth_at_provider

  # プロフィール
  resource :profile, only: [:show, :edit, :update]
end
