class GhostsController < ApplicationController

    def index
        # byebug
        ghosts = Ghost.all
        render json: GhostSerializer.new(ghosts)
    end

    def show
        ghost = Ghost.find(params[:id])
        render json: GhostSerializer.new(ghost)
    end

    def create
        # byebug
        ghost = Ghost.new(ghost_params)
        if ghost.save
            render json: GhostSerializer.new(ghost)
        else
            render json: {error: "could not save new ghost"}
        end
    end

    def destroy
        ghost = Ghost.find(params[:id])
        ghost.destroy
        render json: {message: "deleted #{ghost.name}"}
    end

    def update
        ghost = Ghost.find(params[:id])
        if ghost.update(ghost_params)
            render json: GhostSerializer.new(ghost)
        else
            render json: {error: "could not save"}
        end
    end

    private

    def ghost_params
        params.require(:ghost).permit(:name, :strengths, :weaknesses, :evidence_id)
    end
    
end