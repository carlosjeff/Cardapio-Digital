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
}