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
        iconeMR.src = '../assets/iconeInativo.svg'
    }




    
})