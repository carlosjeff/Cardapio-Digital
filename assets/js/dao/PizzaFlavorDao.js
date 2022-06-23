import { PizzaFlavorModel } from '../models/PizzaFlavor/PizzaFlavorModel.js'
import { DataDao } from './DataDao.js';

export class PizzaFlavorDao{

    #data;

    constructor(connection) {
     
        this.#data = new DataDao(connection,'pizza-flavor')
    }

    add(model){

        return this.#data.add(this.#criaObjeto(model))
                .then(e =>  new PizzaFlavorModel(
                    e.target.result,
                    model.name,
                    model.description,
                    ))
                .catch(e => { throw new Error(e); })
    }

    edit(model){
        
        return this.#data.edit(model.id, this.#criaObjeto(model))
            .then(e => new PizzaFlavorModel(
                e.target.result,
                model.name,
                model.description,
            ))
            .catch(e => { throw new Error(e); })
    }

    delete(id){

        return this.#data.delete(id);
    }

    listAll(){

        return this.#data.listAll()
            .then(array => array.map(element => 
                new PizzaFlavorModel(
                    element.id,
                    element.value.name,
                    element.value.description,
                    )))
            .catch(err => { 
                throw new Error(err);
            })
    }

    #criaObjeto(model){
        return {
            name: model.name,
            description: model.description,
        }
    }
}