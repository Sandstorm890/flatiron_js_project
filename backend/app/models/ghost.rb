class Ghost < ApplicationRecord
    belongs_to :evidence
    # accepts_nested_attributes_for :evidences
end
