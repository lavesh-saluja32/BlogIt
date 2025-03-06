# frozen_string_literal: true

class Api::V1::OrganizationsController < ApplicationController
  def index
    puts "hello"
    @organizations = Organization.all
    puts @organizations
    render json: @organizations
  end
end
