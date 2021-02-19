class Ghost {

    static all = []
    static container = document.getElementById('ghost-list')

    constructor({id, name, strengths, weaknesses, evidence_id}){
        this.name = name
        this.strengths = strengths
        this.weaknesses = weaknesses
        this.evidence_id = evidence_id
        this.id = id
        this.element = document.createElement('li')
        this.element.dataset["id"] = id
        this.element.id = `ghost-${id}`
        Ghost.all.push(this)

    }

    handleLiClick = (e) => {
        if (e.target.innerText === "Edit") {
            e.target.innerText = "Save"
            this.createEditFields(e.target)
        } else if (e.target.innerText === "Delete") {
            this.deleteGhost(e)
        } else if(e.target.innerText === "Save") {
            e.target.innerText = "Edit"
            this.saveUpdatedItem()
        }
    }

    createEditFields = (editBtn) => {
        const li = this.element
        const div = this.element.querySelector('div')

        for (const e of div.children) {
            let inputValue = e.innerText
            let name = e.classList[0]
            e.outerHTML = `<input type="text" class="edit-${name}" value="${inputValue}">`
        }
    }

    static filterByEvidence(evidence) {

        if (evidence) {
            for (const ghost of Ghost.all) {
                // console.log(evidence.id)
                // console.log(Ghost.all)
                if (ghost.evidence_id === parseInt(evidence.id)) {
                    ghost.element.style.display = ""
                } else {
                    ghost.element.style.display = "none"
                }
            }
        } else {
            for (let ghost of Ghost.all) {
                ghost.element.style.dislpay = ""
            }
        }
    }

    deleteGhost = (e) => {
        this.element.remove()
        ghostApi.deleteGhost(this.id)
    }

    updateGhost = () => {
        this.name = this.element.querySelector(".edit-name").value 
        this.strengths = this.element.querySelector("edit-strengths").value
        this.weaknesses = this.element.querySelector(".edit-description").value

        ghostApi.sendPatch(this)
    }

    render() {
    
        this.element.innerHTML = `
            <strong class="name">${this.name}</strong>
            <ul data-id="${this.id}">
                
                <li class="strengths">${this.strengths}</li>
                <li class="weaknesses">${this.weaknesses}</li>
                 
                
            </ul>
            <button class="edit" data-id="${this.id}">Edit</button>
            <button class="delete" data-id="${this.id}">Delete</button>
        `
        
        return this.element
    }

    attachToDom() {
        
        this.render()
        Ghost.container.appendChild(this.element)
        this.element.addEventListener('click', this.handleLiClick)

    }

}