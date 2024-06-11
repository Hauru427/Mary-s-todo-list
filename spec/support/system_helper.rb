module SystemHelper
  def login_as(user)
    visit root_path
    click_link "Login"
    fill_in 'Email', with: user.email
    fill_in 'Password', with: '12345678'
    click_button 'ログイン'
  end
end

RSpec.configure do |config|
  config.include SystemHelper
end
