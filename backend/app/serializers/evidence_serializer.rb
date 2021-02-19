class EvidenceSerializer
    include FastJsonapi::ObjectSerializer
    attributes :name
    # has_many :ghosts
  end