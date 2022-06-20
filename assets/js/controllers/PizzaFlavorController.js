import { PizzaFlavorView } from '../views/PizzaFlavorView.js'
import { ListPizzaFlavorModel } from '../models/PizzaFlavor/ListPizzaFlavorModel.js'

export class PizzaFlavorController{

    #element;
    
    #listPizzaFlavorModel;

    #PizzaView;


    constructor(element) {
        this.#element = element;

        this.#PizzaView = new PizzaFlavorView(element);

        this.#listPizzaFlavorModel = new ListPizzaFlavorModel();

        this.#PizzaView.init(this.#listPizzaFlavorModel.getList);

    }
}