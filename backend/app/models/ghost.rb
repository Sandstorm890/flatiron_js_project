class Ghost < ApplicationRecord
    has_many :evidences
    accepts_nested_attributes_for :evidences
end
