# frozen_string_literal: true

class Api::V1::OrganizationsController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: :index
  def index
    puts "hello"
    @organizations = Organization.all
    puts @organizations
    render json: @organizations
  end
end
