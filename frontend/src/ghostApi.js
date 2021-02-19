class GhostApi {

    constructor(port){
        this.baseUrl = `${port}/ghosts`
    }

    getGhosts() {
        fetch(this.baseUrl)
        .then(r => r.json())
        .then(json => {
            json["data"].forEach(element => {
                const ghost = new Ghost({id: element.id, ...element.attributes})
                
                ghost.attachToDom()
            });
        })
    }

    deleteGhost = (id) => {
        const configObj = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        }

        fetch(`${this.baseUrl}/${id}`, configObj)
            .then(r => r.json())
            .then(json => alert(json.message))
    }
}