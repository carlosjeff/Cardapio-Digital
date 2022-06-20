export class ListPizzaModel{

    #list = [];

    constructor(model) {
        this.add(model);
    }

    add(model){
        this.#list.push(model);
    }

    getItem(id){
        return this.#list.find(item => item.id === id);
    }

    
}