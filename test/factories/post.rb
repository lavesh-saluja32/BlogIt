# frozen_string_literal: true

FactoryBot.define do
  factory :post do
    title { Faker::Lorem.sentence }
    description { Faker::Lorem.paragraph }
    upvotes { 0 }
    downvotes { 0 }
    is_bloggable { [true, false].sample }
    slug { Faker::Internet.slug }
    user
    organization { user.organization }
  end
end
