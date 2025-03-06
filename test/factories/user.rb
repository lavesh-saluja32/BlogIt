# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    email { Faker::Internet.unique.email }
    password { "Welcome@123" }
    password_confirmation { "Welcome@123" }
    authentication_token { SecureRandom.hex(10) }
    organization # Automatically creates an organization
  end
end
