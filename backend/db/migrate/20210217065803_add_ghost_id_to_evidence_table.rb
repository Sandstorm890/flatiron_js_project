class AddGhostIdToEvidenceTable < ActiveRecord::Migration[6.1]
  def change
    add_column :evidences, :ghost_id, :integer
  end
end
