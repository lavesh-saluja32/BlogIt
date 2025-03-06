# frozen_string_literal: true

# == Schema Information
#
# Table name: organizations
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Organization < ApplicationRecord
  has_many :users, dependent: :destroy
  has_many :posts, dependent: :destroy
  validates :name, presence: true
end
