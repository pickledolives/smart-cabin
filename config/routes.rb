Rails.application.routes.draw do
  namespace :home do
    get 'welcome'
    post 'service_search'
    post 'flight_search'
    post 'add_shopping_item'
  end

  root 'home#welcome'
end
