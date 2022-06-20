import { PizzaSizeController } from "./PizzaSizeController.js";
import { PizzaFlavorController } from "./PizzaFlavorController.js";
import { PizzaView } from "../views/PizzaView.js"

export class PizzaController {

    #element;
    #elementPizzaSize;
    #elementPizzaFlavor;

    #PizzaView;

    #pizzaSize;
    #pizzaFlavor;


    constructor(element) {
        this.#element = element;

        this.#PizzaView = new PizzaView(this.#element);

        this.#elementPizzaSize = this.#element.querySelector('#pizza-size')
        this.#elementPizzaFlavor = this.#element.querySelector('#pizza-flavor')
       
        this.#pizzaSize = new PizzaSizeController(this.#elementPizzaSize.querySelector('.accordion__content'));
        this.#pizzaFlavor = new PizzaFlavorController(this.#elementPizzaFlavor.querySelector('.accordion__content'))

        this.#events()
    }

    #events(){
        this.#element.querySelectorAll('.accordion').forEach(a => {
            a.querySelector('.accordion__action').addEventListener('click', () => this.#PizzaView.selectAccordion(a.id))
        })
    }

}