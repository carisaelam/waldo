class CreateCharacters < ActiveRecord::Migration[7.2]
  def change
    create_table :characters do |t|
      t.string :name
      t.jsonb :normalized_coords
      t.boolean :is_found
      t.jsonb :img

      t.timestamps
    end
  end
end
