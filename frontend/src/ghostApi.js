class ghostApi {
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

}