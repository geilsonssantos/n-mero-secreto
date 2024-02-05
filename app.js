let listaDeNumerosSorteados = [];
let numeroLimite = 1000;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
let tentativasMaximas = 15;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2});
    
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`);
}

exibirMensagemInicial();


function verificarChute() {
    let chute = document.querySelector('input').value;
    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
    let palavraChancesMaxima = tentativasMaximas > 2 || tentativasMaximas == 1 ? "chances" : "chance";

    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}! Restam apenas ${tentativasMaximas - 1} ${palavraChancesMaxima} para o final do jogo.`;
    let mensagemUltimaTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}! Você acertou na ultima tentativa`;
    let mensagemTentativasMaxima = `Restam apenas ${tentativasMaximas - 1} ${palavraChancesMaxima} para o final do jogo.`;
    

    if(chute == "" || chute <= 0 || chute >= 1001){
        exibirTextoNaTela("h1", "Erro!");
        exibirTextoNaTela("p", `Por favor digite um número entre ${chuteS} e ${numeroLimite}.`);
        limparCampo();
    }else{
        exibirMensagemInicial();

            if (chute == numeroSecreto){
                document.getElementById("reiniciar").removeAttribute("disabled");
                document.getElementById("chute").setAttribute("disabled", true);
                if(tentativasMaximas == 1){

                    exibirTextoNaTela("h1", "Acertou!");
                    exibirTextoNaTela("p", mensagemUltimaTentativa);
                }else{
                    exibirTextoNaTela("h1", "Acertou!");
                    exibirTextoNaTela("p", mensagemTentativas);
                }
                
            }else{

                exibirTextoNaTela("h1","Você errou, tente novamente.")
                if (chute > numeroSecreto){
                    exibirTextoNaTela("p", `O número secreto é menor do que ${chute}. <br> ${mensagemTentativasMaxima} `);
                }else{
                    exibirTextoNaTela("p", `O número secreto é maior do que ${chute}. <br> ${mensagemTentativasMaxima} `);
                }
                
                tentativas++;

                tentativasMaximas--;               
                limparCampo();

                if (tentativasMaximas == 0) {
                    exibirTextoNaTela("h1","Fim de jogo.");
                    exibirTextoNaTela("p","Suas tentativas acabaram.")                
                    document.getElementById("reiniciar").removeAttribute("disabled");
                    document.getElementById("chute").setAttribute("disabled", true);
                  }
                
            }
    }
};

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
};

function limparCampo(){
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    tentativasMaximas = 15;
    exibirMensagemInicial();
    document.getElementById("chute").removeAttribute("disabled");
    document.getElementById("reiniciar").setAttribute("disabled", true);
}
