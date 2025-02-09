require 'rails_helper'

RSpec.describe "Verifications", type: :request do
  describe "POST /verify" do
    it "returns a success message when verification succeeds" do
      post '/verify', params: { test: 'data'}
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["message"]).to eq('Verification successful')
    end

    it "returns an error message when verification fails" do 
      post '/verify', params: { test: 'invalid'}
      expect(response).to have_http_status(:unprocessable_entity)
      expect(JSON.parse(response.body)["error"]).to eq('Invalid')
    end
  end
end
