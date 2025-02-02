class AddLevelToCharacters < ActiveRecord::Migration[7.2]
  def change
    add_column :characters, :level, :integer
  end
end
