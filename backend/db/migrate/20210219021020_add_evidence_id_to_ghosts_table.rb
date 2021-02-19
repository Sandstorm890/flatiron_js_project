class AddEvidenceIdToGhostsTable < ActiveRecord::Migration[6.1]
  def change
    add_column :ghosts, :evidence_id, :integer
  end
end
