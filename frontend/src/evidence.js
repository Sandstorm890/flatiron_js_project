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

    render() {
        this.element.innerText = this.name 
        this.element.id = `category-${this.id}`
        return this.element
    }


    addToDom() {
        Evidence.evidenceButtons.append(this.render())
    }
    
}