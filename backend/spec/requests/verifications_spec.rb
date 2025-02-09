require 'rails_helper'

RSpec.describe "Verifications", type: :request do
  describe "POST /verify" do
    let!(:character) { Character.create(name: 'Waldo', level: 1, normalized_coords: [0.53, 0.48])}

    it "returns a success message when verification succeeds" do
      post '/verify', params: { character_name: 'Waldo', x: 0.53, y: 0.48, level: 1}
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["message"]).to eq('Character found!')
      expect(JSON.parse(response.body)["success"]).to eq(true)
    end

    it "returns an error message when verification fails" do 
      post '/verify', params: { character_name: 'Waldo', x: 0.1, y: 0.1, level: 1}
      expect(response).to have_http_status(:unprocessable_entity)
      expect(JSON.parse(response.body)["error"]).to eq("Character not found here")
      expect(JSON.parse(response.body)["success"]).to eq(false)
    end
  end
end
