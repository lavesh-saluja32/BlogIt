# frozen_string_literal: true

class Api::V1::PostsController < ApplicationController
  def index
    current_user = @current_user
    current_user_organization = current_user.organization

    if params[:category_names].present?
      category_names = params[:category_names].split(",")
      @posts = Post.includes(:categories)
        .where(organization_id: current_user_organization.id)
        .where(categories: { name: category_names })
        .distinct
    else
      @posts = Post.includes(:categories)
        .where(organization_id: current_user_organization.id)
    end
    render
  end

  def show
    post = Post.find_by(slug: params[:slug])
    if post.nil?
      puts "hello"
      render status: :not_found, json: { error: "Post not found." }
    elsif post.organization_id != current_user.organization_id
      render status: :forbidden, json: { error: "You are not authorized to view this post." }
    else
      render status: :ok, json: { post:, categories: post.categories, user: post.user }
    end
  end

  def create
    user = @current_user
    organization = user.organization

    post = Post.new(post_params)
    post.user = user
    post.organization = organization

    if params[:category_ids].present?
      categories = Category.where(id: params[:category_ids])
      post.categories << categories
    end
    post.save!
    render_notice(t("successfully_created", entity: "Post"))
  end

  private

    def post_params
      params.require(:post).permit(:title, :description, category_ids: [])
    end
end
