document.addEventListener('DOMContentLoaded', function() {
    modoRua = this.querySelector("#modoRua")
    iconeMR = this.querySelector('#modo')
    overlay = this.querySelector('#overlay')

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
        console.log(mRStatus)
        localStorage.setItem('modoRuaStatus',mRStatus)
        // Mudar imagem do icone do Modo Rua
        overlay.classList.toggle('active')
        if (mRStatus){
            modoRua.querySelector('img').src = '../assets/Modo RuaAtivo.svg'
            iconeMR.src = '../assets/iconeInativo.svg'
        } else {
            modoRua.querySelector('img').src = '../assets/Modo Rua.svg'
            iconeMR.src = '../assets/iconeAtivo.svg'
        }
        e.stopPropagation()
        setTimeout(overlay.classList.toggle('active'),1000)
        console.log('a')
    })

    drawer = this.querySelector('#drawer')
    drawer.addEventListener('click',function(){
        drawer.classList.toggle('active')
    })


    if (modoRua){
        iconeMR.src = '../assets/iconeAtivo.svg'
    } else{
        iconeMR.src = '../assets/iconeInativo.svg'
    }
})