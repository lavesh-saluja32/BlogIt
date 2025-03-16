# frozen_string_literal: true

class PostPolicy
  attr_reader :user, :post
  def initialize(user, post)
    @user = user
    @post = post
  end

  def show?
    user.organization_id == post.organization_id
  end

  def create?
    true
  end

  def update?
    user.id == post.user_id
  end

  def destroy?
    update?
  end

  def update_publish_bulk?
    post.all? { |post| post.user_id == user.id }
  end

  def destroy_bulk?
    post.all? { |post| post.user_id == user.id }
  end
end
