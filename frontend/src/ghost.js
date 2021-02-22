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
            this.saveUpdatedGhost()
        }
    }

    createEditFields = (editBtn) => {
        const ghostName = this.element.querySelector('strong')
        const ul = this.element.querySelector('ul')
        let nameInputValue = ghostName.innerText
        ghostName.outerHTML = `<input type="text" class="edit-name" value="${nameInputValue}">`
        
        for (const e of ul.children) {
            let inputValue = e.innerText
            let name = e.classList[0]

            if (e.className === "evidence") {
                e.outerHTML = `<select class="edit-${name}" value="${inputValue}">`
            
            } else if (e.className === "strengths" || e.className === "weaknesses") {
                e.outerHTML = `<input type="text" class="edit-${name}" value="${inputValue}">`
            }
        }
    }

    saveUpdatedGhost = () => {
        this.name = this.element.querySelector(".edit-name").value
        this.weaknesses = this.element.querySelector(".edit-weaknesses").value
        this.strengths = this.element.querySelector(".edit-strengths").value
        ghostApi.editGhost(this)
    }

    static filterByEvidence(evidence) {
        if (evidence) {
            for (const ghost of Ghost.all) {
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

        ghostApi.updateGhost(this)
    }

    render() {
        this.element.className = "list-group-item"
        this.element.innerHTML = `
            <strong class="name display-4">${this.name}</strong>
            <ul class="mt-3" data-id="${this.id}">
                <label class="font-weight-bold pt-2">Strengths </label>
                <li class="strengths">${this.strengths}</li><br>
                <label class="font-weight-bold">Weaknesses </label>
                <li class="weaknesses">${this.weaknesses}</li><br>
                <label class="font-weight-bold">Evidence </label>
                <li class="evidence">${Evidence.all[this.evidence_id-1].name}</li>
                 
            </ul><br>
            <button class="edit btn-dark" data-id="${this.id}">Edit</button>
            <button class="delete btn-dark" data-id="${this.id}">Delete</button>
        `
        
        return this.element
    }

    attachToDom() {
        
        this.render()
        Ghost.container.appendChild(this.element)
        this.element.addEventListener('click', this.handleLiClick)

    }

}