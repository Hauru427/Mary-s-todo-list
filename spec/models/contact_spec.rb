require 'rails_helper'

RSpec.describe Contact, type: :model do
  it '名前がからの場合、無効である' do
    contact = Contact.new(name: '', email: 'test@example.com', subject: 'テスト', message: 'テスト')
    expect(contact).not_to be_valid
  end

end
