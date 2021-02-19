class EvidencesController < ApplicationController
    def index
        evidence = Evidence.all
        # options = {include: [:ghosts]}
        render json: EvidenceSerializer.new(evidence)
    end
end