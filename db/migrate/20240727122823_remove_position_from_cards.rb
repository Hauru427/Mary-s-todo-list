class RemovePositionFromCards < ActiveRecord::Migration[7.0]
  def change
    if column_exists?(:cards, :position)
      remove_column :cards, :position
    end
  end
end
