class GhostApi {

    constructor(port){ // sets a single attribute to define the URL to access the API endpoint
        this.baseUrl = `${port}/ghosts`
    }

    getGhosts() { // gets all of the ghosts from the API, creates new Ghost instances, and attaches them to the DOM
        fetch(this.baseUrl) // starts a fetch request given the URL in defined in the contructor
        .then(r => r.json()) // parses the JSON response
        .then(json => {
            json["data"].forEach(element => { // iterates through each JSON object
                const ghost = new Ghost({id: element.id, evidence_id: element.attributes["evidence"].id,  ...element.attributes}) // creates a new instance of Ghost from the data and assigns all of the attributes
                ghost.attachToDom() // calls on the attachToDom function to attach the new JS object to the DOM so the user can see it
            });
        })
    }

    createGhost() { // creates a new instance of Ghost from somewhere other than the API (in this case, the 'new ghost' from at the bottom of the page)
        const ghostInfo = { // creates a new Ghost object from scratch - THIS DOESNT SAVE IT TO OUR GHOST CLASS
            ghost: {
                name: nameInput.value, // assigns name equal to the value of the element returned by the nameInput variable
                weaknesses: weaknessesInput.value, // does the same for weaknesses
                strengths: strengthsInput.value, // and strengths
                evidence_id: evidenceInput.value // lastly assigns the ID value of the evidence dropdown element to the ghosts evidence_id attribute
            } 
        }

        const configObj = { // defines what kind of fetch request were sending
            method: 'POST', // it's POST, so we're adding something new to the database
            headers: { // some config stuff here so the Rails server doesnt yell at us
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(ghostInfo) // chnages the object keys ans values to strings because internet
        }

        fetch(this.baseUrl, configObj) // defines which URL were fetching from/to and the configObj tells the fetch request more about how its sopposed to interact with the server
            .then(r => r.json()) // parses the JSON
            .then(json => { // takes the new JSON response with the ghost we just added and finally creates a new Ghost instance
                const newGhost = new Ghost({id: json.data.id, ...json.data.attributes}) // creates new Ghost instance
                newGhost.evidence_id = json.data.attributes.evidence.id // makes sure the evidence_id attribute gets its integer
                newGhost.attachToDom() // attaches the new ghost to the DOM for us
            })        
    }

    editGhost = (ghost) => {
        let {name, weaknesses, strengths, evidence} = ghost // uses some destructuring to declare some variables
        const ghostInfo = { // uses those destructured variables to create an object with the new ghost info
            name,
            weaknesses,
            strengths,
            evidence
        }

        const configObj = { // config settings for how were interacting with the server
            method: "PATCH", // sends a PATCH request, so server knows were updating something that already exists
            headers: { // some more config stuff so the Rails server doesnt reject us
                "Content-Type": "application/json",
                Accept: "application/json"
            }, body:JSON.stringify(ghostInfo) // changes key:value pairs to strings because internet
        }

        fetch(`${this.baseUrl}/${ghost.id}`, configObj) // begins request with an interpolated URL with the ghosts ID so the server knows which object to update
        .then(r => r.json()) // parse the JSON...PARSE IT REAL GOOD
        .then(json => {
            ghost.render() // returns the new JSON object as an HTML element - we dont need to attach it to the DOM or anything extra here because its a previously existing element
        })
    }

    deleteGhost = (id) => { // deletes a ghost from the DOM and destroys its record in the database
        const configObj = {
            method: "DELETE", // config object has a method of DELETE so the server knows were trying to remove something
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        }

        fetch(`${this.baseUrl}/${id}`, configObj) // passed an interpolated URL with a ghosts ID so the server knows we're referencing a specific record
            .then(r => r.json()) // we dont need to do anything extra here because things are only getting removed/deleted from the DOM/database
    }

}