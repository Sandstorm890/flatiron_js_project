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

        this.element.addEventListener('click', handleLiClick)
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
}