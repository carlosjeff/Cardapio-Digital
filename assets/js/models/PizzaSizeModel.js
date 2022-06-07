export class PizzaSizeModel{

    #id;
    #name;
    #description;
    #price
    #limitFlavor;
    #limitEdge;

    constructor(id, name, description, price, limitFlavor,limitEdge) {
        this.#id = id
        this.#name = name;
        this.#description = description;
        this.#price = price;
        this.#limitFlavor = limitFlavor;
        this.#limitEdge = limitEdge;
    }

    get id(){
        return this.#id;
    }

    get name(){
        return this.#name;
    }

    get description(){
        return this.#description;
    }

    get price(){
        return this.#price;
    }

    get limitFlavor(){
        return this.#limitFlavor;
    }

    get limitEdge(){
        return this.#limitEdge;
    }
}