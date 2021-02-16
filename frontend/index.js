const form = document.getElementById("ghost-form")
const nameInput = document.getElementById("ghost-name")
const strengthsInput = document.getElementById("ghost-strengths")
const weaknessesInput = document.getElementById("ghost-weaknesses")
const evidenceInput = document.getElementById("ghost-evidence")
const submitButton = document.getElementById("submit-btn")

submitButton.addEventListener('click', handleSubmit)

function handleSubmit(e) {
    debugger
    e.preventDefault()

    const ghostInfo = {
        name: nameInput.value,
        strengths: strengthsInput.value,
        weaknesses: weaknessesInput.value,
        evidence: evidenceInput.value
    }

    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(ghostInfo)
    }

    fetch("http://localhost:3000/ghosts", configObj)
        .then(r => r.json())
        .then(json => renderGhosts(json.data))
}

function renderGhosts(arg){
    const ghosts = arg["data"]
    ghosts.forEach(element => {
        renderGhost(element)
    })
}

function renderGhost(ghost){
    const li = document.createElement('li')
    li.dataset["id"] = ghost.id
    li.id = `ghost-${ghost.id}`
    li.innerHTML = `
        <div data-id="${ghost.id}">
            <strong class="name">${ghost.attributes.name}</strong>:
            <span class="strengths">${item.attributes.strengths}</span> 
            <span class="weaknesses">${ghost.attributes.weaknesses}</span>
            <span class="evidence">${ghost.attributes.evidence}</span>
        </div>
        <button class="edit" data-id="${ghost.id}">Edit</button>
        <button class="delete" data-id="${ghost.id}">Delete</button>
    `
    list.appendChild(li)
    li.addEventListener('click', handleLiClick)
}

function getGhosts(){
    fetch('http://localhost:3000/ghosts')
    .then(r => r.json())
    .then(renderGhosts)
}

getGhosts()