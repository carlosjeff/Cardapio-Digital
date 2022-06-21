import { PizzaFlavorView } from '../views/PizzaFlavorView.js'
import { ListPizzaFlavorModel } from '../models/PizzaFlavor/ListPizzaFlavorModel.js'

export class PizzaFlavorController{

    #element;
    #inputNameFlavorElement;
    #inputDescriptionFlavorElement;
    #inputFilterFlavorElement;
    #submitFlavorElement;
    
    #listPizzaFlavorModel;

    #PizzaView;


    constructor(element) {
        this.#element = element;

        this.#PizzaView = new PizzaFlavorView(element);

        this.#listPizzaFlavorModel = new ListPizzaFlavorModel();

        this.#PizzaView.init(this.#listPizzaFlavorModel.getList);
        this.#pageElements()
    }


    #pageElements(){
        let $ = this.#element.querySelector.bind(this.#element);

        this.#inputNameFlavorElement = $('#name-flavor');
        this.#inputDescriptionFlavorElement = $('#description-flavor')
        this.#submitFlavorElement = $('#submit-flavor')
        this.#inputFilterFlavorElement = $('#filterFlavorPizza')

        this.#eventListeners();
    }

    #eventListeners(){
        this.#submitFlavorElement.addEventListener('click', e =>  e.target.value > 0 ? this.update(e,e.target.value) : this.add(e))
    }


    add(event) {
        event.preventDefault();
        console.log(event)
    }

    update(event, id){
        event.preventDefault();
    }
}