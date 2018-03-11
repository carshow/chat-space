Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  resource :user, only: [:edit, :update ]do
    collection do
      get "search"
    end
  end
  resources :groups, only: [:new, :create, :update, :edit] do
    resources :messages, only: [:index, :create]
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
