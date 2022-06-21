import { DataDao } from './DataDao.js'
import { PizzaSizeModel } from '../models/PizzaSize/PizzaSizeModel.js'

export class PizzaSizeDao{

    #data;

    constructor(connection) {
     
        this.#data = new DataDao(connection,'pizza-size')
    }

    add(model){

        return this.#data.add(this.#criaObjeto(model))
                .then(e =>  new PizzaSizeModel(
                    e.target.result,
                    model.name,
                    model.description,
                    model.price,
                    model.limitFlavor,
                    model.limitEdge))
                .catch(e => { throw new Error(e); })
    }

    edit(model){
        return this.#data.edit(model.id, this.#criaObjeto(model))
            .then(e => new PizzaSizeModel(
                e.target.result,
                model.name,
                model.description,
                model.price,
                model.limitFlavor,
                model.limitEdge
            ))
            .catch(e => { throw new Error(e); })
    }

    delete(id){
        return this.#data.delete(id);
    }

    listAll(){

        return this.#data.listAll()
            .then(array => array.map(element => 
                new PizzaSizeModel(
                    element.id,
                    element.value.name,
                    element.value.description,
                    element.value.price,
                    element.value.limitFlavor,
                    element.value.limitEdge
                    )))
            .catch(err => { 
                console.error(err);
                throw new Error('Não foi possível Listar o Tamnho da Pizza');
            })
    }

    #criaObjeto(model){
        return {
            name: model.name,
            description: model.description,
            price: model.price,
            limitFlavor: model.limitFlavor,
            limitEdge: model.limitEdge,
        }
    }
    
    // add(model){
    //     console.log('dao add',model)
    //     return new Promise((resolve, reject) => {

    //         let request = this.#connection
    //         .transaction([this.#store], 'readwrite')
    //         .objectStore(this.#store)
    //         .add(this.#criaObjeto(model));

    //         request.onsuccess = e => {
    //             resolve(new this.#model(
    //                 e.target.result,
    //                 model.name,
    //                 model.description,
    //                 model.price,
    //                 model.limitFlavor,
    //                 model.limitEdge
    //                 ));
    //         };

    //         request.onerror = e => {

    //             console.log(e.target.error);
    //             reject('Não foi possível adicionar o Tamanho da Pizza!');
    //         };

    //     })
    // }

    // edit(model){
    //     return new Promise((resolve, reject) => {

    //         let request = this.#connection
    //         .transaction([this.#store], 'readwrite')
    //         .objectStore(this.#store)
    //         .put(this.#criaObjeto(model), parseInt(model.id));
    //         request.onsuccess = e => {
    //             resolve(model);
    //         };

    //         request.onerror = e => {

    //             console.log(e.target.error);
    //             reject('Não foi possível editar o Tamanho da Pizza!');
    //         };
    //     })
    // }

    // delete(id){
    //     return new Promise((resolve, reject) => {

    //         let request = this.#connection
    //         .transaction([this.#store], 'readwrite')
    //         .objectStore(this.#store)
    //         .delete(parseInt(id));

    //         request.onsuccess = e => {
    //             resolve();
    //         };

    //         request.onerror = e => {

    //             console.log(e.target.error);
    //             reject('Não foi possível excluir Tamanho de Pizza!');
    //         };
    //     })
    // }


    // listAll(){
    //     return new Promise((resolve, reject) => {

    //         let cursor = this.#connection
    //         .transaction([this.#store], 'readwrite')
    //         .objectStore(this.#store)
    //         .openCursor();

    //         let pizzaSize = [];

    //         cursor.onsuccess = e => {

    //             let current = e.target.result;

    //             if (current) {

    //                 let data = current.value;
    //                 console.log(current);
    //                 pizzaSize.push(new PizzaSizeModel(
    //                     current.key,
    //                     data.name,
    //                     data.description,
    //                     data.price,
    //                     data.limitFlavor,
    //                     data.limitEdge
    //                     ));
    
    //                 current.continue();
    //             } else {

    //                 resolve(pizzaSize);
    //             }
    //         }

    //         cursor.onerror = e => {
    //             console.log(e.target.error);
    //             reject('Não foi possível listar as Tamanhos de Pizzas')
    //         };
            
    //     })
    // }


}