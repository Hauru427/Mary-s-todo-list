class User < ApplicationRecord
  authenticates_with_sorcery!
  has_many :lists, dependent: :destroy
  has_many :cards, dependent: :destroy
  has_many :authentications, dependent: :destroy
  has_many :pomodoro_sessions, dependent: :destroy
  accepts_nested_attributes_for :authentications
  mount_uploader :avatar, AvatarUploader

  validates :password, length: {minimum: 3 }, if: -> { new_record? || changes[:crypted_password] }
  validates :password, confirmation: true, if: -> { new_record? || changes[:crypted_password] }
  validates :password_confirmation, presence: true, if: -> { new_record? || changes[:crypted_password] }
  validates :user_name, presence: true, length: { maximum: 255 }
  validates :email, presence: true, uniqueness: true, unless: :line_login?
  validates :reset_password_token, presence: true, uniqueness: true, allow_nil: true

  def line_login?
    self.line_id.present?
  end
end
