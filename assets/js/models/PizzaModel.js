export class PizzaModel{

    #name;
    #description;
    #price

    constructor(name, description, price) {
        this.#name = name;
        this.#description = description;
        this.#price = price;
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
}