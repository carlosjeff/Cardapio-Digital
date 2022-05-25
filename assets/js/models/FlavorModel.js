//Sabor
export class FlavorModel{

    #name;
    #description;

    constructor(name, description) {
        this.#name = name;
        this.#description = description;
    }

    get name(){
        return this.#name;
    }

    get description(){
        return this.#description;
    }
}