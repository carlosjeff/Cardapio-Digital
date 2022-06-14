import {MaskHelper} from '../helpers/MaskHelper.js'
import {ListPizzaSizeModel} from '../models/ListPizzaSizeModel.js'

export class PizzaView {

    #element
    #page

    constructor(element) {
        this.#element = element;
        this.#page = 1
    }

    init(model){
        this.#element.innerHTML = this.#template(model);
    }

    updateListSize(model, page = 1){
        this.#page = page;
        this.#element.querySelector('#pizza-size .list').innerHTML = this.#listSize(model)

    }

    addOrEdit(type, element){
        const button = {
            add(elementButton){
                elementButton.innerText = 'Salvar'
                elementButton.classList.remove('button-blue','icon-edit')
                elementButton.classList.add('button-green','icon-check')
                
            },
            edit(elementButton){
                elementButton.innerText = 'Editar'
                elementButton.classList.remove('button-green','icon-check')
                elementButton.classList.add('button-blue','icon-edit')
            }
        }
        
        button[type](element);
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
                <button type="button" id="submit-size" class="button button-icon-text button-green icon-check form-submit">Salvar</button>
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
                ${model.length > 0 ? model.slice((4 * this.#page) - 4, 4 * this.#page).map(item => 
                        `
                        <li class="list__row" id="${item.id}">
                            <div class="col-1">${item.name}</div>
                            <div class="col-2">R$ ${MaskHelper.priceToDecimal(item.price)}</div>
                            <div class="col-3">
                                <button class="edit button button-icon icon-edit button-blue"></button>
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
                    ${this.#pageNavigationButtons(model)}
                    <button class="button button-icon icon-arrow-right button-white"></button>
                </li>
        `
    }

    #pageNavigationButtons(model){
        
        let totalPages = Math.ceil(model.length / 4)
        let array = []
        for (let index = 1; index <= totalPages ; index++) {
            if(index >= (this.#page - 2 ) && index <= (this.#page + 2 ))
                array.push(`<button class="button ${index == this.#page ? 'button-bluegrey-dark' : 'button-white'} button-page">${index}</button>`)
        }
        return array.join('');
    }
    
}