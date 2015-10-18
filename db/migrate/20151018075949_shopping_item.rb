class ShoppingItem < ActiveRecord::Migration
  def change
    create_table :shopping_items do |t|
      t.string :flight_no
      t.string :seat
      t.string :user_id
      t.string :name
      t.integer :price_cents
      t.string :price_currency
      t.integer :amount

      t.timestamps
    end
  end
end
