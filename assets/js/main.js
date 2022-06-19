import { PizzaController } from './controllers/PizzaController.js';

let elementMain = document.querySelector('#content-main');

let pizzaControllers = new PizzaController(elementMain);
