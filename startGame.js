import {_add} from '/functions.js'
export class Start_Game{
    constructor(beanGame){
        this.beanGame = beanGame
    }
    _start(){
        _add(this.beanGame)
    }
}