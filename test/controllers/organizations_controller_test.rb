# frozen_string_literal: true

require "test_helper"

class Api::V1::OrganizationsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization1 = create(:organization, name: "Org One")
    @organization2 = create(:organization, name: "Org Two")
  end

  def test_should_get_index
    get api_v1_organizations_url, as: :json
    assert_response :success

    json_response = JSON.parse(response.body)
    puts json_response
    assert_equal Organization.count, json_response.length
    assert_equal @organization1.name, json_response.first["name"]
    assert_equal @organization2.name, json_response.second["name"]
  end
end
