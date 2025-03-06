# frozen_string_literal: true

class Api::V1::PostsController < ApplicationController
  def index
    if params[:category_names].present?
      category_names = params[:category_names].split(",")
      @posts = Post.includes(:categories)
        .where(categories: { name: category_names })
        .distinct
    else
      @posts = Post.includes(:categories).all
    end
    render
  end

  def show
    post = Post.find_by(slug: params[:slug])
    render status: :ok, json: { post:, categories: post.categories, user: post.user }
  end

  def create
    default_user = User.first
    default_organization = Organization.first

    post = Post.new(post_params)
    post.user = default_user
    post.organization = default_organization

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
