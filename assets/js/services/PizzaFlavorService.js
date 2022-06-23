import { ConnectionFactory } from './ConnectionFactory.js'
import { PizzaFlavorDao } from '../dao/PizzaFlavorDao.js'

export class PizzaFlavorService{
    
    constructor() {
    }

    add(model){
        return ConnectionFactory
            .getConnection()
            .then(connection => new PizzaFlavorDao(connection))
            .then(dao => dao.add(model))
            .catch(err => {
                throw new Error(err)
            })
    }

    edit(model){
        return ConnectionFactory
            .getConnection()
            .then(connection => new PizzaFlavorDao(connection))
            .then(dao => dao.edit(model))
            .catch(err => {throw new Error(err)});
    }

    delete(id){
        return ConnectionFactory
            .getConnection()
            .then(connection => new PizzaFlavorDao(connection))
            .then(dao => dao.delete(id))
            .catch(err => {throw new Error(err)});
    }


    getAll(){
        
        return ConnectionFactory
            .getConnection()
            .then(connection => new PizzaFlavorDao(connection))
            .then(dao => dao.listAll())
            .catch(err => {throw new Error(err)})
    }
}