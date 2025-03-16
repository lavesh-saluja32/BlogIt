# frozen_string_literal: true

class Api::V1::PostsController < ApplicationController
  after_action :verify_authorized, except: [:index, :user_posts]
  # after_action :verify_policy_scoped, only: :index
  before_action :load_post!, only: %i[show update destroy]

  def index
    current_user = @current_user
    current_user_organization = current_user.organization
    puts params[:category_names]
    if params[:category_names].present?
      category_names = params[:category_names]
      @posts = Post.includes(:categories).published
        .where(organization_id: current_user_organization.id)
        .where(categories: { name: category_names })
        .distinct
    else
      @posts = Post.includes(:categories).published
        .where(organization_id: current_user_organization.id)
    end
    render
  end

  def user_posts
    posts = current_user.posts.includes(:categories)
    @posts = Api::V1::UserPostFilterService.new(posts, params).process!
  end

  def show
    puts "hello"
    authorize @post
    render status: :ok, json: { post: @post, categories: @post.categories, user: @post.user }
  end

  def create
    user = @current_user
    organization = user.organization

    post = Post.new(post_params)
    authorize post
    post.user = user
    post.organization = organization

    if params[:category_ids].present?
      categories = Category.where(id: params[:category_ids])
      post.categories << categories
    end
    post.save!
    render_notice(t("successfully_created", entity: "Post"))
  end

  def update
    authorize @post
    @post.update!(post_params)
    render_notice(t("successfully_updated", entity: "Post"))
  end

  def update_publish_bulk
    params = update_bulk_params

    @posts = Post.where(id: params[:ids])
    authorize @posts
    puts "#{params} ===="
    puts @posts
    @posts.update_all(publish: params[:publish], updated_at: DateTime.current)
    render_notice(t("successfully_updated", entity: "Posts"))
  end

  def destroy
    authorize @post
    @post.destroy!
    render_notice(t("successfully_deleted", entity: "Post"))
  end

  def destroy_bulk
    params = destroy_bulk_params
    puts "#{params} ==="
    @posts = Post.where(id: params[:ids])
    authorize @posts
    @posts.destroy_all
    render_notice(t("successfully_deleted", entity: "Posts"))
  end

  private

    def load_post!
      @post = Post.find_by!(slug: params[:slug])
    end

    def post_params
      params.require(:post).permit(:title, :description, :publish, category_ids: [])
    end

    def update_bulk_params
      params.require(:posts).permit(:publish, ids: [])
    end

    def destroy_bulk_params
      params.require(:posts).permit(ids: [])
    end
end
