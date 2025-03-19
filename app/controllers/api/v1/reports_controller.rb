# frozen_string_literal: true

class Api::V1::ReportsController < ApplicationController
  before_action :set_post, only: :download
  def create
    puts "Hello"
    puts params
    PostJob.perform_async(params[:post_slug], @current_user.id)
    render_json
  end

  def download
    puts @post
    if @post.report.attached?
      send_data @post.report.download, filename: pdf_file_name, type: "application/pdf"
    else
      render_error(t("not_found", entity: "report"), :not_found) and return
    end
  end

  private

    def set_post
      @post = Post.find_by!(slug: params[:post_slug])
    end

    def pdf_file_name
      "report.pdf"
    end
end
