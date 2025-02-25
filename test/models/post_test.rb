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
require "test_helper"

class PostTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
