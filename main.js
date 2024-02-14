let palavraTermo = ''
let palavraDueto = ''
let palavraTerceto = ''
let palavraQuarteto = ''
let coluna = 0
let linha = 0
let tamanhoPalavra = 5
let DuetoSN = false
let TercetoSN = false
let QuartetoSN = false
let gameContent = 1
let gameTry = 6
let element = document.getElementsByClassName('container')
let elementDueto = document.getElementsByClassName('container-dueto')
let elementTerceto = document.getElementsByClassName('container-terceto')
let elementQuarteto = document.getElementsByClassName('container-quarteto')
let acertouTermo = false
let acertouDueto = false
let acertouTerceto = false
let acertouQuarteto = false
let gameFinish = document.getElementById('telaGameFinish')
let mensagem = document.getElementById('mensagem')
let palavraMensagem = document.getElementById('palavraChave')
let indexGame = 1
geraPalavra()
document.addEventListener('keydown',(ev)=>{
    if (validaLetraTeclado(ev)){
        let letra = ev.key.toUpperCase()  
        if(ev.key == 'Backspace'){    
            if (coluna > 0){
                if(acertouTermo == false){
                    element[linha].children[coluna-1].innerText = ""
                }
                if(DuetoSN){
                    elementDueto[linha].children[coluna-1].innerText = ""
                }
                if(TercetoSN){
                    elementTerceto[linha].children[coluna-1].innerText = ""
                }
                if(QuartetoSN){
                    elementQuarteto[linha].children[coluna-1].innerText = ""
                }
                coluna -= 1
            }else{
                coluna = 0
            }
        }else{
            if(coluna < tamanhoPalavra){
                coluna += 1
                if(acertouTermo == false){
                    element[linha].children[coluna-1].innerText = letra
                }
                if(DuetoSN){
                    if(acertouDueto == false){
                        elementDueto[linha].children[coluna-1].innerText = letra
                    }
                }
                if(TercetoSN){
                    if(acertouTerceto == false){
                        elementTerceto[linha].children[coluna-1].innerText = letra
                    }
                }
                if(QuartetoSN){
                    if(acertouQuarteto == false){
                        elementQuarteto[linha].children[coluna-1].innerText = letra
                    }
                }
            }
        }
    }
    
    if(ev.key == 'Enter'){
        if (verificaQtdLetras() == true){
            for(let i = 0; i < tamanhoPalavra; i++){
                if(acertouTermo == false){
                    validaLetraCerta(element[linha].children[i].innerText, i,palavraTermo,element)
                }
                if(DuetoSN == true){
                    if(acertouDueto == false){
                        validaLetraCerta(elementDueto[linha].children[i].innerText, i, palavraDueto,elementDueto)
                    }
                }
                if(TercetoSN == true){
                    if(acertouTerceto == false){
                        validaLetraCerta(elementTerceto[linha].children[i].innerText, i,palavraTerceto,elementTerceto)
                    }
                }
                if(QuartetoSN == true){
                    if(acertouQuarteto == false){
                        validaLetraCerta(elementQuarteto[linha].children[i].innerText, i,palavraQuarteto,elementQuarteto)
                    }
                }
            }
            linha += 1
            coluna = 0
            PalavraCertaSN()
        }
    }
    
})
function validaLetraTeclado(ev){
    if(ev.key == "0" || ev.key == "1" || ev.key == "2" || ev.key == "3"|| ev.key == "4"|| ev.key == "5"|| ev.key == "6" || ev.key == "7" || ev.key == "8" || ev.key == "9" || ev.key == 'Enter' || ev.key == 'ArrowUp' || ev.key == 'ArrowDown' || ev.key == 'ArrowRight' || ev.key == 'ArrowLeft' || ev.key == '/' || ev.key == '*' || ev.key == '-' || ev.key == '+' || ev.key == '.' || ev.key == ',' || ev.key == ';' || ev.key == '/' || ev.key == 'Alt' || ev.key == 'Control' || ev.key == 'Dead' || ev.key == 'Meta' || ev.key == "'" || ev.key == 'Escape' || ev.key == ' ' || ev.key == 'AltGraph' || ev.key == 'ContextMenu' || ev.key == 'Insert' || ev.key == 'End' || ev.key == 'Delete' || ev.key == 'Home' || ev.key == 'PageUp' || ev.key == 'PageDown' || ev.key == 'NumLock' || ev.key == 'ScrollLock' || ev.key == 'Pause' || ev.key == 'F1' || ev.key == 'F2' || ev.key == 'F3' || ev.key == 'F4' || ev.key == 'F5' || ev.key == 'F6' || ev.key == 'F7' || ev.key == 'F8' || ev.key == 'F9' || ev.key == 'F10' || ev.key == 'F11' || ev.key == 'F12' || ev.key == 'Tab' || ev.key == 'CapsLock' || ev.key == 'Shift' || ev.key == 'Clear' || ev.key == '[' || ev.key == ']' || ev.key == '=' || ev.key == '!' || ev.key == '@' || ev.key == '#' || ev.key == '$' || ev.key == '$' || ev.key == '%' || ev.key == '¨' || ev.key == '&' || ev.key == '(' || ev.key == ')' || ev.key == 'ç' || ev.key == 'Ç' || ev.key == '|' || ev.key == '^' || ev.key == '`' || ev.key == '"' || ev.key == ":" || ev.key == '?' || ev.key == '<' || ev.key == '>' || ev.key == '°' || ev.key == 'º' || ev.key == 'ª' || ev.key == '§' || ev.key == '_'){
        return false
    }else{
        return true
    }
}
function validaLetraCerta(w,x,palavra,elemento){
    for(let i = 0; i<tamanhoPalavra;i++){
        if(x == i){
            if(w == palavra[i]){
                elemento[linha].children[i].classList.add('acertouLetra')
                continue
            }else{
                if(palavra.includes(w)){
                    if (corrigeLetraExistente(w,elemento,palavra)){
                        elemento[linha].children[i].classList.add('existeLetra')
                    }
                }
            }
        }
    }
}
function verificaQtdLetras(){
    for(let i = 0; i<tamanhoPalavra;i++){
        if(acertouTermo == false){
            if(element[linha].children[i].innerText == ""){
                return false
            }
        }
        if(DuetoSN){
            if(acertouDueto == false){
                if(elementDueto[linha].children[i].innerText == ""){
                    return false
                }
            }
        }
        if(TercetoSN){
            if(acertouTerceto == false){
                if(elementTerceto[linha].children[i].innerText == ""){
                    return false
                }
            }
        }
        if(QuartetoSN){
            if(acertouQuarteto == false){
                if(elementQuarteto[linha].children[i].innerText == ""){
                    return false
                }
            }
        }
    }
    return true
}
function ToggleConfig(){
    const config = document.getElementById('game-config')

    config.classList.toggle('visible')
    config.classList.toggle('hidden')
}

