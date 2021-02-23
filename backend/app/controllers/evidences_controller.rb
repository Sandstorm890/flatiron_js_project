class EvidencesController < ApplicationController
    def index
        evidence = Evidence.all
        render json: EvidenceSerializer.new(evidence)
    end
end