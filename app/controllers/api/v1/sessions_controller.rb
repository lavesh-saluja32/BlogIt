# frozen_string_literal: true

class Api::V1::SessionsController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token
  def create
    @user = User.find_by!(email: login_params[:email].downcase)
    puts @user
    unless @user.authenticate(login_params[:password])
      render_error("Incorrect credentials, try again.", :unauthorized)
    end
  end

  def destroy
    @current_user = nil
  end

  private

    def login_params
      puts params
      params.require(:login).permit(:email, :password)
    end
end
