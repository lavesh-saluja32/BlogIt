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
class Post < ApplicationRecord
  MAX_TITLE_LENGTH = 125
  MAX_DESCRIPTION_LENGTH = 10000
  VALID_TITLE_REGEX = /\A.*[a-zA-Z0-9].*\z/i

  enum :publish, { unpublished: "unpublished", published: "published" }, default: :unpublished
  has_and_belongs_to_many :categories
  has_many :votes
  belongs_to :user
  belongs_to :organization

  validates :title, presence: true, length: { maximum: MAX_TITLE_LENGTH }, format: { with: VALID_TITLE_REGEX }
  validates :description, presence: true, length: { maximum: MAX_DESCRIPTION_LENGTH },
    format: { with: VALID_TITLE_REGEX }
  validates_inclusion_of :is_bloggable, in: [true, false]
  validates :slug, uniqueness: true
  validate :slug_not_changed

  before_create :set_slug

  def new_votes
    votes.sum(:value)
  end

  def update_bloggable_status
    update(is_bloggable: new_votes >= Constants::BLOGGABLE_THRESHOLD)
  end

  private

    def set_slug
      title_slug = title.parameterize
      regex_pattern = "slug #{Constants::DB_REGEX_OPERATOR} ?"
      latest_post_slug = Post.where(
        regex_pattern,
        "^#{title_slug}$|^#{title_slug}-[0-9]+$"
      ).order("LENGTH(slug) DESC", slug: :desc).first&.slug
      slug_count = 0
      if latest_post_slug.present?
        slug_count = latest_post_slug.split("-").last.to_i
        only_one_slug_exists = slug_count == 0
        slug_count = 1 if only_one_slug_exists
      end
      slug_candidate = slug_count.positive? ? "#{title_slug}-#{slug_count + 1}" : title_slug
      self.slug = slug_candidate
    end

    def slug_not_changed
      if will_save_change_to_slug? && self.persisted?
        errors.add(:slug, I18n.t("task.slug.immutable"))
      end
    end
end
