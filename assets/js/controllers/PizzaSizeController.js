import { PizzaSizeView } from '../views/PizzaSizeView.js'
import { PizzaSizeModel } from '../models/PizzaSizeModel.js';
import {MaskHelper} from '../helpers/MaskHelper.js'
import {ListPizzaSizeModel} from '../models/ListPizzaSizeModel.js'
import { PizzaSizeService } from '../services/PizzaSizeService.js'
import {ConfirmDialogView} from '../views/ConfirmDialogView.js'
import {ToastView} from '../views/ToastView.js'

export class PizzaSizeController{

    #element;
    #inputNameSizeElement;
    #inputPriceSizeElement;
    #inputLimitFlavorSizeElement;
    #inputLimitEdgeSizeElement;
    #inputDescriptionSizeElement;
    #submitSizeElement;

    #pizzaView;
    #toastView

    #listPizzaSizeModel;

    #pizzaSizeService;

    constructor(element) {
        this.#element = element;

        this.#pizzaSizeService = new PizzaSizeService();

        this.#listPizzaSizeModel = new ListPizzaSizeModel();

        this.#pizzaView = new PizzaSizeView(this.#element);
        this.#toastView = new ToastView();
        this.#init()
    }

    #init(){
        

        this.#pizzaView.init(this.#listPizzaSizeModel.getList);
        this.#pizzaSizeService
            .getAll()
            .then(data => data.forEach(item => this.#listPizzaSizeModel.add(item)))
            .then(() =>  this.#pizzaView.updateListSize(this.#listPizzaSizeModel.getList)) 
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
        let filterDelay;

        this.#element.querySelector('#filterSizePizza').addEventListener('input', e => {
            clearTimeout(filterDelay);
            filterDelay = setTimeout(() => this.filterListPizzaSize(e.target.value),1000)
        });

        this.#element.querySelectorAll('.list__row').forEach(row => {
            row.querySelector('.edit') && row.querySelector('.edit').addEventListener('click',e => this.edit(row.id))
            row.querySelector('.delete') && row.querySelector('.delete').addEventListener('click',e => this.delete(e,row.id))
        });

        this.#element.querySelectorAll('.list__footer .button').forEach(button => {
           
            if(+button.innerText > 0){
                button.addEventListener('click',e => this.#updateView(e.target.innerText))
            }else{
                const page = +this.#element.querySelector('.list__footer .button-bluegrey-dark').innerText
                button.classList.contains('icon-arrow-left') && button.addEventListener('click',e => 
                    this.#updateView(page - 1))
                button.classList.contains('icon-arrow-right') && button.addEventListener('click',e => 
                    this.#updateView(page + 1))
            }
        })
        
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
            .then(() => this.#toastView.add('create'))
            .catch(err => console.log('error',err))
            .catch(() => this.#toastView.add('error'));    
    }

    edit(id){
       
        let pizzaSize = this.#listPizzaSizeModel.getItem(id);
        this.#setInputPizzaSize(pizzaSize);
        this.#pizzaView.addOrEdit('edit',this.#submitSizeElement)
        this.#submitSizeElement.value = id;
    }

    update(event,id){
        event.preventDefault();
        let pizzaSize = this.#createObjPizzaSize(id);
        this.#pizzaSizeService
            .edit(pizzaSize)
            .then(objet => this.#listPizzaSizeModel.update(objet))
            .then(() => this.#clearForm())
            .then(() => this.#updateView())
            .then(() => this.#toastView.add('update'))
            .catch(err => console.log('error',err))
            .catch(() => this.#toastView.add('error'));
        
    }

    delete(event,id){
        event.preventDefault();
        new ConfirmDialogView()
            .open('Tem ceteza que deseja excluir o item selecionado?')
            .then(() =>  this.#pizzaSizeService.delete(id))
            .then(() => this.#listPizzaSizeModel.remove(id))
            .then(() =>  this.#updateView())
            .then(() => this.#toastView.add('delete')) 
            .catch(err => console.log('error',err))
            .catch(() => this.#toastView.add('error'));
    }

    filterListPizzaSize(value){
        if(value){
            let list = this.#listPizzaSizeModel.filter(value)
            this.#updateView(1,list)
        }else{
            this.#updateView(1)
        }
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
      this.#pizzaView.addOrEdit('add',this.#submitSizeElement);
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

    #updateView(page = 1,list = this.#listPizzaSizeModel.getList){
        this.#pizzaView.updateListSize(list, +page);
        this.#eventListenersList();
    }
}