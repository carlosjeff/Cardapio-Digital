export class ListPizzaModel{

    #list = [];

    constructor(model) {
        this.add(model);
    }

    add(model){
        this.#list.push(model);
    }
}