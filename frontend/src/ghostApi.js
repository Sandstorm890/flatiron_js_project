class GhostApi {

    constructor(port){
        this.baseUrl = `${port}/ghosts`
    }

    getGhosts() {
        fetch(this.baseUrl)
        .then(r => r.json())
        .then(json => {
            // console.log(json["data"])
            json["data"].forEach(element => {
                // console.log(element.attributes["evidence"].id)
                const ghost = new Ghost({id: element.id, evidence_id: element.attributes["evidence"].id,  ...element.attributes})
                ghost.attachToDom()
            });
        })
    }

    createGhost() {
        console.log(evidenceInput.value)
        const ghostInfo = {
            ghost: {
                name: nameInput.value,
                weaknesses: weaknessesInput.value,
                strengths: strengthsInput.value,
                evidence_id: evidenceInput.value
            } 
        }

        const configObj = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(ghostInfo)
        }

        fetch(this.baseUrl, configObj)
            .then(r => r.json())
            .then(json => {
                const newGhost = new Ghost({id: json.data.id, ...json.data.attributes})
                newGhost.attachToDom()
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