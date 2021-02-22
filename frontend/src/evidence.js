class Evidence {

    static all = []
    static evidenceButtons = document.getElementById("evidence-buttons")

    

    constructor({id, name}){
        this.id = id
        this.name = name
        this.element = document.createElement("button")
        Evidence.all.push(this)
    }

    addToDropDown() {
        const option = document.createElement('option')
        option.value  = this.id 
        option.innerText = this.name
        dropdown.append(option)
    }

    addToEditDropDown() {
        const option = document.createElement('option')
        option.value  = this.id
        option.innerText = this.name
        dropdownEdit.append(option)
    }

    currentEvidence = (e) => {
        let activeEvidence
        Evidence.all.forEach(e => {
            if (e.element === this.element && !this.active) {
                e.className = "activated"
                e.active = true
                activeEvidence = e
            } else {
                e.element.className = 'btn-dark'
                e.active = false
            }
            
            Ghost.filterByEvidence(activeEvidence)
        })
    }

    render() {
        this.element.innerText = this.name 
        this.element.id = `evidence-${this.id}`        
        return this.element
    }

    addEvidenceListeners() {
        this.element.addEventListener('click', this.currentEvidence)
    }

    addEvidenceButtonsToDom() {
        this.element.className = "btn btn-dark"
        Evidence.evidenceButtons.append(this.render())
        this.addEvidenceListeners()
    }
    
}