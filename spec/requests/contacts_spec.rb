require 'rails_helper'

RSpec.describe "Contacts", type: :request do
  describe "GET /new" do
    it "returns http success" do
      get "/contacts/new"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /confirm" do
    it "returns http success" do
      get "/contacts/confirm"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /done" do
    it "returns http success" do
      get "/contacts/done"
      expect(response).to have_http_status(:success)
    end
  end

end
