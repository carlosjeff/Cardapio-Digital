import { PizzaView } from '../views/PizzaView.js'
import { PizzaSizeModel } from './../models/PizzaSizeModel.js';
import {MaskHelper} from '../helpers/MaskHelper.js'
import {ListPizzaSizeModel} from '../models/ListPizzaSizeModel.js'

export class PizzaControllers{

    #element;
    #inputNameSizeElement;
    #inputPriceSizeElement;
    #inputLimitFlavorSizeElement;
    #inputLimitEdgeSizeElement;
    #inputDescriptionSizeElement;
    #submitSizeElement;

    #pizzaView;

    #listPizzaSizeModel;

    constructor(element) {
        this.#element = element;
        this.#init();
        this.#pageElements();
       
    }

    #init(){
        this.#listPizzaSizeModel = new ListPizzaSizeModel();

        this.#pizzaView = new PizzaView(this.#element);
        this.#pizzaView.init(this.#listPizzaSizeModel.getList);
    }

    #pageElements(){

        let $ = this.#element.querySelector.bind(this.#element);

        //Accordion Tamanho
        this.#inputNameSizeElement = $('#name');
        this.#inputPriceSizeElement = $('#price');
        this.#inputLimitFlavorSizeElement = $('#limitFlavor');
        this.#inputLimitEdgeSizeElement = $('#limitEdge');
        this.#inputDescriptionSizeElement = $('#description');
        this.#submitSizeElement = $('#submit-size');


        this.#eventListeners();
    }

    #eventListeners(){
        
        this.#submitSizeElement.addEventListener('click',e => this.add(e));
        this.#inputNameSizeElement.addEventListener('blur',e => this.#maskInput(e, 'name'));
        this.#inputPriceSizeElement.addEventListener('input',e => this.#maskInput(e, 'price'));
        this.#inputLimitEdgeSizeElement.addEventListener('input',e => this.#maskInput(e, 'limit'))
        this.#inputLimitFlavorSizeElement.addEventListener('input',e => this.#maskInput(e, 'limit'));

        let paterInputLimitEdgeSize =  this.#inputLimitEdgeSizeElement.offsetParent;
        paterInputLimitEdgeSize.querySelector('.buttonUpNumber')
            .addEventListener('click',e => this.#addOrSubtrac(e,this.#inputLimitEdgeSizeElement))
        paterInputLimitEdgeSize.querySelector('.buttonDownNumber')
            .addEventListener('click',e => this.#addOrSubtrac(e,this.#inputLimitEdgeSizeElement))

        let paterInputLimitFlavorSize = this.#inputLimitFlavorSizeElement.offsetParent;
        paterInputLimitFlavorSize.querySelector('.buttonUpNumber')
            .addEventListener('click',e => this.#addOrSubtrac(e,this.#inputLimitFlavorSizeElement))
        paterInputLimitFlavorSize.querySelector('.buttonDownNumber')
            .addEventListener('click',e => this.#addOrSubtrac(e,this.#inputLimitFlavorSizeElement))
    }

    add(event) {

        event.preventDefault();
       let pizzaSize = this.#createObjPizzaSize();
        // console.log('add',pizzaSize);
        this.#listPizzaSizeModel.add(pizzaSize);
        // console.log('list',this.#listPizzaSizeModel.getList);
        this.#updateView();
    }

    #createObjPizzaSize(
        name  = this.#inputNameSizeElement.value,
        price = this.#inputPriceSizeElement.value,
        limitFlavor = this.#inputLimitFlavorSizeElement.value,
        limiEdge = this.#inputLimitEdgeSizeElement.value,
        description = this.#inputDescriptionSizeElement.value
    ){
        return new PizzaSizeModel(name, description, MaskHelper.priceToDecimal(price), limitFlavor, limiEdge);
    }

    #maskInput(e, input){
      
        const mask = {
            name(event) {
               return MaskHelper.firstUpperCaseCharacter(event.target.value);
            },
            price(event) {
                return MaskHelper.price(event.target.value);
            },
            limit(event){
                return MaskHelper.justNumber(event.target.value);
            } 
        }

        const eventMask = mask[input];
        e.target.value = eventMask(e);

    }

    #addOrSubtrac(event, input){
        event.preventDefault();
        
        if(event.srcElement.classList.contains('buttonUpNumber')){
            input = input.value++
        }else if(event.srcElement.classList.contains('buttonDownNumber')){
            input = input.value <= 0 ? 0 : input.value--;

        }
    }

    #updateView(){
        this.#pizzaView.updateListSize(this.#listPizzaSizeModel.getList);
    }

}