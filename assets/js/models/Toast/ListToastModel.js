import {ToastModel} from './ToastModel.js'
export class ListToastModel{

    #list;

    constructor() {
        this.#list = [];
    }

    get list() {
        return this.#list.slice();
    }
    
    #add(type,title,message,id){
        this.#list.push(new ToastModel(type,title,message,id));
    }

    remove(id){
        let index = this.#list.findIndex(e => e.id == id);
        this.#list.splice(index, 1);
    }

    create(id){
       this.#add('success','Criado com sucesso','O item foi criado com Sucesso!',id)
    }

    delete(id){
       this.#add('success','Deletado com sucesso','O item foi Deletado com Sucesso!',id)
    }

    update(id){
        this.#add('success','Alterado com sucesso','O item foi alterado com Sucesso!',id)
    }

    error(id){
        this.#add('error','Ocorreu um erro','Erro em realizar a opetação!',id)
    }

    generateId(){
        let id;
        for (let index = 0; index == 100; index++) {
            id = parseInt(Math.random() * 100);
            if(!this.#list.find(e => e.id == id)){
                break;
            }
        }

        return id;
    }


}