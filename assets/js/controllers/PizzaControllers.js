import { PizzaView } from '../views/PizzaView.js'
import { PizzaSizeModel } from './../models/PizzaSizeModel.js';
import {MaskHelper} from '../helpers/MaskHelper.js'
import {ListPizzaSizeModel} from '../models/ListPizzaSizeModel.js'
import { PizzaSizeService } from '../services/PizzaSizeService.js'

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

    #pizzaSizeService;

    constructor(element) {
        this.#element = element;

        this.#pizzaSizeService = new PizzaSizeService();

        this.#listPizzaSizeModel = new ListPizzaSizeModel();

        this.#pizzaView = new PizzaView(this.#element);

        this.#init();
       
    }

    #init(){
        this.#pizzaView.init(this.#listPizzaSizeModel.getList);
        this.#pizzaSizeService
            .getAll()
            .then(data => data.forEach(item => this.#listPizzaSizeModel.add(item)))
            .then(() =>  this.#updateView()) 
            .then(() =>  this.#pageElements())
            .catch(err => console.log(err))
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
        
        this.#submitSizeElement.addEventListener('click',e => e.target.value > 0 ? this.update(e,e.target.value) : this.add(e));

        this.#eventListenersList();
        this.#eventListenersInput();
    }

    #eventListenersList(){
        this.#element.querySelectorAll('.list__row').forEach(row => {
            row.querySelector('.edit').addEventListener('click',e => this.edit(row.id))
        });
        
    }

    #eventListenersInput(){
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
        console.log(pizzaSize)
        this.#pizzaSizeService
            .add(pizzaSize)
            .then(objet => this.#listPizzaSizeModel.add(objet))
            .then(() => this.#clearForm())
            .then(() =>  this.#updateView())       
    }

    edit(id){
        let pizzaSize = this.#listPizzaSizeModel.getItem(id);
        this.#setInputPizzaSize(pizzaSize);
        this.#pizzaView.addOrEdit('edit',this.#submitSizeElement)
        this.#submitSizeElement.value = id;
    }

    update(event,id){
        event.preventDefault();
        console.log('update')
    }

    #createObjPizzaSize(
        id = 0,
        name  = this.#inputNameSizeElement.value,
        price = this.#inputPriceSizeElement.value,
        limitFlavor = this.#inputLimitFlavorSizeElement.value,
        limiEdge = this.#inputLimitEdgeSizeElement.value,
        description = this.#inputDescriptionSizeElement.value
    ){
        return new PizzaSizeModel(id,name, description, MaskHelper.priceToDecimal(price), limitFlavor, limiEdge);
    }

    #clearForm(){
      this.#element.querySelector('.form-pizzaSize').reset();
      this.#submitSizeElement.value = 0;
    }

    #setInputPizzaSize(pizzaSize){
        this.#inputNameSizeElement.value = pizzaSize.name,
        this.#inputPriceSizeElement.value = pizzaSize.price,
        this.#inputLimitFlavorSizeElement.value = pizzaSize.limitFlavor,
        this.#inputLimitEdgeSizeElement.value = pizzaSize.limitEdge,
        this.#inputDescriptionSizeElement.value = pizzaSize.description
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
        this.#eventListenersList();
    }

}