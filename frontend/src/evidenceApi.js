class evidenceApi {

    constructor(port) {
        this.baseUrl = `${port}/evidences`
    }

    getEvidence(){
        fetch(this.baseUrl)
        .then(r => r.json())
        .then(json => {
            json["data"].forEach(element => {
                const evidence = new evidence({id: element.id, ...element.attributes})
                evidence.addToDom()
            });
                
        })
    }
}