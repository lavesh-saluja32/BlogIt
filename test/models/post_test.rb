# frozen_string_literal: true

# == Schema Information
#
# Table name: posts
#
#  id           :integer          not null, primary key
#  description  :text             not null
#  downvotes    :integer          default(0), not null
#  is_bloggable :boolean          default(FALSE)
#  slug         :string           not null
#  title        :string           not null
#  upvotes      :integer          default(0), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
# Indexes
#
#  index_posts_on_slug  (slug) UNIQUE
#
require "test_helper"

class PostTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
