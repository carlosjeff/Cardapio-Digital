

export class DataDao{

    #connection;
    #store;

    constructor(connection, store) {
        this.#connection = connection;
        this.#store = store;
    }

    
    add(model){
        return new Promise((resolve, reject) => {

            let request = this.#connection
            .transaction([this.#store], 'readwrite')
            .objectStore(this.#store)
            .add(model);

            request.onsuccess = e => {
                resolve(e);
            };

            request.onerror = e => {

                console.log(e.target.error);
                reject(e.target.error);
            };

        })
    }

    edit(id,model){
        return new Promise((resolve, reject) => {

            let request = this.#connection
            .transaction([this.#store], 'readwrite')
            .objectStore(this.#store)
            .put(model, parseInt(id));
            request.onsuccess = e => {
                resolve(e);
            };

            request.onerror = e => {

                console.log(e.target.error);
                reject(e.target.error);
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
                resolve(e);
            };

            request.onerror = e => {

                console.log(e.target.error);
                reject(e.target.error);
            };
        })
    }

    listAll(){
        return new Promise((resolve, reject) => {

            let cursor = this.#connection
            .transaction([this.#store], 'readwrite')
            .objectStore(this.#store)
            .openCursor();

            let array = [];

            cursor.onsuccess = e => {

                let current = e.target.result;

                if (current) {

                    let data = current.value;

                    array.push({id: current.key, value: data});
    
                    current.continue();
                } else {
                    resolve(array);
                }
            }

            cursor.onerror = e => {
                console.log(e.target.error);
                reject(e.target.error)
            };
            
        })
    }

}