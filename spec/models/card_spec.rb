require 'rails_helper'

RSpec.describe Card, type: :model do
  let(:user) { create(:user) }
  let(:list) { create(:list) }

  it "タイトルがあり有効であること" do
    card = build(:card, list: list)
    expect(card).to be_valid
  end

  it 'タイトルが必須項目であること' do
    card = build(:card, title: nil)
    card.valid?
    puts card.errors.full_messages
    expect(card.errors[:title]).to include("can't be blank")
  end

  it 'タイトルは255文字以下であること' do
    long_title = 'a' * 256
    card = build(:card, title: long_title)
    card.valid?
    expect(card.errors[:title]).to include("is too long (maximum is 255 characters)")
  end

  it 'メモは1000文字以下であること' do
    long_memo = 'a' * 1001
    card = build(:card, memo: long_memo)
    card.valid?
    expect(card.errors[:memo]).to include("is too long (maximum is 1000 characters)")
  end

  it 'カードはリストに属すること' do
    association = described_class.reflect_on_association(:list)
    expect(association.macro).to eq :belongs_to
  end
end
