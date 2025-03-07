# frozen_string_literal: true

require "test_helper"

class Api::V1::PostsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @other_organization = create(:organization)
    @other_user = create(:user, organization: @other_organization)
    @category1 = create(:category, name: "Tech")
    @category2 = create(:category, name: "Health")
    @post1 = create(:post, user: @user, organization: @organization, categories: [@category1])
    @post2 = create(:post, user: @user, organization: @organization, categories: [@category2])
    @post_other_org = create(:post, user: @other_user, organization: @other_organization, categories: [@category1])
    @headers = headers(@user)
  end

  def test_should_list_all_posts_in_user_organization
    get api_v1_posts_url, headers: @headers, as: :json
    assert_response :success
    response_posts = response.parsed_body["posts"] # Ensure we access the correct array

    assert_equal "2", response_posts.size.to_s # Ensure we check the correct count
    response_posts.each do |post|
      assert_equal @organization.id, Post.find(post["id"]).organization_id
    end
  end

  def test_should_filter_posts_by_category
    get api_v1_posts_url, params: { category_names: "Tech" }, headers: @headers, as: :json
    assert_response :success
    response_posts = response.parsed_body["posts"]
    assert_equal 1, response_posts.count
    assert_equal @post1.id, response_posts.first["id"]
  end

  def test_should_show_post_with_valid_slug
    get api_v1_post_url(slug: @post1.slug), headers: @headers, as: :json
    assert_response :success
    response_body = response.parsed_body
    assert_equal @post1.id, response_body["post"]["id"]
  end

  def test_should_return_not_found_for_invalid_slug
    get api_v1_post_url(slug: "invalid-slug"), headers: @headers, as: :json
    assert_response :not_found
  end

  def test_should_not_show_post_from_different_organization
    get api_v1_post_url(slug: @post_other_org.slug), headers: @headers, as: :json
    assert_response :forbidden
  end

  def test_should_create_post_with_valid_params
    valid_params = {
      post: {
        title: "New Post Title",
        description: "New Post Description",
        category_ids: [@category1.id, @category2.id]
      }
    }

    assert_difference "Post.count", 1 do
      post api_v1_posts_url, params: valid_params, headers: @headers, as: :json
    end

    assert_response :success
  end

  def test_should_not_create_post_with_invalid_params
    invalid_params = { post: { title: "", description: "", category_ids: [] } }

    assert_no_difference "Post.count" do
      post api_v1_posts_url, params: invalid_params, headers: @headers, as: :json
    end

    assert_response :unprocessable_entity
  end
end
