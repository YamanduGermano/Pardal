document.addEventListener('DOMContentLoaded', function() {
    modoRua = this.querySelector("#modoRua")

    mRStatus = localStorage.getItem('modoRuaStatus')
    if(mRStatus==null){
        localStorage.setItem('modoRuaStatus',false)
    }

    if (mRStatus){
        modoRua.querySelector('img').src = '../assets/Modo RuaAtivo.svg'

    }

    modoRua.addEventListener('click', function(e) {
        mRStatus = !mRStatus
        console.log(mRStatus)
        localStorage.setItem('modoRuaStatus',mRStatus)
        if (mRStatus){
            modoRua.querySelector('img').src = '../assets/Modo RuaAtivo.svg'
        } else {
            modoRua.querySelector('img').src = '../assets/Modo Rua.svg'
        }
        e.stopPropagation()
    })

    drawer = this.querySelector('#drawer')
    drawer.addEventListener('click',function(){
        drawer.classList.toggle('active')
    })
})