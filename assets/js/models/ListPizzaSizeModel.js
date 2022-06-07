export class ListPizzaSizeModel{
    #list = [];

    constructor() {
    }

    add(model){
        this.#list.push(model);
    }

    get getList(){
        return this.#list.slice();
    }

    getItem(id){
        return this.#list.find(element => element.id == id);
    }
}