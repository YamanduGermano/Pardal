document.addEventListener('DOMContentLoaded', function() {
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
    
    pins = JSON.parse(localStorage.getItem('pins'))
    pinIDs = JSON.parse(localStorage.getItem('pinIDs'))
    
    function addPin() {
        pin = document.createElement('img')
        pin.src = '../assets/Policia.svg'
        pin.classList.add('pin')
        return (pin)
    }

    function deletePin(pin) {
        features.removeChild(pin.target)
        delete pins[pin.target.id]
        pin.stopPropagation()
        localStorage.setItem('pins',JSON.stringify(pins))
    }


    if (pins==null){
        pins = {}
    } else{
        Object.values(pins).forEach(p => {
            pin = addPin()
            // Posição do Pin
            pin.style.left = p[0]+'px'
            pin.style.top = p[1]+'px'

            // ID único do Pin
            pin.id = p[3]

            pin.addEventListener('click',(p)=>{deletePin(p)})
            features.appendChild(pin)
        });
    }
    if (pinIDs==null){pinIDs=0}


    mapa.addEventListener('click',(e)=>{
        console.log('click')
        pin = addPin()

        // Posição do Pin
        pin.style.left= (e.layerX-e.target.scrollLeft)+'px'
        pin.style.top=(e.layerY-e.target.scrollTop)+'px'

        // ID único do Pin
        pin.id = pinIDs
        pinIDs++

        // Adicionar Pin na lista de Pins
        pins[pin.id] = [e.layerX,e.layerY,pin.src,pin.id]
        
        features.appendChild(pin)

        pin.addEventListener('click',(p)=>{deletePin(p)})
        
        // Atualizar a lista local de Pins
        localStorage.setItem('pins',JSON.stringify(pins))
        localStorage.setItem('pinIDs',JSON.stringify(pinIDs))

        e.stopPropagation()
    })
})