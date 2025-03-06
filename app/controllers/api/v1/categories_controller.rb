# frozen_string_literal: true

class Api::V1::CategoriesController < ApplicationController
  def index
    @categories = Category.all
    render :index
  end

  def create
    category = Category.new(category_params)
    category.save!
    render_notice(t("successfully_created"))
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end
end
