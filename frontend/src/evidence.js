class Evidence {

    static all = []
    static evidenceButtons = document.getElementById("evidence-buttons")

    constructor({id, name}){
        this.id = id
        this.name = name

        this.element = document.createElement("button")
        Evidence.all.push(this)
    }
    
}