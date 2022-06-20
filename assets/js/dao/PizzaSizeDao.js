import { PizzaSizeModel } from '../models/PizzaSize/PizzaSizeModel.js'

export class PizzaSizeDao{

    #connection;
    #store;

    constructor(connection) {
        this.#connection = connection;
        this.#store = 'pizza-size'
    }

    add(model){
        console.log('dao add',model)
        return new Promise((resolve, reject) => {

            let request = this.#connection
            .transaction([this.#store], 'readwrite')
            .objectStore(this.#store)
            .add(this.#criaObjeto(model));

            request.onsuccess = e => {
                resolve(new PizzaSizeModel(
                    e.target.result,
                    model.name,
                    model.description,
                    model.price,
                    model.limitFlavor,
                    model.limitEdge
                    ));
            };

            request.onerror = e => {

                console.log(e.target.error);
                reject('Não foi possível adicionar o Tamanho da Pizza!');
            };

        })
    }

    edit(model){
        return new Promise((resolve, reject) => {

            let request = this.#connection
            .transaction([this.#store], 'readwrite')
            .objectStore(this.#store)
            .put(this.#criaObjeto(model), parseInt(model.id));
            request.onsuccess = e => {
                resolve(model);
            };

            request.onerror = e => {

                console.log(e.target.error);
                reject('Não foi possível editar o Tamanho da Pizza!');
            };
        })
    }

    delete(id){
        return new Promise((resolve, reject) => {

            let request = this.#connection
            .transaction([this.#store], 'readwrite')
            .objectStore(this.#store)
            .delete(parseInt(id));

            request.onsuccess = e => {
                resolve();
            };

            request.onerror = e => {

                console.log(e.target.error);
                reject('Não foi possível excluir Tamanho de Pizza!');
            };
        })
    }


    listAll(){
        return new Promise((resolve, reject) => {

            let cursor = this.#connection
            .transaction([this.#store], 'readwrite')
            .objectStore(this.#store)
            .openCursor();

            let pizzaSize = [];

            cursor.onsuccess = e => {

                let current = e.target.result;

                if (current) {

                    let data = current.value;
                    pizzaSize.push(new PizzaSizeModel(
                        current.key,
                        data.name,
                        data.description,
                        data.price,
                        data.limitFlavor,
                        data.limitEdge
                        ));
    
                    current.continue();
                } else {

                    resolve(pizzaSize);
                }
            }

            cursor.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível listar as Tamanhos de Pizzas')
            };
            
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
}