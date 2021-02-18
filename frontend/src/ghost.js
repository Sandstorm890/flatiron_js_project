class Ghost {

    static all = []
    static container = document.getElementById('ghost-list')

    constructor({id, name, strengths, weaknesses}){
        this.name = name
        this.strengths = strengths
        this.weaknesses = weaknesses
        this.id = id

        this.element = document.createElement('li')
        this.element.dataset["id"] = id
        this.element.id = `ghost-${id}`

        // this.element.addEventListener('click', handleLiClick)
    }

    handleLiClick = (e) => {
        if(e.target.innerText === "Edit"){
            e.target.innerText = "Save"
            this.createEditFields(e.target)
        } else if (e.target.innerText === "Delete"){
            this.deleteGhost(e)
        } else if(e.target.innerText === "Save"){
            e.target.innerText = "Edit"
            this.saveUpdatedItem()
        }
    }

    createEditFields = (editBtn) => {
        const li = this.element
        const div = this.element.querySelector('div')

        for(const e of div.children){
            let inputValue = e.innerText
            let name = e.classList[0]
            e.outerHTML = `<input type="text" class="edit-${name}" value="${inputValue}">`
        }
    }

    deleteGhost = (e) => {
        this.element.remove()
        ghostApi.deleteGhost(this)
    }

    updateGhost = () => {
        this.name = this.element.querySelector(".edit-name").value 
        this.strengths = this.element.querySelector("edit-strengths").value
        this.weaknesses = this.element.querySelector(".edit-description").value

        ghostApi.sendPatch(this)
    }

    render(){
        this.element.innerHTML = `
            <div data-id="${this.id}">
                <strong class="name">${this.name}</strong>:
                <span class="strengths">${this.strengths}</span>
                <span class="weaknesses">${this.weaknesses}</span> 
            </div>
            <button class="edit" data-id="${this.id}">Edit</button>
            <button class="delete" data-id="${this.id}">Delete</button>
        `
        return this.element
    }

    attachToDom(){
        this.render()
        Ghost.container.appendChild(this.element)

        // adding the event listener could be placed here instead of the constructor function
    }

}