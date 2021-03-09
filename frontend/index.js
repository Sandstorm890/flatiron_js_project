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
const sortButton = document.getElementById("sort-btn")
const partyButton = document.getElementById("party-btn")

submitButton.addEventListener('click', handleSubmit)
showAllButton.addEventListener('click', unhideAll)
sortButton.addEventListener('click', sortAplhabetically)
partyButton.addEventListener('click', partyTime)

function handleSubmit(e) { // function that is called when submit button is clicked
    e.preventDefault() // stops the submit action from rerendering the page
    ghostApi.createGhost() // tells the ghostApi class to create a ghost
    e.target.reset // clears the form after submitting - DOESN'T WORK WHEN e.preventDefault IS PRESENT
}

function unhideAll() { // unhides all of the hidden ul elements that are hidden by the evidence sort functions
    const ghosts = [...Ghost.all]
    for (let g of ghosts) {list.appendChild(g.render())}
    for (let i of list.children) { // iterates through all of the children of the ghost-list ul element
        i.style.display = "" // sets the display attribute of each element to equal an empty string so it displays on the page
    }
}

function sortAplhabetically() {
    const ghosts = [...Ghost.all].sort((a, b) => (a.name > b.name) ? 1 : -1)
    for (let g of ghosts) {list.appendChild(g.render())}
}

function partyTime() {
    const colors = ["primary", "success", "danger", "warning", "info" ]
    const randomBackgroundColor = colors[Math.floor(Math.random() * colors.length)]
    const randomButtonColor = colors[Math.floor(Math.random() * colors.length)]
    const background = document.getElementById("background")
    background.className = `bg-${randomBackgroundColor} ml-4`
    partyButton.className = `btn btn-${randomButtonColor}`
}

ghostApi.getGhosts() // calls the getGhosts function of the ghostApi class to get all the data about our ghosts and display them on the page
evidenceApi.getEvidence() // calls on the getEvidence function of the evidenceApi class to get and display all of the evidence info