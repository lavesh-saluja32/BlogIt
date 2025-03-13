# frozen_string_literal: true

class Api::V1::UserPostFilterService
  # attr_reader :posts, :params
  def initialize(posts, params)
    @posts = posts
    @params = params
  end

  def process!
    filter_by_title
    filter_by_status
    filter_by_categories
    puts @posts
    @posts
  end

  private

    def filter_by_title
      return unless @params[:title].present?

      @posts = @posts.where("title LIKE ?", "%#{@params[:title]}%")
    end

    def filter_by_categories
      return unless @params[:categories].present?

      @posts = @posts.joins(:categories).where(categories: { name: @params[:categories] })
    end

    def filter_by_status
      return unless @params[:status].present?

      @posts = @posts.where(publish: @params[:status])
    end
end
