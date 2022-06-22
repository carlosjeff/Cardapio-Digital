import { PizzaFlavorView } from '../views/PizzaFlavorView.js'
import { ListPizzaFlavorModel } from '../models/PizzaFlavor/ListPizzaFlavorModel.js'
import { PizzaFlavorService } from '../services/PizzaFlavorService.js';

export class PizzaFlavorController{

    #element;
    #inputNameFlavorElement;
    #inputDescriptionFlavorElement;
    #inputFilterFlavorElement;
    #submitFlavorElement;
    
    #listPizzaFlavorModel;

    #PizzaView;

    #pizzaFlavorService;


    constructor(element) {
        this.#element = element;

        this.#pizzaFlavorService = new PizzaFlavorService();

        this.#PizzaView = new PizzaFlavorView(element);

        this.#listPizzaFlavorModel = new ListPizzaFlavorModel();

        
        this.#pizzaFlavorService
            .getAll()
            .then(data => data.forEach(item => this.#listPizzaFlavorModel.add(item)))
            .then(() => this.#PizzaView.init(this.#listPizzaFlavorModel.getList))
            .then(() => this.#pageElements())
            .catch(err => console.log(err));        
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