const port = `http://localhost:3000`
const form = document.getElementById("ghost-form")
const list = document.getElementById("ghost-list")
const dropdown = document.getElementById('evidence-dropdown')
const ghostApi = new GhostApi(port)
const evidenceApi = new EvidenceApi(port)
const nameInput = document.getElementById("ghost-name")
const strengthsInput = document.getElementById("ghost-strengths")
const weaknessesInput = document.getElementById("ghost-weaknesses")
const evidenceInput = document.getElementById("evidence-dropdown")
const submitButton = document.getElementById("submit-btn")

submitButton.addEventListener('click', handleSubmit)

function handleSubmit(e) {
    e.preventDefault()
    ghostApi.createGhost()
}

ghostApi.getGhosts()
evidenceApi.getEvidence()