function geraPalavra(){
    let numeroAleatorio = 0
    let arrayGeral

    let arrayCincoLetras = [
        'atada','áurea','armar','ábaco','areia','aceso','abrir','adeus','aliar','azara','basto','brado','botar','bucha','bomba','bamba','bujão','bolha','boate','boina','canga','campo','cerol','caqui','caber','curte','cosmo','cegar','capim','catar','dupla','denso','durmo','droga','dosar','disto','deste','ducto','duque','dobra','elite','extra','etapa','épico','épica','época','enojo','étimo','ebola','ébrio','fosca','ferpa','final','fosco','farsa','frota','fênix','focal','fusão','fisco','greta','gales','golpe','gerir','geada','grude','gamar','genro','gávea','grade','hífen','honra','hiato','harém','harpa','horda','haver','hotel','harpe','humor','ímpar','ideal','ibope','ícone','índio','iônio','ideia','inato','ileso','impor','juízo','jeito','julho','judia','jejum','jogue','janta','junho','jovem','jurar','laivo','ligue','ladra','larva','letal','licor','lesar','líder','laser','larga','marte','macom','micro','mirim','maior','mágoa','mango','manso','macio','magro','nesta','nobre','nisso','noiva','negra','nobel','nitro','neném','narco','naval','oeste','ouvir','ordem','outra','oliva','ontem','orcar','ogiva','opcão','odeia','pomar','pixel','punho','piano','perua','pasta','pirão','polir','porta','pulso','queda','quase','quite','quedo','quibe','quilo','quero','quina','quota','rezar','régua','roque','refil','rapar','roubo','roupa','renal','remir','ronda','sanha','solto','sonso','sinto','sauna','sovar','sarar','sírio','sirva','segar','toner','tropo','traiu','trela','torso','terca','trote','triar','turvo','tecla','única','união','unhar','ungir','único','usura','ureia','usada','unido','urano','varar','vírus','veril','verba','venta','vosso','viajo','viste','venha','vadia','zerar','zíper','zunir','zelar','zorro','zumbi','zonzo','zonar','zaino','zoada'
    ]
    let arraySeisLetras = [
        'agente','amônia','aquoso','apenas','avesta','aferir','atonal','arroba','airoso','ataque','boteco','bunker','brocal','bitola','baiano','batina','bigode','brusca','bovina','bombom','cachos','canudo','carcel','cagada','copete','correr','caburé','cereal','calote','catodo','divide','diesel','dobrez','ditoso','diante','dorsal','datado','dispor','dormia','divino','escuna','evocar','exigiu','espião','escopo','eterna','exibir','equipo','estaca','escura','fruita','faceta','fresta','fabril','flagra','freira','falido','fausto','fivela','feitor','golaco','grátis','gelada','garota','guiada','gélido','gaiato','gradil','gangue','guloso','hiante','hilton','humano','hábito','horror','halter','hangar','hálito','haxixe','hípico','idiota','iludir','inerme','infiel','índico','inupto','imensa','imerso','iguana','índice','jaleco','jogava','juncão','jóquei','jovial','jujuba','jornal','jocoso','jaguar','jardim','lanche','luneta','largar','lancar','lotado','lisboa','lichia','lucrar','lastro','loucão','mandar','motriz','membro','mordaz','manada','modelo','marfim','matriz','menina','mimado','novelo','nascer','nuvens','novena','nonada','núcleo','notado','netuno','namoro','noutra','oculto','octano','onerar','outrem','oxidar','ornato','óptico','obstar','olimpo','oferta','pintar','poetar','picote','porvir','pequim','palato','porque','portal','poroso','pasmar','quiser','quinze','quiabo','quanta','quadra','quilha','quioto','querer','queijo','quinto','recebo','rígido','rapado','rocado','rapper','regato','rabeta','resort','romper','remido','sétima','sugeri','serviu','servil','sátira','sobrar','sabido','sérvia','seleto','seleta','tostar','tender','traduz','tareia','taboca','treita','talude','tobogã','torpor','tampão','utopia','umbigo','urinar','úlcera','ungido','uretra','ureter','urbano','urânio','urente','varada','vargem','viacão','vieste','vagina','velada','verbal','vítima','versão','viloso','zunido','zoeira','zangar','zerado','zombar','zumbir','zanzar','zeloso','zarpar','zoacão'
    ]
    let arraySeteLetras = [
        'abafado','animoso','arruaca','anojado','amianto','alistar','atolado','acarear','arquivo','assumir','bióxido','bauxita','brilhar','boliche','barbado','barbuda','bichano','benzina','basalto','batente','cachaca','corrida','cruzado','chávena','copioso','chegada','caboclo','cupuacu','caralho','caipora','doestar','discute','divagar','disputa','dilúvio','decisão','docente','deferir','degredo','devesse','etileno','escrito','erguido','estrume','expensa','entrave','escarpa','efêmera','epítome','esquina','fendido','fazenda','falésia','ficaria','formoso','fissura','firmeza','frontal','fatores','folgado','guarida','gracejo','genitor','glicose','gengiva','gatinho','gênesis','garanto','guarita','genioso','hirsuto','hesitar','honorar','herança','hamster','hóspede','hungria','hibisco','humilde','hilário','incerto','ingerir','inimiga','insosso','indutor','indexar','incivil','ibérico','icônico','inculto','jogador','juntura','juizado','jusante','jumenta','jardins','justeza','juvenil','jugular','jeitoso','luminar','límpido','lojista','lapidar','leitoso','liberal','lascivo','lastrar','legenda','líquido','matizar','monstro','milagre','maioral','máscara','mancada','mordida','monarca','murchar','moletom','nublado','nenhuma','núpcias','nirvana','ninguém','nervoso','negrito','nitrilo','novilho','numerar','oriundo','ofertar','operado','oitenta','onerado','omitido','ominoso','objetar','obturar','oficiar','paraíso','profano','paulada','povoado','poderio','pamonha','peituda','pasmoso','plectro','próprio','química','quisera','quesito','queimar','químico','quinhão','querida','querela','quadrar','quantia','rochoso','ramalho','reduziu','revelia','reunião','renegar','relevar','redutor','reputar','racismo','saberia','secreta','sorriso','sorvete','sujeira','soprano','sedento','serrana','sapinho','sanável','tempura','tornada','trienal','trivela','topless','talhada','tamanho','tequila','tétrico','tentava','ultimar','upgrade','ursinho','unissex','unívoco','urgente','usuário','uterino','uretano','usurpar','veleiro','valorar','varanda','visitar','vagante','vigário','vontade','vexação','viaduto','vazante','zangado','zoonose','zangada','zoófilo','zelante','zodíaco','zelador','zumbido',
    ]

    if(tamanhoPalavra == 5){
        arrayGeral = arrayCincoLetras
    }else if(tamanhoPalavra == 6){
        arrayGeral = arraySeisLetras
    }else{
        arrayGeral = arraySeteLetras
    }
    for(let i = 0; i<indexGame; i++){
        console.log(i)
        console.log(indexGame)
        numeroAleatorio = parseInt(Math.random()*arrayGeral.length)
        if(i == 0){
            palavraTermo = arrayGeral[numeroAleatorio].toUpperCase()
            palavraTermo = palavraTermo.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        }else if(i == 1){
            palavraDueto = arrayGeral[numeroAleatorio].toUpperCase()
            palavraDueto = palavraDueto.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        }else if(i == 2){
            palavraTerceto = arrayGeral[numeroAleatorio].toUpperCase()
            palavraTerceto = palavraTerceto.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        }else if(i == 3){
            palavraQuarteto = arrayGeral[numeroAleatorio].toUpperCase()
            palavraQuarteto = palavraQuarteto.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        }
    }
    console.log(palavraTermo + ' ' + palavraDueto + ' ' + palavraTerceto + ' ' + palavraQuarteto)
}

