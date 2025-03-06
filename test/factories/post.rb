# frozen_string_literal: true

FactoryBot.define do
  factory :post do
    title { Faker::Lorem.sentence }
    description { Faker::Lorem.paragraph }
    upvotes { rand(0..100) }
    downvotes { rand(0..50) }
    is_bloggable { [true, false].sample }
    slug { Faker::Internet.slug }
    user # Automatically assigns a user (which assigns an organization)
    organization { user.organization } # Ensures post has the same organization as the user
  end
end
