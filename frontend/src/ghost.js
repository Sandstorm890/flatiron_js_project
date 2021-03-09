class Ghost {

    static all = [] // sets empty array to store all instances of Ghost in as a class-level variable
    static container = document.getElementById('ghost-list') // sets the ghost-list element from the DOM as a class-level variable

    constructor({id, name, strengths, weaknesses, evidence_id}){ // assigns attributes to instances on creation
        this.name = name // sets ghost name
        this.strengths = strengths // sets strengths
        this.weaknesses = weaknesses // sets weaknesses
        this.evidence_id = evidence_id // sets the ID of the associated evidence instance
        this.id = id // sets ghost ID
        this.element = document.createElement('li') // creates a list item element for the ghost instance and assigns it to a variable
        this.element.dataset["id"] = id // assigns DOMStringMap an ID attrribute equal to the ghosts ID
        this.element.id = `ghost-${id}` // sets the ID of the HTML element to equal the ghosts ID
        Ghost.all.push(this) // pushes the instance to the 'all' array defined above
    }

    handleLiClick = (e) => { // handles the click for the Edit/Delete buttons
        if (e.target.innerText === "Edit") { // if the button says 'edit'
            e.target.innerText = "Save" // set the display text to 'save'
            this.createEditFields(e.target) // calls the createEditFields function on the ul element
            
        } else if (e.target.innerText === "Delete") { // if the button says 'delete'
            this.deleteGhost(e) // call the deleteGhost function on the ul element to delete the ghost record from the database
        } else if (e.target.innerText === "Save") { // if the button says 'save'
            e.target.innerText = "Edit" // change the button text back to 'edit'
            this.saveUpdatedGhost() // call the saveUpdatedGhost function on the ul element to update the ghost in the database
        }
    }

    createEditFields = () => { // called by the handleLiClick function to create fields in which to edit the ghost's information
        const ul = this.element.querySelector('ul') // finds the <ul> element which contains the ghost and its info
        const ghostName = this.element.querySelector('strong') // finds the <strong> element (which is the name) and assigns it to a variable
        let nameInputValue = ghostName.innerText // assigns the text data (ghosts name) to a variable
        ghostName.outerHTML = `<input type="text" class="edit-name" value="${nameInputValue}">` // changes the HTML tags of the ghostsName element to be an edit field
        
        for (const e of ul.children) { // iterates through the children of the <ul> tag
            let inputValue = e.innerText // stores the displayed text of the element in a variable
            let name = e.classList[0] // grabs the value of the first thing in the class of the element and stores it

            if (e.className === "evidence") { // if the class of the element equals "evidence"
                e.outerHTML = `<select class="edit-${name}" value="${inputValue}">` // change it to a <select> drop-down field
                
            } else if (e.className === "strengths" || e.className === "weaknesses") { // if the class of the element is "strengths" or "weaknesses"
                e.outerHTML = `<input type="text" class="edit-${name}" value="${inputValue}">` // change it to a text field so it can be edited
            }
        }
    }

    saveUpdatedGhost = () => { // takes the values from the edit-ghost form and saves them to the JS object, then passes that object to the ghostApi to update the database
        this.name = this.element.querySelector(".edit-name").value // sets the name of the JS ghost object to equal the new value found in the edit form 
        this.weaknesses = this.element.querySelector(".edit-weaknesses").value // updates the weaknesses of the JS object
        this.strengths = this.element.querySelector(".edit-strengths").value // updates the strengths of the JS object
        // console.log(this.element.querySelector(".edit-evidence").value)
        // this.evidence = this.element.querySelector(".edit-evidence").value
        ghostApi.editGhost(this) // passes the JS object to the ghostApi function editGhost to update the database
    }

    static filterByEvidence(evidence) { // class-level function for filtering ghosts by associated evidence
        if (evidence) { // if 'evidence' argument is not null
            for (const ghost of Ghost.all) { // iterate through all of the ghost instances
                if (ghost.evidence_id === parseInt(evidence.id)) { // if the ghost object's ID equals the arument's ID (in this case the argument is a single instance of the Evidence class)
                    ghost.element.style.display = "" // set the display attribute in the HTML tag to equal a blank string, which will cause the element to appear on the DOM
                } else {  // if the ghost object's ID does not match the arument's ID
                    ghost.element.style.display = "none" // set the display attribute of the HTML tag to be 'none', which will cause it to dissapear from the DOM
                }
            }
        } else { // if the 'evidence' argument is null (contains nothing)
            for (const ghost of Ghost.all) { // iterate through all of the JS ghost objects
                ghost.element.style.dislpay = "" // set all of their display values to equal a blank string, causing them to all reappear on the DOM
            }
        }
    }

    deleteGhost = (e) => { // handles deleting the ghost object from the DOM and from the database in the backend
        this.element.remove() // removes the object from the DOM - OPTIMISTIC RENDERING 
        ghostApi.deleteGhost(this.id) // calls the deleteGhost instance function of the ghostApi instance to delete the ghost from the database
    }

    render() { // initializes the element that displays each indiviual ghost object on the DOM
        this.element.className = "list-group-item" // some CSS styling happens here
        // sets the innerHTML of the element to be an unordered list displaying the ghosts name and attributes
        this.element.innerHTML = `
            <strong class="name display-4">${this.name}</strong>
            <ul class="mt-3" data-id="${this.id}">
                <label class="font-weight-bold pt-2">Strengths </label>
                <li class="strengths">${this.strengths}</li><br>
                <label class="font-weight-bold">Weaknesses </label>
                <li class="weaknesses">${this.weaknesses}</li><br>
                <label class="font-weight-bold">Evidence</label>
                <li class="evidence">${Evidence.all.filter(e => e.id == this.evidence_id)[0].name}</li>
                 
            </ul><br>
            <button class="edit btn-dark" data-id="${this.id}">Edit</button>
            <button class="delete btn-dark" data-id="${this.id}">Delete</button>
        `
        return this.element // returns the element with all the new HTML
    }

    attachToDom() { // attaches things to the DOM
        this.render() // takes the current instance of ghost and passes it to the 'render' function, which returns the appropriate HTML
        Ghost.container.appendChild(this.element) // attaches the ghost instance's HTML to the 'ghost-list' element returned by the 'container' class-level variable
        this.element.addEventListener('click', this.handleLiClick) // adds an event listener to the element's buttons
    }

}