class Evidence {

    static all = []
    static evidenceButtons = document.getElementById("evidence-buttons")

    constructor({id, name}){
        this.id = id
        this.name = name

        this.element = document.createElement("button")
        Evidence.all.push(this)
    }

    addToDropDown(){
        const option = document.createElement('option')
        option.value  = this.id 
        option.innerText = this.name
        dropdown.append(option)
    }

    currentEvidence = (e) => {
        let activeEvidence
        Evidence.all.forEach(e => {
            // console.log(e.element)
            // console.log(this.element)
            if (e.element === this.element && !this.active) {
                e.className = "activated"
                e.active = true
                activeEvidence = e
            } else {
                e.element.className = 'activated'
                e.active = false
            }
            
            Ghost.filterByEvidence(activeEvidence)
        })
    }

    render() {
        this.element.innerText = this.name 
        this.element.id = `evidence-${this.id}`
        // this.element.className = " "
        
        return this.element
    }

    addEvidenceListeners() {
        this.element.addEventListener('click', this.currentEvidence)
        // add color change event listener here
    }


    addEvidenceButtonsToDom() {
        Evidence.evidenceButtons.append(this.render())
        this.addEvidenceListeners()
    }
    
}