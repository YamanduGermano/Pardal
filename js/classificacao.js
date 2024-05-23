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
})