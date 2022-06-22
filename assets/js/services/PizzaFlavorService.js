import { ConnectionFactory } from './ConnectionFactory.js'
import { PizzaFlavorDao } from '../dao/PizzaFlavorDao.js'

export class PizzaFlavorService{
    
    constructor() {
    }

    getAll(){
        
        return ConnectionFactory
            .getConnection()
            .then(connection => new PizzaFlavorDao(connection))
            .then(dao => dao.listAll())
            .catch(err => {throw new Error(err)})
    }
}