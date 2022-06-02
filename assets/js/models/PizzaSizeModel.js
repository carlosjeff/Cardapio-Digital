export class PizzaSizeModel{

    #name;
    #description;
    #price
    #limitFlavor;
    #limitEdge;

    constructor(name, description, price, limitFlavor,limitEdge) {
        this.#name = name;
        this.#description = description;
        this.#price = price;
        this.#limitFlavor = limitFlavor;
        this.#limitEdge = limitEdge;
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