import { PizzaFlavorView } from '../views/PizzaFlavorView.js'
import { ListPizzaFlavorModel } from '../models/PizzaFlavor/ListPizzaFlavorModel.js'
import { PizzaFlavorService } from '../services/PizzaFlavorService.js';
import { PizzaFlavorModel } from '../models/PizzaFlavor/PizzaFlavorModel.js';
import {ToastView} from '../views/ToastView.js'

export class PizzaFlavorController{

    #element;
    #inputNameFlavorElement;
    #inputDescriptionFlavorElement;
    #inputFilterFlavorElement;
    #submitFlavorElement;
    
    #listPizzaFlavorModel;

    #pizzaView;
    #toastView

    #pizzaFlavorService;


    constructor(element) {
        this.#element = element;

        this.#pizzaFlavorService = new PizzaFlavorService();

        this.#pizzaView = new PizzaFlavorView(element);
        this.#toastView = new ToastView();

        this.#listPizzaFlavorModel = new ListPizzaFlavorModel();

        
        this.#pizzaFlavorService
            .getAll()
            .then(data => data.forEach(item => this.#listPizzaFlavorModel.add(item)))
            .then(() => this.#pizzaView.init(this.#listPizzaFlavorModel.getList))
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
        this.#submitFlavorElement.addEventListener('click', e => e.target.value > 0 ? this.update(e,e.target.value) : this.add(e))
    }


    add(event) {
        event.preventDefault();
        let pizzaFlavor = this.#createObj();

        this.#pizzaFlavorService
            .add(pizzaFlavor)
            .then(objet => this.#listPizzaFlavorModel.add(objet))
            .then(() => this.#clearForm())
            .then(() =>  this.#updateView())
            .then(() => this.#toastView.add('create'))
            .catch(err => console.log('error',err))
            .catch(() => this.#toastView.add('error')); 
    }

    update(event, id){
        event.preventDefault();
    }

    #createObj(
        id = 0,
        name  = this.#inputNameFlavorElement.value,
        description = this.#inputDescriptionFlavorElement.value
    ){
        return new PizzaFlavorModel(id,name, description);
    }

    #clearForm(){
        this.#element.querySelector('.form-pizzaFlavor').reset();
        this.#submitFlavorElement.value = 0;
        this.#pizzaView.addOrEdit('add',this.#submitFlavorElement);
      }

    #updateView(page = 1,list = this.#listPizzaFlavorModel.getList){
        this.#pizzaView.updateListSize(list, +page);
        // this.#eventListenersList();
    }
}