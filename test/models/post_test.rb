# frozen_string_literal: true

# == Schema Information
#
# Table name: posts
#
#  id              :integer          not null, primary key
#  description     :text             not null
#  downvotes       :integer          default(0), not null
#  is_bloggable    :boolean          default(FALSE)
#  publish         :string           default("unpublished"), not null
#  slug            :string           not null
#  title           :string           not null
#  upvotes         :integer          default(0), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  organization_id :integer          not null
#  user_id         :integer          not null
#
# Indexes
#
#  index_posts_on_organization_id  (organization_id)
#  index_posts_on_slug             (slug) UNIQUE
#  index_posts_on_user_id          (user_id)
#
# Foreign Keys
#
#  organization_id  (organization_id => organizations.id)
#  user_id          (user_id => users.id)
#
require "test_helper"

class PostTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @post = build(:post, user: @user, organization: @organization)
  end

  def test_post_should_be_valid_with_valid_attributes
    assert @post.valid?
  end

  def test_post_should_be_invalid_without_title
    @post.title = ""
    assert_not @post.valid?
    assert_includes @post.errors.full_messages, "Title can't be blank"
  end

  def test_post_title_should_not_exceed_max_length
    @post.title = "a" * (Post::MAX_TITLE_LENGTH + 1)
    assert_not @post.valid?
    assert_includes @post.errors.full_messages, "Title is too long (maximum is #{Post::MAX_TITLE_LENGTH} characters)"
  end

  def test_post_should_be_invalid_without_description
    @post.description = ""
    assert_not @post.valid?
    assert_includes @post.errors.full_messages, "Description can't be blank"
  end

  def test_post_description_should_not_exceed_max_length
    @post.description = "a" * (Post::MAX_DESCRIPTION_LENGTH + 1)
    assert_not @post.valid?
    assert_includes @post.errors.full_messages, "Description is too long (maximum is #{Post::MAX_DESCRIPTION_LENGTH} characters)"
  end

  def test_post_should_be_invalid_without_user
    @post.user = nil
    assert_not @post.valid?
    assert_includes @post.errors.full_messages, "User must exist"
  end

  def test_post_should_be_invalid_without_organization
    @post.organization = nil
    assert_not @post.valid?
    assert_includes @post.errors.full_messages, "Organization must exist"
  end

  def test_post_should_have_unique_slug
    @post.save!
    duplicate_post = build(:post, title: @post.title, user: @user, organization: @organization)
    duplicate_post.save
    assert_not_equal @post.slug, duplicate_post.slug, "Slug should be unique"
  end

  def test_slug_is_immutable_after_creation
    @post.save!
    original_slug = @post.slug
    @post.update(title: "New Title")
    assert_equal original_slug, @post.reload.slug, "Slug should not change after creation"
  end

  def test_post_should_generate_slug_from_title
    title = "A Unique Title"
    @post.title = title
    @post.save!
    assert_equal title.parameterize, @post.slug
  end

  def test_post_should_have_default_upvotes_and_downvotes
    @post.save!
    assert_equal 0, @post.upvotes
    assert_equal 0, @post.downvotes
  end

  def test_post_should_allow_boolean_values_for_is_bloggable
    @post.is_bloggable = true
    assert @post.valid?

    @post.is_bloggable = false
    assert @post.valid?
  end

  def test_post_should_not_allow_null_is_bloggable
    @post.is_bloggable = nil
    assert_not @post.valid?
    assert_includes @post.errors.full_messages, "Is bloggable is not included in the list"
  end
end
