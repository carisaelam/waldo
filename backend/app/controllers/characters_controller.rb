class CharactersController < ApplicationController
  def index
    level = params[:level] || 1
    characters = Character.where(level: level)
    render json: characters
  end
end
