class EvidenceApi {

    constructor(port) { // basic constructor that defines attributes upon instance initilaization (in this class and the ghostApi class, this process only happens once)
        this.baseUrl = `${port}/evidences` // assigns the appropriate URL to the baseUrl attribute (URL returns a JSON file with all the evidence objects)
    }

    getEvidence(){ // turns all of the returned JSON objects into instances of the Evidence class
        fetch(this.baseUrl) // pings the API in the backend to return the Evidence JSON 
        .then(r => r.json()) // parses that JSON
        .then(json => {
            json["data"].forEach(element => { // iterates through the JSON objects and creates Evidence instances from each of them
                const evidence = new Evidence({id: element.id, ...element.attributes}) // assigns new instance to a variable
                evidence.addEvidenceButtonsToDom() // adds the evidence instances to the DOM as buttons  
                evidence.addToDropDown() // adds the evidence instances to the DOM as an evidence-dropdown child element
            });    
        })
    }
}