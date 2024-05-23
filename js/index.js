document.addEventListener('DOMContentLoaded', function() {
    modoRua = this.querySelector("#modoRua")
    iconeMR = this.querySelector('#modo')
    overlay = this.querySelector('#overlay')
    textoMR = this.querySelector('#texto_MR')

    mRStatus = localStorage.getItem('modoRuaStatus')
    if(mRStatus==null){
        localStorage.setItem('modoRuaStatus',false)
    }



    if (mRStatus){
        modoRua.querySelector('img').src = '../assets/Modo RuaAtivo.svg'

    }

    modoRua.addEventListener('click', function(e) {

        // Mudar variável de controle do Modo Rua
        mRStatus = !mRStatus
        
        localStorage.setItem('modoRuaStatus',mRStatus)
        // Mudar imagem do icone do Modo Rua
        
        if (mRStatus){
            modoRua.querySelector('img').src = '../assets/Modo RuaAtivo.svg';
            iconeMR.src = '../assets/iconeInativo.svg';
            textoMR.innerHTML = "Modo rua Inativado"
            overlay.classList.add('active');
            setTimeout(() => {
                overlay.classList.remove('active');
            }, 1000);
            
    
        } else {
            modoRua.querySelector('img').src = '../assets/modo-Rua-Inativo.svg'
            iconeMR.src = '../assets/iconeAtivo.svg'
            textoMR.innerHTML = "Modo rua ativado"
            overlay.classList.add('active');
            setTimeout(() => {
                overlay.classList.remove('active');
            }, 1000);
            
            

        }
        e.stopPropagation()
        
        console.log('a')
    })

    drawer = this.querySelector('#drawer')
    drawer.addEventListener('click',function(){
        drawer.classList.toggle('active')
    })


    if (modoRua){
        iconeMR.src = '../assets/iconeAtivo.svg'
    } else{
        iconeMR.src = '../assets/iconeInativo.svg';
    }



    mapa = this.querySelector('#mapa')
    features = this.querySelector('#mapaFeatures')
    
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

    console.log(pins)

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