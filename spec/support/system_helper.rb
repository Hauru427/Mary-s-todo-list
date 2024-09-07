module SystemHelper
  def login_as(user)
    visit root_path
    login_link = find('a', text: 'ログイン', match: :first, visible: true)
    login_link.click
    fill_in 'メールアドレス', with: user.email
    fill_in 'パスワード', with: '12345678'
    click_button 'ログイン'
  end
end

RSpec.configure do |config|
  config.include SystemHelper
end
