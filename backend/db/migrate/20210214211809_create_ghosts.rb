class CreateGhosts < ActiveRecord::Migration[6.1]
  def change
    create_table :ghosts do |t|
      t.string :name
      t.text :strengths
      t.text :weaknesses
      t.text :evidence

      t.timestamps
    end
  end
end
