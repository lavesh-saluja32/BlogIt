# frozen_string_literal: true

json.posts @posts do |post|
  json.id post.id
  json.title post.title
  json.description post.description
  json.published post.publish
  json.created_at post.created_at
  json.updated_at post.updated_at
  json.slug post.slug
  json.categories post.categories do |category|
    json.id category.id
    json.name category.name
  end
end
