class AddPositionToCards < ActiveRecord::Migration[7.0]
  def change
    add_column :cards, :position, :integer
  end
end
