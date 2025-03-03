# frozen_string_literal: true

class Api::V1::PostsController < ApplicationController
  def index
    posts = Post.all
    render status: :ok, json: { posts: }
  end

  def show
    post = Post.find_by(slug: params[:slug])
    render status: :ok, json: { post: }
  end

  def create
    post = Post.new(task_params)
    post.save!
    render_notice(t("successfully_created"))
  end

  private

    def task_params
      params.require(:post).permit(:title, :description)
    end
end
