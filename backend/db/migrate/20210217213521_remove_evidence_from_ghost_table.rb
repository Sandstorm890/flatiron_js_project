class RemoveEvidenceFromGhostTable < ActiveRecord::Migration[6.1]
  def change
    remove_column :ghosts, :evidence
  end
end
