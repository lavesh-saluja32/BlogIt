# frozen_string_literal: true

class AddPublishToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :publish, :string, default: "unpublished", null: false
  end
end
