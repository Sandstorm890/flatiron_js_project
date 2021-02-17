class GhostSerializer
    include FastJsonapi::ObjectSerializer
    attributes :name, :strengths, :weaknesses, :evidences
end