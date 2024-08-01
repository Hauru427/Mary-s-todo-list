class PomodoroSession < ApplicationRecord
  belongs_to :user
  validates :start_time, presence: true
  validates :end_time, presence: true, allow_nil: true
end
