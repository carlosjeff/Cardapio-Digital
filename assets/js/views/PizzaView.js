export class PizzaView{

    #element;


    constructor(element) {

        this.#element = element;
        this.#element.innerHTML = this.#template()


    }

    selectAccordion(accordionid){
       
        this.#element.querySelectorAll('.accordion').forEach(a => {
            if(a.id == accordionid){
                a.classList.remove('accordion-disabled')
            }else{
                a.classList.add('accordion-disabled')
            }
        })
    }


    #template(){

        return `
            <div class="accordion accordion-disabled" id="pizza-size">
                <div class="accordion__action">
                    <h2 class="acordion__title">Tamanho</h2>
                    <i class="accordion__icon icon-arrow-up"></i>
                </div>
                <div class="accordion__content">
                   
                </div>
            </div>
            <div class="accordion " id="pizza-flavor">
                <div class="accordion__action">
                    <h2 class="acordion__title">Sabores</h2>
                    <i class="accordion__icon icon-arrow-down"></i>
                </div>
                <div class="accordion__content">
                </div>
            </div>
            <div class="accordion accordion-disabled" id="pizza-edge">
                <div class="accordion__action">
                    <h2 class="acordion__title">Bordas</h2>
                    <i class="accordion__icon icon-arrow-down"></i>
                </div>
                <div class="accordion__content">
                </div>
            </div>
            <div class="accordion accordion-disabled" id="pizza-additional">
                <div class="accordion__action">
                    <h2 class="acordion__title">Adicionais</h2>
                    <i class="accordion__icon icon-arrow-down"></i>
                </div>
                <div class="accordion__content">
                </div>
            </div>
        `
    }
}