function corrigeLetraExistente(caracter, ev, palavra){
    let arrayRepetida = []
    let repetidaDigitada = 0
    let repetidaChave = 0
    for(let i = 0; i<tamanhoPalavra; i++){
        if(caracter == ev[linha].children[i].innerText){
            arrayRepetida.push(i)
            repetidaDigitada += 1
        }
        if(caracter == palavra[i]){
            repetidaChave += 1
        }
    }
    if (arrayRepetida.length > 1){
        if(repetidaDigitada > repetidaChave){
            for(let i = 0; i<arrayRepetida.length;i++){
                if(palavra[arrayRepetida[i]] == caracter){
                    return false
                }
            }
        }
    }
    return true
}
function CleanPanel(){
    let body = document.getElementsByTagName('body')
    let panel = document.getElementById('panel')
    body[0].removeChild(panel)

}
function AddPanel(){
    let body = document.getElementsByTagName('body')
    let panel = document.createElement('div')
    panel.id = 'panel'
    body[0].appendChild(panel)
}
function GameSelected(indiceGame){
    CleanPanel()
    AddPanel()
    GameProperties(indiceGame)
    indexGame = indiceGame
    geraPalavra()
    gameFinish.classList.remove('visible')
    gameFinish.classList.add('hidden')
    coluna = 0
    linha = 0
    let panel = document.getElementById('panel')
    let arrayClasse = ['container','container-dueto','container-terceto','container-quarteto']
    for(let i = 0; i<gameContent;i++){
        let content = document.createElement('div')
        content.className = 'content'
        for(let j = 0; j< gameTry;j++){
            let container = document.createElement('div')
            container.className = arrayClasse[i]
            for(let g = 0; g<tamanhoPalavra;g++){
                let box = document.createElement('div')
                box.className = 'box'
                container.appendChild(box)
            }
            content.appendChild(container)
        }
        panel.appendChild(content)
    }
}
function GameProperties(n){
    if (n == 1){
        DuetoSN = false
        TercetoSN = false
        QuartetoSN = false
        gameContent = 1
        gameTry = 6
    }
    if (n == 2){
        DuetoSN = true
        TercetoSN = false
        QuartetoSN = false
        gameContent = 2
        gameTry = 7
    }
    if (n == 3){
        DuetoSN = true
        TercetoSN = true
        QuartetoSN = false
        gameContent = 3
        gameTry = 8
    }
    if (n == 4){
        DuetoSN = true
        TercetoSN = true
        QuartetoSN = true
        gameContent = 4
        gameTry = 9
    }
    acertouTermo = false
    acertouDueto = false
    acertouTerceto = false
    acertouQuarteto = false
}
function PalavraCertaSN(){
    if(acertouTermo == false){
        acertouTermo = verificaPalavra(palavraTermo,element)
    }
    if(DuetoSN == true){
        if(acertouDueto == false){
            acertouDueto = verificaPalavra(palavraDueto,elementDueto)
        }
    }
    if(TercetoSN == true){
        if(acertouTerceto == false){
            acertouTerceto  = verificaPalavra(palavraTerceto,elementTerceto)
        }
    }
    if(QuartetoSN == true){
        if(acertouQuarteto){
            acertouQuarteto = verificaPalavra(palavraQuarteto,elementQuarteto)
        }
    }

    if(DuetoSN == false && TercetoSN == false && QuartetoSN == false){
        if(acertouTermo == true){
            gameFinish.classList.remove('hidden')
            gameFinish.classList.add('visible')
            palavraMensagem.innerText = palavraTermo
        }else{
            if(linha >= gameTry){
                mensagem.innerText = "GAME OVER"
                gameFinish.classList.remove('hidden')
                gameFinish.classList.add('visible')
                palavraMensagem.innerText = palavraTermo
            }
        }
    }
    if(DuetoSN == true && TercetoSN == false && QuartetoSN == false){
        if(acertouTermo == true && acertouDueto == true){
            gameFinish.classList.remove('hidden')
            gameFinish.classList.add('visible')
            palavraMensagem.innerText = palavraTermo + ', ' + palavraDueto
        }else{
            if(linha >= gameTry){
                mensagem.innerText = "GAME OVER"
                gameFinish.classList.remove('hidden')
                gameFinish.classList.add('visible')
                palavraMensagem.innerText = palavraTermo + ', ' + palavraDueto
            }
        }
    }
    if(DuetoSN == true && TercetoSN == true && QuartetoSN == false){
        if(acertouTermo == true && acertouDueto == true && acertouTerceto == true){
            gameFinish.classList.remove('hidden')
            gameFinish.classList.add('visible')
            palavraMensagem.innerText = palavraTermo + ', ' + palavraDueto + ', ' + palavraTerceto
        }else{
            if(linha >= gameTry){
                mensagem.innerText = "GAME OVER"
                gameFinish.classList.remove('hidden')
                gameFinish.classList.add('visible')
                palavraMensagem.innerText = palavraTermo + ', ' + palavraDueto + ', ' + palavraTerceto
            }
        }
    }
    if(DuetoSN == true && TercetoSN == true && QuartetoSN == true){
        if(acertouTermo == true && acertouDueto == true && acertouTerceto == true && acertouQuarteto == true){
            gameFinish.classList.remove('hidden')
            gameFinish.classList.add('visible')
            palavraMensagem.innerText = palavraTermo + ', ' + palavraDueto + ', ' + palavraTerceto + ', ' + palavraQuarteto
        }else{
            if(linha >= gameTry){
                mensagem.innerText = "GAME OVER"
                gameFinish.classList.remove('hidden')
                gameFinish.classList.add('visible')
                palavraMensagem.innerText = palavraTermo + ', ' + palavraDueto + ', ' + palavraTerceto + ', ' + palavraQuarteto
            }
        }
    }
}
function verificaPalavra(p,e){
    let palavraDigitada = ""
    for(let i = 0; i<p.length;i++){
        palavraDigitada += e[linha-1].children[i].innerText
    }
    if(palavraDigitada == p){
        return true
    }else{
        return false
    }
}
function QuantidadeLetra(indexQuantidadeLetra){
    if(indexQuantidadeLetra == 1){
        tamanhoPalavra = 5
    }
    if(indexQuantidadeLetra == 2){
        tamanhoPalavra = 6
    }
    if(indexQuantidadeLetra == 3){
        tamanhoPalavra = 7
    }
    GameSelected(indexGame)
    geraPalavra()
    let config = document.getElementById('game-config')
    config.classList.remove('visible')
    config.classList.add('hidden')
}
window.addEventListener('scroll',()=>{
    window.scrollTo(0,0)
})