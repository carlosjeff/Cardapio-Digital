import {MaskHelper} from '../helpers/MaskHelper.js'
import {ListPizzaSizeModel} from '../models/ListPizzaSizeModel.js'

export class PizzaView {

    #element

    constructor(element) {
        this.#element = element;
    }

    init(model){
        this.#element.innerHTML = this.#template(model);
    }

    updateListSize(model){
     
        this.#element.querySelector('#pizza-size .list').innerHTML = this.#listSize(model)
    }

    #template(model) {

        return `
            <div class="accordion" id="pizza-size">
                <div class="accordion__action">
                    <h2 class="acordion__title">Tamanho</h2>
                    <i class="accordion__icon icon-arrow-up"></i>
                </div>
                <div class="accordion__content">
                    ${this.#formSize()}
                    <ul class="list">
                        ${this.#listSize(model)}
                    </ul>
                </div>
            </div>
            <div class="accordion accordion-disabled">
                <div class="accordion__action">
                    <h2 class="acordion__title">Sabores</h2>
                    <i class="accordion__icon icon-arrow-down"></i>
                </div>
                <div class="accordion__content">
                    ${''}
                    ${''}
                </div>
            </div>
            <div class="accordion accordion-disabled">
                <div class="accordion__action">
                    <h2 class="acordion__title">Bordas</h2>
                    <i class="accordion__icon icon-arrow-down"></i>
                </div>
                <div class="accordion__content">
                    ${''}
                    ${''}
                </div>
            </div>
            <div class="accordion accordion-disabled">
                <div class="accordion__action">
                    <h2 class="acordion__title">Adicionais</h2>
                    <i class="accordion__icon icon-arrow-down"></i>
                </div>
                <div class="accordion__content">
                    ${''}
                    ${''}
                </div>
            </div>
        `
    }

    #formSize(){
        return `
            <form class="form form-pizzaSize">
                <div class="form__input">
                    <label class="input__label" for="name">Nome</label>
                    <input type="text" id="name" class="input">
                </div>
                <div class="form__input">
                    <label class="input__label" for="price">Preço</label>
                    <input type="text" id="price" value="R$ 0,00" class="input input-number">
                </div>
                <div class="form__input input-number">
                    <label class="input__label" for="limitFlavor">Limite de Sabores</label>
                    <input type="text" id="limitFlavor" class="input" value="0">
                    <button class="buttonUpNumber button-icon icon-plus button-bluegrey"></button>
                    <button class="buttonDownNumber button-icon icon-minus button-bluegrey"></button>  
                </div>
                <div class="form__input input-number">
                    <label class="input__label" for="limitEdge">Limite de Bordas</label>
                    <input type="text" id="limitEdge" class="input" value="0">
                    <button class="buttonUpNumber button-icon icon-plus button-bluegrey"></button>
                    <button class="buttonDownNumber button-icon icon-minus button-bluegrey"></button>
                </div>
                <div class="form__input">
                    <label class="input__label" for="description">Descrição</label>
                    <textarea type="text" id="description" class="input" rows="8"></textarea>
                </div>
                <button type="button" id="submit-size" class="button button-green button-icon-text icon-check form-submit">Salvar</button>
            </form>
        `
    }

    #listSize(model){

        return `
                <li class="list__header">
                    <div class="list__search">
                        <input type="text" class="input input-filter" id="filterSizePizza">
                        <i class="input-icon icon-search"></i>
                    </div>
                </li>
                ${model.length > 0 ? model.map(item => 
                        `
                        <li class="list__row">
                            <div class="col-1">${item.name}</div>
                            <div class="col-2">R$ ${MaskHelper.priceToDecimal(item.price)}</div>
                            <div class="col-3">
                                <button class="button button-icon icon-edit button-blue"></button>
                                <button class="button button-icon icon-trash button-red"></button>
                            </div>
                        </li>
                        `
                    ).join('') : 
                    `
                        <li class="list__row">
                            <div class="col">Não Há Registros No Momento</div>
                        </li>
                    `
                }
                <li class="list__footer">
                    <button class="button button-icon icon-arrow-left button-white"></button>
                    <button class="button button-white">1</button>
                    <button class="button button-icon icon-arrow-right button-white"></button>
                </li>
        `
    }

    
}