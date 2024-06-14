class Card < ApplicationRecord
  belongs_to :list

  validates :title,  length: { maximum: 255 }
  validates :memo, length: { maximum:1000 }
  validates :due_date, 
end
