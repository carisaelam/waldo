Rails.application.routes.draw do
  resources :characters, only: [:index]
  post '/verify', to: 'verifications#check'
end
