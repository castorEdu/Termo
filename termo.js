import {_add} from '/functions.js'
export class Termo{
    constructor(beanGame){
        this.beanGame = beanGame
    }
    start_Termo(){
        _add(this.beanGame)
    }
}