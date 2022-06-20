export class ListPizzaSizeModel{
    #list;

    constructor() {
        this.#list = []
    }

    add(model){
        this.#list.push(model);
    }

    update(model){
       let index = this.#list.findIndex(e => e.id == model.id);
       this.#list.splice(index, 1,model);
    }

    remove(id){
        let index = this.#list.findIndex(e => e.id == id);
        this.#list.splice(index, 1);
    }

    get getList(){
        return this.#list.slice();
    }

    getItem(id){
        return this.#list.find(element => element.id == id);
    }

    filter(value = ''){
        let filter = value.trim().toLowerCase();
        return this.#list.filter(element => element.name.toLowerCase().indexOf(filter) > -1);
    }
}