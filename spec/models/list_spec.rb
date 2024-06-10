require 'rails_helper'

RSpec.describe List, type: :model do
  let(:user) { create(:user) }

  it "タイトルがあり有効であること" do
    list = build(:list, user: user)
    expect(list).to be_valid
  end

  it 'タイトルが必須項目であること' do
    list = build(:list, title: nil)
    list.valid?
    expect(list.errors[:title]).to include("can't be blank")
  end

  it 'タイトルは255文字以下であること' do
    long_title = 'a' * 256
    list = build(:list, title: long_title)
    list.valid?
    expect(list.errors[:title]).to include("is too long (maximum is 255 characters)")
  end

  it 'リストはユーザーに属すること' do
    association = described_class.reflect_on_association(:user)
    expect(association.macro).to eq :belongs_to
  end
end
