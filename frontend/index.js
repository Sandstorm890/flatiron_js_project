const port = `http://localhost:3000`
const form = document.getElementById("ghost-form")
const list = document.getElementById("ghost-list")
const dropdown = document.getElementById('evidence-dropdown')
const dropdownEdit = document.getElementById('edit-evidence')
const ghostApi = new GhostApi(port) // creates a single instance of the ghostApi class
const evidenceApi = new EvidenceApi(port) // creates a single instance of the evidenceApi class
const nameInput = document.getElementById("ghost-name")
const strengthsInput = document.getElementById("ghost-strengths")
const weaknessesInput = document.getElementById("ghost-weaknesses")
const evidenceInput = document.getElementById("evidence-dropdown")
const submitButton = document.getElementById("submit-btn")
const showAllButton = document.getElementById("show-all-btn")
const evidenceButtons = document.getElementById("evidence-buttons")


submitButton.addEventListener('click', handleSubmit)
showAllButton.addEventListener('click', unhideAll)

function handleSubmit(e) { // function that is called when submit button is clicked
    e.preventDefault() // stops the submit action from rerendering the page
    ghostApi.createGhost() // tells the ghostApi class to create a ghost
    e.target.reset // clears the form after submitting - DOESN'T WORK WHEN e.preventDefault IS PRESENT
}

function unhideAll() { // unhides all of the hidden ul elements that are hidden by the evidence sort functions
    for (let i of list.children) { // iterated through all of the children of the ghost-list ul element
        i.style.display = "" // sets the display attribute of each element to equal an empty string so it displays on the page
    }
}

ghostApi.getGhosts() // calls the getGhosts function of the ghostApi class to get all the data about our ghosts and display them on the page
evidenceApi.getEvidence() // calls on the getEvidence function of the evidenceApi class to get and display all of the evidence info