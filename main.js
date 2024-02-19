import { Termo } from '/termo.js'
import { Dueto } from '/dueto.js'
import { Terceto } from '/terceto.js'
import { Quarteto } from '/quarteto.js'
import { Bean } from '/bean.js'
import {verificaQtdLetras, validaLetraCerta, PalavraCertaSN, validaLetraTeclado, geraPalavra} from '/functions.js'
let bean = new Bean

geraPalavra(bean)
document.addEventListener('keydown',(ev)=>{
    if (validaLetraTeclado(ev)){
        let letra = ev.key.toUpperCase()  
        if(ev.key == 'Backspace'){    
            if (bean.column > 0){
                if(bean.acertouTermo == false){
                    bean.element[bean.row].children[bean.column-1].innerText = ""
                }
                if(bean.DuetoSN){
                    if(bean.acertouDueto){
                        bean.elementDueto[bean.row].children[bean.column-1].innerText = ""
                    }
                }
                if(bean.TercetoSN){
                    if(bean.acertouTerceto){
                        bean.elementTerceto[bean.row].children[bean.column-1].innerText = ""
                    }   
                }
                if(bean.QuartetoSN){
                    if(bean.acertouQuarteto){
                        bean.elementQuarteto[bean.row].children[bean.column-1].innerText = ""
                    }
                }
                bean.column -= 1
            }else{
                bean.column = 0
            }
        }else{
            if(bean.column < bean.tamanhoPalavra){
                bean.column += 1
                if(bean.acertouTermo == false){
                    bean.element[bean.row].children[bean.column-1].innerText = letra
                }
                if(bean.DuetoSN){
                    if(bean.acertouDueto == false){
                        bean.elementDueto[bean.row].children[bean.column-1].innerText = letra
                    }
                }
                if(bean.TercetoSN){
                    if(bean.acertouTerceto == false){
                        bean.elementTerceto[bean.row].children[bean.column-1].innerText = letra
                    }
                }
                if(bean.QuartetoSN){
                    if(bean.acertouQuarteto == false){
                        bean.elementQuarteto[bean.row].children[bean.column-1].innerText = letra
                    }
                }
            }
        }
    }
    
    if(ev.key == 'Enter'){
        if (verificaQtdLetras(bean) == true){
            for(let i = 0; i < bean.tamanhoPalavra; i++){
                if(bean.acertouTermo == false){
                    validaLetraCerta(bean.element[bean.row].children[i].innerText, i,bean.palavraTermo,bean.element, bean)
                }
                if(bean.DuetoSN == true){
                    if(bean.acertouDueto == false){
                        validaLetraCerta(bean.elementDueto[bean.row].children[i].innerText, i, bean.palavraDueto,bean.elementDueto, bean)
                    }
                }
                if(bean.TercetoSN == true){
                    if(bean.acertouTerceto == false){
                        validaLetraCerta(bean.elementTerceto[bean.row].children[i].innerText, i,bean.palavraTerceto,bean.elementTerceto, bean)
                    }
                }
                if(bean.QuartetoSN == true){
                    if(bean.acertouQuarteto == false){
                        validaLetraCerta(bean.elementQuarteto[bean.row].children[i].innerText, i,bean.palavraQuarteto,bean.elementQuarteto, bean)
                    }
                }
            }
            bean.row += 1
            bean.column = 0
            PalavraCertaSN()
        }
    }
    
})
let termo = document.getElementById('termo')
termo.addEventListener('click',()=>{
    GameSelected(1)
})
let dueto = document.getElementById('dueto')
dueto.addEventListener('click',()=>{
    GameSelected(2)
})
let terceto = document.getElementById('terceto')
terceto.addEventListener('click',()=>{
    GameSelected(3)
})
let quarteto = document.getElementById('quarteto')
quarteto.addEventListener('click',()=>{
    GameSelected(4)
})
function GameSelected(myValue){
    clean_Panel()
    bean.gameFinish.classList.remove('visible')
    bean.gameFinish.classList.add('hidden')
    bean.column = 0
    bean.row = 0
    bean.indexGame = myValue
    GameProperties(parseInt(myValue))
    geraPalavra(bean)
    if(parseInt(myValue) == 1){
        let game_termo = new Termo(bean)
        game_termo.start_Termo()
    }else if(parseInt(myValue) == 2){
        let game_dueto = new Dueto(bean)
        game_dueto.start_Dueto()
    }else if(parseInt(myValue) == 3){
        let game_terceto = new Terceto(bean)
        game_terceto.start_Terceto()
    }else if(parseInt(myValue) == 4){
        let game_quarteto = new Quarteto(bean)
        game_quarteto.start_Quarteto()
    }
}
function GameProperties(n){
    if (n == 1){
        bean.DuetoSN = false
        bean.TercetoSN = false
        bean.QuartetoSN = false
        bean.components_columns = 1
        bean.components_rows = 6
    }
    if (n == 2){
        bean.DuetoSN = true
        bean.TercetoSN = false
        bean.QuartetoSN = false
        bean.components_columns = 2
        bean.components_rows = 7
    }
    if (n == 3){
        bean.DuetoSN = true
        bean.TercetoSN = true
        bean.QuartetoSN = false
        bean.components_columns = 3
        bean.components_rows = 8
    }
    if (n == 4){
        bean.DuetoSN = true
        bean.TercetoSN = true
        bean.QuartetoSN = true
        bean.components_columns = 4
        bean.components_rows = 9
    }
    bean.acertouTermo = false
    bean.acertouDueto = false
    bean.acertouTerceto = false
    bean.acertouQuarteto = false
}
let cinco = document.getElementById('letras_cinco')
cinco.addEventListener('click',()=>{
    QuantidadeLetra(cinco.getAttribute('value'))
})
let seis = document.getElementById('letras_seis')
seis.addEventListener('click',()=>{
    QuantidadeLetra(seis.getAttribute('value'))
})
let sete = document.getElementById('letras_sete')
sete.addEventListener('click',()=>{
    QuantidadeLetra(sete.getAttribute('value'))
})
function QuantidadeLetra(QtdLetras){
    bean.tamanhoPalavra = parseInt(QtdLetras)
    GameSelected(bean.indexGame)
    geraPalavra()
}
function clean_Panel(){
    let body = document.getElementsByTagName('body')
    let panel = document.getElementById('panel')
    body[0].removeChild(panel)
}
window.addEventListener('scroll',()=>{
    window.scrollTo(0,0)
})