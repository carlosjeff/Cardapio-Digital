import {ListToastModel} from '../models/Toast/ListToastModel.js'

export class ToastView{

    #element;
    #listTost;

    constructor() {
        this.#element;
        this.#listTost = new ListToastModel()
    }


    add(type){

        this.#element = document.querySelector('.tost')

        if(!this.#element){
            this.#element  = document.createElement('div');
            this.#element.classList.add('tost')
            document.body.appendChild(this.#element)
        }
        
        const id = this.#listTost.generateId();
        this.#listTost[type](id);
        console.log(this.#listTost.list)

        this.#element.innerHTML = this.#template(id);

        let time = setTimeout(() => {
            this.#delete(id)
        }, 2000);

        this.#element.querySelector(`#${id} button`).addEventListener('click', () => {
            clearTimeout(time);
            this.#delete(id);
        })

        
    }

    #template(id){
        let list = this.#listTost.list.map(t => ` 
            <div class="tost__content tost-${t.type}" id="${id}">
                <i class="tost__icon ${this.#typeIcon(t.type)}"></i>
                <h2 class="tost__title">${t.title}</h2>
                <p class="tost__text">${t.message}</p>
                <button class="tost__button button button-icon icon-exit"></button>
            </div>
        `)

        return list.join('')
    }

    #delete(id){
        document.querySelector('#' + id).remove();
        this.#listTost.remove(id);
    }

    #typeIcon(type){

        const icon = {
            success(){
                return 'icon-check'
            },
            error(){
                return 'icon-exit'
            }
        }

        
        return icon[type]();

    }
}