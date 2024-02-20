import { Start_Game } from '/startGame.js'
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
                    if(bean.acertouDueto == false){
                        bean.elementDueto[bean.row].children[bean.column-1].innerText = ""
                    }
                }
                if(bean.TercetoSN){
                    if(bean.acertouTerceto == false){
                        bean.elementTerceto[bean.row].children[bean.column-1].innerText = ""
                    }   
                }
                if(bean.QuartetoSN){
                    if(bean.acertouQuarteto == false){
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
            PalavraCertaSN(bean)
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
    let menu = document.getElementById('menu')
    menu.classList.toggle('hidden')

    let toggle_menu = document.getElementById('toggle-menu')
    toggle_menu.children[0].setAttribute('src','assets/menu.svg')
    
    clean_Panel()
    bean.gameFinish.classList.remove('visible')
    bean.gameFinish.classList.add('hidden')
    bean.column = 0
    bean.row = 0
    bean.indexGame = myValue
    GameProperties(parseInt(myValue))
    geraPalavra(bean)
    let game = new Start_Game(bean)
    game._start()
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
    geraPalavra(bean)
}
function clean_Panel(){
    let body = document.getElementsByTagName('body')
    let panel = document.getElementById('panel')
    body[0].removeChild(panel)
}
window.addEventListener('scroll',()=>{
    window.scrollTo(0,0)
})

document.getElementById('close').addEventListener('click', ()=>{
    let telaGameFinish = document.getElementById('telaGameFinish')
    telaGameFinish.classList.toggle('hidden')
})

let toggle_menu = document.getElementById('toggle-menu')
toggle_menu.addEventListener('click', ()=>{
    let menu = document.getElementById('menu')
    if (menu.classList.toggle('hidden') == true){
        toggle_menu.children[0].setAttribute('src','assets/menu.svg')
    }else{
        toggle_menu.children[0].setAttribute('src','assets/arrow_back.svg')
    }
})

let help = document.getElementById('help')
help.addEventListener('click', ()=>{
    let howTo = document.getElementById('howTo')
    howTo.classList.toggle('hidden')
})

let click_howTo = document.getElementById('click-howTo')
click_howTo.addEventListener('click', ()=>{
    let howTo = document.getElementById('howTo')
    howTo.classList.toggle('hidden')
})