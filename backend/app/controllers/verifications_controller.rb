class VerificationsController < ApplicationController
  def check 
    result = perform_verification(params)

    if result[:success]
      render json: {success: true, message: 'Character found!' }, status: :ok
    else
      render json: {success: false, error: result[:error]}, status: :unprocessable_entity
    end
  end

  private

  def perform_verification(params)
    puts "performing verification with params #{params}"

    character = Character.find_by(name: params[:character_name], level: params[:level])

    if character && is_within_range?(character, params[:x].to_f, params[:y].to_f)
      {success: true, error: nil}
    else 
      {success: false, error: 'Character not found here'}
    end
  end

  def is_within_range?(character, x, y)
    (character.normalized_coords[0] - 0.05..character.normalized_coords[0] + 0.05).cover?(x) &&
    (character.normalized_coords[1] - 0.05..character.normalized_coords[1] + 0.05).cover?(y)
  end
  
end