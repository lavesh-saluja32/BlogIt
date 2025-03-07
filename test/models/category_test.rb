# frozen_string_literal: true

# == Schema Information
#
# Table name: categories
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_categories_on_name  (name) UNIQUE
#
require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @category = build(:category)
  end

  def test_category_should_be_valid_with_valid_attributes
    assert @category.valid?
  end

  def test_category_should_not_be_valid_without_name
    @category.name = ""
    assert_not @category.valid?
    assert_includes @category.errors.full_messages, "Name can't be blank"
  end

  def test_category_name_should_be_unique
    @category.save!
    duplicate_category = build(:category, name: @category.name)
    assert_not duplicate_category.valid?
    assert_includes duplicate_category.errors.full_messages, "Name has already been taken"
  end
end
