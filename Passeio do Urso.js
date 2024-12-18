// ignora as anotações pfvrzinho
const urso = document.getElementById("urso");
let posicaoHorizontal = window.innerWidth / 2 - 50; // a posição horizontal do urso vai ser determinada pela largura da janela divida por dois - 50 (metade do urso, que tem 100px), centralizando o urso
let posicaoVertical = parseInt(window.getComputedStyle(urso).bottom, 10); // a posição vertical do urso vai puxar do css e o dez é o sistema númerico convertido pedido pela função
let passo = 0; // troca as imagens
let olhandoParaDireita = true; // no início a primeira imagem vai ser olhando para direita

const imagensUrso = ["urso-1.png", "urso-2.png", "urso-3.png"];

urso.style.left = `${posicaoHorizontal}px`; // puxa a posição horizontal do urso e mexe no css para colocar ele lá

function irparaesquerda() {
    olhandoParaDireita = false;
    posicaoHorizontal -= 5;
    if (posicaoHorizontal < 0) { // se ele sair da tela vai ficar negativo a posição horizontal então se a posição for menor que 0
        posicaoHorizontal = window.innerWidth / 2 - 50; // faz o urso voltar para o meio se o urso sair para a esquerda
    }
    atualizarUrso();
}

function irparadireita() {
    olhandoParaDireita = true;
    posicaoHorizontal += 5;
    if (posicaoHorizontal > window.innerWidth - 100) { // 100 (px) é a largura do urso então se a posição horizontal for maior que a largura da tela + a largura do urso 
        posicaoHorizontal = window.innerWidth / 2 - 50; // faz o urso voltar para o meio se o urso sair para a direita
    }
    atualizarUrso();
}

function atualizarUrso() {
    urso.src = imagensUrso[passo];
    urso.style.left = `${posicaoHorizontal}px`;

    if (olhandoParaDireita) {
        urso.classList.remove("vira-a-imagem"); // remove o flip para direita
    } else {
        urso.classList.add("vira-a-imagem"); // adiciona o flip para esquerda
    }

    passo = (passo + 1) % imagensUrso.length;
}

function pular() {
    const alturaPulo = 100; // altura do pulo
    const tempoPulo = 600; // tempo total do pulo em ms

    urso.style.transition = `bottom ${tempoPulo / 2}ms`; // como a vida não é só programação, hora de deixar bonitinho, quando que o urso pular vai ter uma transiçãozinha dele subindo no pulo
    urso.style.bottom = `${posicaoVertical + alturaPulo}px`; // modifica na prática a posição do urso

    setTimeout(() => {
        urso.style.bottom = `${posicaoVertical}px`;
    }, tempoPulo / 2); // o movimento dele descer com um atraso para garantir que ele pulou até o final 
}

function moverUrso(event) {
    if (event.key === 'd' || event.key === 'ArrowRight') {
        irparadireita();
    } else if (event.key === 'a' || event.key === 'ArrowLeft') {
        irparaesquerda();
    } else if (event.key === 'w' || event.key === 'ArrowUp') {
        pular();
    }
}

window.addEventListener('keydown', moverUrso);
