module ApplicationHelper
  OPTIONS = [['Stockholm', 'ARN'], ['Barcelona', 'BCN'], ['Charles De Gaulles', 'CDG'], ['Frankfurt', 'FRA'], ['London Heathrow', 'LHR'], ['Munich', 'MUC'], ['Prague', 'PRG'], ['Riga', 'RIX']]
  
  def airport_options
    options_for_select(OPTIONS)
  end
end
