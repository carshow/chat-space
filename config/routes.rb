Rails.application.routes.draw do
  devise_for :users
  root 'messages#index'
  resource :user, only: [:edit, :update]
  resources :group, only: [:new, :create, :update, :edit] do
    resources :messages, only: [:index, :create]
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
