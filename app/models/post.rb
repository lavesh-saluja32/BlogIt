# frozen_string_literal: true

# == Schema Information
#
# Table name: posts
#
#  id           :integer          not null, primary key
#  description  :text             not null
#  downvotes    :integer          default(0), not null
#  is_bloggable :boolean          default(FALSE)
#  title        :string           not null
#  upvotes      :integer          default(0), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Post < ApplicationRecord
  MAX_TITLE_LENGTH = 125
  MAX_DESCRIPTION_LENGTH = 10000
  VALID_TITLE_REGEX = /\A.*[a-zA-Z0-9].*\z/i
  validates :title, presence: true, length: { maximum: MAX_TITLE_LENGTH }, format: { with: VALID_TITLE_REGEX }
  validates :description, presence: true, length: { maximum: MAX_DESCRIPTION_LENGTH },
    format: { with: VALID_TITLE_REGEX }
  validates_inclusion_of :is_bloggable, in: [true, false]
end
