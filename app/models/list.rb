class List < ApplicationRecord
  belongs_to :user

  validates: title, length { maximum: 255 }
end
