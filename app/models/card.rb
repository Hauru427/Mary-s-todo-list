class Card < ApplicationRecord
  belongs_to :list

  validates :title,  length: { maximum: 255 }
  validates :memo, length: { maximum:1000 }
  # validate :due_date_cannnot_be_in_the_past

  # private

  # def due_date_cannnot_be_in_the_past
  #   if due_date.present? && due_date < DateTime.now
  #     errors.add(:due_date, "can't be in the past")
  #   end
  # end
end
