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
require "test_helper"

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
