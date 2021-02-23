class Evidence {

    static all = [] // creates an empty to store all instances of 'evidence' in
    static evidenceButtons = document.getElementById("evidence-buttons") // creates a class-level function that gets the evidence-buttons element from the DOM


    constructor({id, name}){ // sets attributes upon instance initialization
        this.id = id // sets the id
        this.name = name // sets the name
        this.element = document.createElement("button") // creates a button element for itself
        Evidence.all.push(this) // pushes the instance to the 'all' array mentioned earlier
    }

    addToDropDown() { // adds evidence elements to the dropdown menu associated with the corresponding object
        const option = document.createElement('option') // creates an <option> element which is displayed in the <select> element
        option.value  = this.id // the value of that <option> is set equal to 'this' which refers to an instance of the evidence class
        option.innerText = this.name // sets the inner text value of the <option> that is displayed to the user to equal the evidences name
        dropdown.append(option) // appends the <option> to the variable 'dropdown' which is defined in the index file and is the <select> element where we want to display the evidences
    }

    addToEditDropDown() {
        const option = document.createElement('option')
        option.value  = this.id
        option.innerText = this.name
        dropdownEdit.append(option)
    }

    currentEvidence = (e) => {
        let activeEvidence // sets an undefined variable to assign instances of evidence to (if any)
        Evidence.all.forEach(e => { // iterates through all of our stored evidence instances
            if (e.element === this.element && !this.active) { // checks if the element provided as an argument (e) is the same as the element of the instance, and if it does. and is also not "active"
                e.className = "activated" // sets the instances className to "activated"
                e.active = true // sets a new attribute and sets it to equal 'true'
                activeEvidence = e // assigns the modified element to the activeEvidence variable
            } else { // if it doesnt meet those conditions
                e.element.className = 'btn-dark' // the button is set to display as dark
                e.active = false // the active tag is set to false
            }
            
            Ghost.filterByEvidence(activeEvidence) // feeds the returned info to the filterByEvidence class-level function (will feed it null if there were no matches from the if-else statement)
        })
    }

    render() { // simple function that assigns attributes to evidence instances
        this.element.innerText = this.name // sets the name of the evidence (this) as the displayed text
        this.element.id = `evidence-${this.id}` // sets the id of the evidence (this)   
        return this.element // returns the modified evidence element
    }

    addEvidenceListeners() { // adds event listeners to the evidence buttons
        this.element.addEventListener('click', this.currentEvidence) // the event listener will invoke the currentEvidence function on the element (this)
    }

    addEvidenceButtonsToDom() { // adds evidence buttons to the DOM :)
        this.element.className = "btn btn-dark" // sets the button to always be dark
        Evidence.evidenceButtons.append(this.render()) // appends the element (this) to the evidenceButton variable defined at the class-level (in this case the variable points to the evidence-buttons element on the DOM)
        this.addEvidenceListeners() // adds the event listener defined in the addEvidenceListeners function
    }
    
}