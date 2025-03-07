# frozen_string_literal: true

class Api::V1::UsersController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: :create
  def create
    user = User.new(user_params)
    if user.save
      render_notice(t("successfully_created", entity: "User"))
    else
      render_error(user.errors.full_messages)
    end
  end

  private

    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation, :organization_id)
    end
end
