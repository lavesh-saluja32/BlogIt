# frozen_string_literal: true

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  namespace :api do
    namespace :v1 do
      constraints(lambda { |req| req.format == :json }) do
        resources :posts, except: %i[new edit], param: :slug do
          resource :vote, only: [:create, :destroy]
          resource :report, only: [:create] do
            get "download", on: :collection
          end
        end
        resources :categories, only: %i[index create]
        resources :users, only: %i[create]
        resources :organizations, only: %i[index]
        resource :session, only: [:create, :destroy]
        get "user_posts", to: "posts#user_posts"
        patch "update_publish_bulk", to: "posts#update_publish_bulk"
        delete "destroy_bulk", to: "posts#destroy_bulk"
      end
    end
  end
  root "home#index"
  get "*path", to: "home#index", via: :all
end
