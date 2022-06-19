export class ConfirmDialogView{

    #element;

    constructor() {
        this.#element;
    }

    open(message) {
       return new Promise((resolve, reject) => {

            this.#element  = document.createElement('div');
            this.#element.classList.add('confirmDialog')
            this.#element.innerHTML = this.#template(message);
            document.body.appendChild(this.#element)

            this.#element.querySelector('.icon-check').addEventListener('click',() => {
                this.#close();
                resolve(true);
            });

            this.#element.querySelectorAll('.icon-exit').forEach(button => {
                button.addEventListener('click',() => {
                    this.#close();
                    reject();
                });
            })

       })

    }

    #close(){
        this.#element.remove();
    }

    #template(message){
        return `
        <div class="confirmDialog__content">
            <div class="confirmDialog__header">
                <h2 class="confirmDialog__header__title">Confirmação</h2>
                <button class="button button-icon icon-exit"></button>
            </div>
            <div class="confirmDialog__main">
                <p>${message}</p>
            </div>
            <div class="confirmDialog__footer">
                <button class="button button-icon-text button-red icon-exit">Não</button>
                <button class="button button-icon-text button-green icon-check">Sim</button>
            </div>
        </div>

        `
    }
}

// let div = document.createElement('div')
// undefined
// div.id = 'model'
// 'model'
// div.innerHTML = '<p>CreateElement example</p>'
// '<p>CreateElement example</p>'
// document.body.appendChild(div)
// <div id=​"model">​…​</div>​
// div.remove()
// undefined