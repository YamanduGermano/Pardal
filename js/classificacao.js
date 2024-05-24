document.addEventListener('DOMContentLoaded', function() {
    isMobile = false
    window.addEventListener('touchstart',(e)=>{isMobile=true})
    estrelas = document.querySelectorAll('.estrela')
    classificar = document.querySelector('#botao_classificacao')
    

    
    // Seleciona as 5 estrelas e atribui uma variavel "estrela" para cada 
    estrelas.forEach(function(estrela){
        estrela.addEventListener('click', function(event){
            estrela.classList.add('rotate');

            setTimeout(function() {
                // Troca a imagem
                if (estrela.src.endsWith('estrela-vazia.svg')) {
                    estrela.src = 'assets/estrela-cheia.svg';
                } else {
                    estrela.src = 'assets/estrela-vazia.svg';
                }

                setTimeout(function() {
                    estrela.classList.remove('rotate');
                }, 50); 
                
            }, 200); 
        })


        
    })

    mapa = document.querySelector('#mapa')
    features = document.querySelector('#mapaFeatures')
    console.log(mapa)
    pagina_atual = window.location.pathname.split("/").pop();

    
    pins = JSON.parse(localStorage.getItem('pins'))
    pinIDs = JSON.parse(localStorage.getItem('pinIDs'))

    function loadPins() {
        Object.values(pins).forEach(pinData => {
            var pin = document.createElement('img');
            pin.src = pinData.src;
            pin.classList.add('pin');
            pin.style.left = pinData.left;
            pin.style.top = pinData.top;
            pin.id = pinData.id;
            pin.addEventListener('click', deletePin);
            features.appendChild(pin);
        });
    }

    if (pins == null){pins = {}}
    else{loadPins()}

    if (pinIDs == null) {
        pinIDs = 0
    }


    function addPin() {
        switch (pagina_atual) {
            case "classificacao.html":
                pin = document.createElement('img')
                pin.src = "./assets/estrela-vazia.svg";
                break;
            case "manutencao.html":
                pin = document.createElement('img')
                pin.src  = "./assets/Manutencao.svg";
                break;
            case "solicitar_policiamento.html":
                pin = document.createElement('img')
                pin.src  = "./assets/Policia.svg";
                break;
            default:
                pin = document.createElement('img')
                pin.src  = "./assets/Iluminacao.svg";
                
                break;
        }
        
        pin.classList.add('pin')
        return (pin)
    }
    
    function deletePin(event) {
        var pin = event.target;
        var pinID = pin.id;
        features.removeChild(pin);
        delete pins[pinID];
        localStorage.setItem('pins', JSON.stringify(pins));
        event.stopPropagation();
    }
    
    debug = this.querySelector('#debug')
    mapa.addEventListener('click', (e) => {
        console.log(e)
        var pin = addPin();

        // Posição do Pin
        pin.style.left = (e.layerX + e.target.scrollLeft) + 'px';
        pin.style.top = (e.layerY + e.target.scrollTop) + 'px';

        if (isMobile){
            pin.style.left = (e.offsetX) + 'px';
            pin.style.top = (e.offsetY) + 'px';
        }
        // ID único do Pin
        pin.id = pinIDs++;
        
        // Adicionar Pin na lista de Pins
        pins[pin.id] = {
            src: pin.src,
            left: pin.style.left,
            top: pin.style.top,
            id: pin.id
        };

        features.appendChild(pin);
        pin.addEventListener('click', deletePin);

        // Atualizar a lista local de Pins
        localStorage.setItem('pins', JSON.stringify(pins));
        localStorage.setItem('pinIDs', JSON.stringify(pinIDs));

        e.stopPropagation();
        debug.innerHTML = e.offsetY
        console.log(e.layerY,e.target.scrollTop)
    });
    
    coords = this.querySelector('#coords')
    mapa.addEventListener('scroll', (e)=>{

        coords.innerHTML = `${Math.floor(e.target.scrollLeft)} , ${Math.floor(e.target.scrollTop)}`
    })
})