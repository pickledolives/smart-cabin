class AddUrl < ActiveRecord::Migration
  def change
    add_column :shopping_items, :image_url, :string
  end
end
