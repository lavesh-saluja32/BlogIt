# frozen_string_literal: true

json.posts @posts do |post|
  json.extract! post, :id, :title, :description, :upvotes, :downvotes, :is_bloggable, :slug, :created_at, :updated_at,
    :publish

  json.user do
    json.extract! post.user, :id, :name
  end

  json.categories post.categories do |category|
    json.extract! category, :id, :name
  end

  json.net_votes post.new_votes
  json.current_user_vote @user_votes[post.id]&.value || 0
end
