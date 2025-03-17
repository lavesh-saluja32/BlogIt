# frozen_string_literal: true

class Api::V1::VotesController < ApplicationController
  before_action :load_post!, only: :create

  def create
    vote = @post.votes.find_or_initialize_by(user: current_user)

    vote.assign_attributes(vote_params)
    if vote.save
      render_json
    else
      render_error(vote.errors.full_messages)
    end
  end

  private

    def load_post!
      @post = Post.find_by!(slug: params[:post_slug])
    end

    def vote_params
      params.require(:vote).permit(:value) # Ensures only `value` is accepted
    end
end
