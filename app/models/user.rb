# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                   :integer          not null, primary key
#  authentication_token :string
#  email                :string           not null
#  name                 :string           not null
#  password_digest      :string           not null
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  organization_id      :integer          not null
#
# Indexes
#
#  index_users_on_email            (email) UNIQUE
#  index_users_on_organization_id  (organization_id)
#
# Foreign Keys
#
#  organization_id  (organization_id => organizations.id)
#
class User < ApplicationRecord
  PASSWORD_REQUIREMENTS = /\A
     (?=.{8,})           # At least 8 characters long
   /x
  MAX_NAME_LENGTH = 35
  MAX_EMAIL_LENGTH = 255
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i.freeze
  has_many :posts, dependent: :destroy
  belongs_to :organization

  has_secure_password
  has_secure_token :authentication_token

  validates :name, presence: true, length: { maximum: MAX_NAME_LENGTH }
  validates :email, presence: true,
    uniqueness: { case_sensitive: false },
    length: { maximum: MAX_EMAIL_LENGTH },
    format: { with: VALID_EMAIL_REGEX }
  validates :password, presence: true,
    format: { with: PASSWORD_REQUIREMENTS, message: I18n.t("password") }
  validates :password_confirmation, presence: true, if: -> { password.present? }
  before_save :to_lowercase

  private

    def to_lowercase
      email.downcase!
    end
end
