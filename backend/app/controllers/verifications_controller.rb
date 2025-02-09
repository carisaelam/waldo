class VerificationsController < ApplicationController
  def check 
    result = perform_verification(params)

    if result[:success]
      render json: {message: 'Verification successful' }, status: :ok
    else
      render json: {error: result[:error]}, status: :unprocessable_entity
    end
  end

  private

  def perform_verification(params)
    puts 'performing verification'
    { success: true, error: nil}
  end
end