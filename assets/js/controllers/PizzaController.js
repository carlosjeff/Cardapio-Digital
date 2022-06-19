import { PizzaSizeController } from "./PizzaSizeController.js";
import { PizzaView } from "../views/PizzaView.js"

export class PizzaController {

    #element;
    #elementPizzaSize;

    #PizzaView;

    #pizzaSize;

    constructor(element) {
        this.#element = element;

        this.#PizzaView = new PizzaView(this.#element);

        this.#elementPizzaSize = this.#element.querySelector('#pizza-size')
       
        this.#pizzaSize = new PizzaSizeController(this.#elementPizzaSize.querySelector('.accordion__content'));

        this.#events()
    }

    #events(){
        this.#element.querySelectorAll('.accordion').forEach(a => {
            a.querySelector('.accordion__action').addEventListener('click', () => this.#PizzaView.selectAccordion(a.id))
        })
    }

}