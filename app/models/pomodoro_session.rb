class PomodoroSession < ApplicationRecord
  belongs_to :user
  belongs_to :card
  validates :start_time, presence: true
  validates :end_time, presence: true, allow_nil: true
  validates :count, presence: true
end
