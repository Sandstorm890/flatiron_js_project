const port = `http://localhost:3000`
const form = document.getElementById("ghost-form")
const list = document.getElementById("ghost-list")
const dropdown = document.getElementById('evidence-dropdown')
const dropdownEdit = document.getElementById('edit-dropdown')
const ghostApi = new GhostApi(port)
const evidenceApi = new EvidenceApi(port)
const nameInput = document.getElementById("ghost-name")
const strengthsInput = document.getElementById("ghost-strengths")
const weaknessesInput = document.getElementById("ghost-weaknesses")
const evidenceInput = document.getElementById("evidence-dropdown")
const submitButton = document.getElementById("submit-btn")
const showAllButton = document.getElementById("show-all-btn")

submitButton.addEventListener('click', handleSubmit)
showAllButton.addEventListener('click', unhideAll)

function handleSubmit(e) {
    e.preventDefault()
    ghostApi.createGhost()
    // e.target.reset()
}

function unhideAll() {
    for (let i of list.children) {
        i.style.display = ""
    }
}

ghostApi.getGhosts()
evidenceApi.getEvidence()