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
    puts "performing verification with params #{params}"
    
    if params[:test] == 'invalid' 
      {success: false, error: 'Invalid'}
    else
      {success: true, error: nil}
    end
  end
end