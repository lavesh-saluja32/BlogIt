# frozen_string_literal: true

# == Schema Information
#
# Table name: votes
#
#  id         :integer          not null, primary key
#  value      :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  post_id    :integer          not null
#  user_id    :integer          not null
#
# Indexes
#
#  index_votes_on_post_id              (post_id)
#  index_votes_on_user_id              (user_id)
#  index_votes_on_user_id_and_post_id  (user_id,post_id) UNIQUE
#
# Foreign Keys
#
#  post_id  (post_id => posts.id)
#  user_id  (user_id => users.id)
#
class Vote < ApplicationRecord
  belongs_to :user
  belongs_to :post
  validates :value, inclusion: { in: [-1, 1] }
  validates :user_id, uniqueness: { scope: :post_id }

  after_save :update_bloggable_status

  private

    def update_bloggable_status
      post.update_bloggable_status
    end
end
