export class ToastModel{

    #type;
    #title;
    #message;
    #id;

    constructor(type,title,message,id) {
        this.#type = type;
        this.#title = title;
        this.#message = message;
        this.#id = id
    }

    get type() { return this.#type; }

    get title() { return this.#title; }

    get message() { return this.#message; }

    get id() { return this.#id; }

}