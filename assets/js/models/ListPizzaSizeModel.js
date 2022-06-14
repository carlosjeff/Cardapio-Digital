export class ListPizzaSizeModel{
    #list = [];

    constructor() {
    }

    add(model){
        this.#list.push(model);
    }

    update(model){
       let index = this.#list.findIndex(e => e.id == model.id);
       this.#list.splice(index, 1,model);
    }

    get getList(){
        return this.#list.slice();
    }

    getItem(id){
        return this.#list.find(element => element.id == id);
    }
}