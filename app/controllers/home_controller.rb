class HomeController < ApplicationController
  BASE = { seat: '13A', flight_no: 'XX1234', user_id: 'U123456', amount: 1, price_currency: 'EUR' }

  def add_shopping_item
    items = ShoppingItem.where(flight_no: BASE[:flight_no], user_id: BASE[:user_id], name: params[:name])
    if items.any?
      items.first.increment!(:amount)
    else
      ShoppingItem.create(BASE.merge(params.slice(:price_cents, :name, :image_url)))
    end
    redirect_to root_path
  end

  def welcome
    @products = GalleyItem.all.to_a
    @shopping_items = ShoppingItem.where(flight_no: BASE[:flight_no], user_id: BASE[:user_id])
    @base = BASE
  end

  def flight_search
    ndc_client = NDCClient::Base.new(NDC_CONFIG)
    @ndc_response = ndc_client.request(:AirShopping, flight_search_query)
  end

  def service_search
    ndc_client = NDCClient::Base.new(NDC_CONFIG)
    @ndc_response = ndc_client.request(:ServiceList, services_query)
  end

  private
 
  # RE6c07bf8de1a04859bda7a027ad11d665
  def services_query
    { ShoppingResponseIDs: { ResponseID: params[:response_id] } }
  end

  # departure_airport_code: 'FRA', arrival_airport_code: 'LHR', departure_date: '2015-11-11'
  def flight_search_query
    {
      CoreQuery: {
        OriginDestinations: {
          OriginDestination: {
            Departure: {
              AirportCode: params[:departure_airport_code],
              Date: params[:departure_date]
            },
            Arrival: {
              AirportCode: params[:arrival_airport_code]
            }
          }
        }
      }
    }
  end
end
