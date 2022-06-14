import {ConnectionFactory} from './ConnectionFactory.js'
import {PizzaSizeDao} from '../dao/PizzaSizeDao.js'

export class PizzaSizeService{

    constructor() {
    }

    add(model){
        return ConnectionFactory
            .getConnection()
            .then(connection => new PizzaSizeDao(connection))
            .then(dao => dao.add(model))
            .catch(err => {
                throw new Error(err)
            })
    }

    edit(model){
        return ConnectionFactory
            .getConnection()
            .then(connection => new PizzaSizeDao(connection))
            .then(dao => dao.edit(model))
            .catch(err => {throw new Error(err)});
    }

    getAll(){
        return ConnectionFactory
            .getConnection()
            .then(connection => new PizzaSizeDao(connection))
            .then(dao => dao.listAll())
            .catch(err => {
                throw new Error(err)
            })
    }
}