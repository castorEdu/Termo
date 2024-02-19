export function _add(bean){
    let body = document.getElementsByTagName('body')
    let panel = document.createElement('panel')
    panel.id = 'panel'
    let arrayClasse = ['container','container-dueto','container-terceto','container-quarteto']
    for(let i = 0; i<bean.components_columns;i++){
        let content = document.createElement('div')
        content.className = 'content'
        for(let j = 0; j< bean.components_rows;j++){
            let container = document.createElement('div')
            container.className = arrayClasse[i]
            for(let g = 0; g<bean.tamanhoPalavra;g++){
                let box = document.createElement('div')
                box.className = 'box'
                container.appendChild(box)
            }
            content.appendChild(container)
        }
        panel.appendChild(content)
    }
    body[0].appendChild(panel)
}
export function verificaQtdLetras(bean){
    for(let i = 0; i<bean.tamanhoPalavra;i++){
        if(bean.acertouTermo == false){
            if(bean.element[bean.row].children[i].innerText == ""){
                return false
            }
        }
        if(bean.DuetoSN){
            if(bean.acertouDueto == false){
                if(bean.elementDueto[bean.row].children[i].innerText == ""){
                    return false
                }
            }
        }
        if(bean.TercetoSN){
            if(bean.acertouTerceto == false){
                if(bean.elementTerceto[bean.row].children[i].innerText == ""){
                    return false
                }
            }
        }
        if(bean.QuartetoSN){
            if(bean.acertouQuarteto == false){
                if(bean.elementQuarteto[bean.row].children[i].innerText == ""){
                    return false
                }
            }
        }
    }
    return true
}
export function validaLetraCerta(letter,index,word,selectedElement, bean){
    for(let i = 0; i<bean.tamanhoPalavra;i++){
        if(index == i){
            if(letter == word[i]){
                selectedElement[bean.row].children[i].classList.add('acertouLetra')
                continue
            }else{
                if(word.includes(letter)){
                    if (corrigeLetraExistente(letter,selectedElement,word)){
                        selectedElement[bean.row].children[i].classList.add('existeLetra')
                    }
                }
            }
        }
    }
}
function corrigeLetraExistente(caracter, el, wrd){
    let arrayRepetida = []
    let repetidaDigitada = 0
    let repetidaChave = 0
    let temLetraRepetidaCertaSN = false
    for(let i = 0; i<bean.tamanhoPalavra; i++){
        if(caracter == el[bean.row].children[i].innerText){
            arrayRepetida.push(i)
            repetidaDigitada += 1
        }
        if(caracter == wrd[i]){
            repetidaChave += 1
        }
    }
    if (arrayRepetida.length > 1){
        if(repetidaDigitada > repetidaChave){
            for(let i = 0; i<arrayRepetida.length;i++){
                if(wrd[arrayRepetida[i]] == caracter){
                    temLetraRepetidaCertaSN = true
                }
            }
            for(let i = 0;i<arrayRepetida.length;i++){
                if(wrd[arrayRepetida[i]] == caracter){
                    return false
                }else{
                    if(temLetraRepetidaCertaSN == false){
                        for (let j = 0; j<repetidaDigitada - (repetidaDigitada-repetidaChave); j++){
                            el[bean.row].children[arrayRepetida[j]].classList.add('existeLetra')
                        }
                        return false
                    }
                }
            }
        }
    }
    return true
}
export function PalavraCertaSN(){
    if(bean.acertouTermo == false){
        bean.acertouTermo = verificaPalavra(bean.palavraTermo,bean.element)
    }
    if(bean.DuetoSN == true){
        if(bean.acertouDueto == false){
            bean.acertouDueto = verificaPalavra(bean.palavraDueto,bean.elementDueto)
        }
    }
    if(bean.TercetoSN == true){
        if(bean.acertouTerceto == false){
            bean.acertouTerceto  = verificaPalavra(bean.palavraTerceto,bean.elementTerceto)
        }
    }
    if(bean.QuartetoSN == true){
        if(bean.acertouQuarteto == false){
            bean.acertouQuarteto = verificaPalavra(bean.palavraQuarteto,bean.elementQuarteto)
        }
    }

    if(bean.DuetoSN == false && bean.TercetoSN == false && bean.QuartetoSN == false){
        if(bean.acertouTermo == true){
            bean.gameFinish.classList.remove('hidden')
            bean.gameFinish.classList.add('visible')
            bean.palavraMensagem.innerText = bean.palavraTermo
        }else{
            if(bean.row >= bean.components_rows){
                bean.mensagem.innerText = "GAME OVER"
                bean.gameFinish.classList.remove('hidden')
                bean.gameFinish.classList.add('visible')
                bean.palavraMensagem.innerText = bean.palavraTermo
            }
        }
    }
    if(bean.DuetoSN == true && bean.TercetoSN == false && bean.QuartetoSN == false){
        if(bean.acertouTermo == true && bean.acertouDueto == true){
            bean.gameFinish.classList.remove('hidden')
            bean.gameFinish.classList.add('visible')
            bean.palavraMensagem.innerText = bean.palavraTermo + ', ' + bean.palavraDueto
        }else{
            if(bean.row >= bean.components_rows){
                bean.mensagem.innerText = "GAME OVER"
                bean.gameFinish.classList.remove('hidden')
                bean.gameFinish.classList.add('visible')
                bean.palavraMensagem.innerText = bean.palavraTermo + ', ' + bean.palavraDueto
            }
        }
    }
    if(bean.DuetoSN == true && bean.TercetoSN == true && bean.QuartetoSN == false){
        if(bean.acertouTermo == true && bean.acertouDueto == true && bean.acertouTerceto == true){
            bean.gameFinish.classList.remove('hidden')
            bean.gameFinish.classList.add('visible')
            bean.palavraMensagem.innerText = bean.palavraTermo + ', ' + bean.palavraDueto + ', ' + bean.palavraTerceto
        }else{
            if(bean.row >= bean.components_rows){
                bean.mensagem.innerText = "GAME OVER"
                bean.gameFinish.classList.remove('hidden')
                bean.gameFinish.classList.add('visible')
                bean.palavraMensagem.innerText = bean.palavraTermo + ', ' + bean.palavraDueto + ', ' + bean.palavraTerceto
            }
        }
    }
    if(bean.DuetoSN == true && bean.TercetoSN == true && bean.QuartetoSN == true){
        if(bean.acertouTermo == true && bean.acertouDueto == true && bean.acertouTerceto == true && bean.acertouQuarteto == true){
            bean.gameFinish.classList.remove('hidden')
            bean.gameFinish.classList.add('visible')
            bean.palavraMensagem.innerText = bean.palavraTermo + ', ' + bean.palavraDueto + ', ' + bean.palavraTerceto + ', ' + bean.palavraQuarteto
        }else{
            if(bean.row >= bean.components_rows){
                bean.mensagem.innerText = "GAME OVER"
                bean.gameFinish.classList.remove('hidden')
                bean.gameFinish.classList.add('visible')
                bean.palavraMensagem.innerText = bean.palavraTermo + ', ' + bean.palavraDueto + ', ' + bean.palavraTerceto + ', ' + bean.palavraQuarteto
            }
        }
    }
}
function verificaPalavra(p,e){
    let palavraDigitada = ""
    for(let i = 0; i<p.length;i++){
        palavraDigitada += e[bean.row-1].children[i].innerText
    }
    if(palavraDigitada == p){
        return true
    }else{
        return false
    }
}
export function validaLetraTeclado(ev){
    if(ev.key == "0" || ev.key == "1" || ev.key == "2" || ev.key == "3"|| ev.key == "4"|| ev.key == "5"|| ev.key == "6" || ev.key == "7" || ev.key == "8" || ev.key == "9" || ev.key == 'Enter' || ev.key == 'ArrowUp' || ev.key == 'ArrowDown' || ev.key == 'ArrowRight' || ev.key == 'ArrowLeft' || ev.key == '/' || ev.key == '*' || ev.key == '-' || ev.key == '+' || ev.key == '.' || ev.key == ',' || ev.key == ';' || ev.key == '/' || ev.key == 'Alt' || ev.key == 'Control' || ev.key == 'Dead' || ev.key == 'Meta' || ev.key == "'" || ev.key == 'Escape' || ev.key == ' ' || ev.key == 'AltGraph' || ev.key == 'ContextMenu' || ev.key == 'Insert' || ev.key == 'End' || ev.key == 'Delete' || ev.key == 'Home' || ev.key == 'PageUp' || ev.key == 'PageDown' || ev.key == 'NumLock' || ev.key == 'ScrollLock' || ev.key == 'Pause' || ev.key == 'F1' || ev.key == 'F2' || ev.key == 'F3' || ev.key == 'F4' || ev.key == 'F5' || ev.key == 'F6' || ev.key == 'F7' || ev.key == 'F8' || ev.key == 'F9' || ev.key == 'F10' || ev.key == 'F11' || ev.key == 'F12' || ev.key == 'Tab' || ev.key == 'CapsLock' || ev.key == 'Shift' || ev.key == 'Clear' || ev.key == '[' || ev.key == ']' || ev.key == '=' || ev.key == '!' || ev.key == '@' || ev.key == '#' || ev.key == '$' || ev.key == '$' || ev.key == '%' || ev.key == '¨' || ev.key == '&' || ev.key == '(' || ev.key == ')' || ev.key == 'ç' || ev.key == 'Ç' || ev.key == '|' || ev.key == '^' || ev.key == '`' || ev.key == '"' || ev.key == ":" || ev.key == '?' || ev.key == '<' || ev.key == '>' || ev.key == '°' || ev.key == 'º' || ev.key == 'ª' || ev.key == '§' || ev.key == '_'){
        return false
    }else{
        return true
    }
}
export function geraPalavra(bean){
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

    if(bean.tamanhoPalavra == 5){
        arrayGeral = arrayCincoLetras
    }else if(bean.tamanhoPalavra == 6){
        arrayGeral = arraySeisLetras
    }else{
        arrayGeral = arraySeteLetras
    }
    for(let i = 0; i<bean.indexGame; i++){
        numeroAleatorio = parseInt(Math.random()*arrayGeral.length)
        if(i == 0){
            bean.palavraTermo = arrayGeral[numeroAleatorio].toUpperCase()
            bean.palavraTermo = bean.palavraTermo.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        }else if(i == 1){
            bean.palavraDueto = arrayGeral[numeroAleatorio].toUpperCase()
            bean.palavraDueto = bean.palavraDueto.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        }else if(i == 2){
            bean.palavraTerceto = arrayGeral[numeroAleatorio].toUpperCase()
            bean.palavraTerceto = bean.palavraTerceto.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        }else if(i == 3){
            bean.palavraQuarteto = arrayGeral[numeroAleatorio].toUpperCase()
            bean.palavraQuarteto = bean.palavraQuarteto.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        }
    }
    console.log(bean.palavraTermo + ' ' + bean.palavraDueto + ' ' + bean.palavraTerceto + ' ' + bean.palavraQuarteto)
}