const port = `http://localhost:3000`
const form = document.getElementById("ghost-form")
const list = document.getElementById("ghost-list")
const ghostApiCall = new ghostApi(port)
const nameInput = document.getElementById("ghost-name")
const strengthsInput = document.getElementById("ghost-strengths")
const weaknessesInput = document.getElementById("ghost-weaknesses")
const evidenceInput = document.getElementById("ghost-evidence")
const submitButton = document.getElementById("submit-btn")

submitButton.addEventListener('click', handleSubmit)

function handleSubmit(e) {
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

ghostApiCall.getGhosts()

// function renderGhosts(arg){
//     const ghosts = arg["data"]
//     ghosts.forEach(element => {
//         renderGhost(element)
//     })
// }

// function getEvidence(ghost) {
//     // debugger
//     return ghost.attributes.evidences.map(evidence => evidence.name)
// }

// function renderGhost(ghost){
//     const li = document.createElement('li')
//     li.dataset["id"] = ghost.id
//     li.id = `ghost-${ghost.id}`
//     li.innerHTML = `
//         <div data-id="${ghost.id}">
//             <strong class="name">${ghost.attributes.name}</strong>:<br>
//             <span class="strengths">${ghost.attributes.strengths}</span><br>
//             <span class="weaknesses">${ghost.attributes.weaknesses}</span><br>
//             <span class="evidence">${getEvidence(ghost)}</span>
//         </div>
//         <button class="edit" data-id="${ghost.id}">Edit</button>
//         <button class="delete" data-id="${ghost.id}">Delete</button>
//     `
    
//     list.appendChild(li)
//     li.addEventListener('click', handleLiClick)
// }

// function handleLiClick(e){
//     if(e.target.innerText === "Edit"){

//     } else if (e.target.innerText === "Delete"){
//         deleteGhost(e)
//     }
// }

// function editGhost(e) {
    
// }

// function deleteGhost(e){
//     e.target.parentElement.remove() // remove it before the fetch request 
//     const id = e.target.dataset.id 

//     const configObj = {
//         method: 'DELETE',
//         headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json"
//         }
//     }
    
//     fetch(`http://localhost:3000/ghosts/${id}`, configObj)
//         .then(r => r.json())
//         .then(json => alert(json.message))

// }

// function getGhosts(){
//     fetch('http://localhost:3000/ghosts')
//     .then(r => r.json())
//     .then(renderGhosts)
// }

// getGhosts()