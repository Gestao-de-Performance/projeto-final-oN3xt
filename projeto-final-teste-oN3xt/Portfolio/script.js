
const formulario = document.getElementById('formulario');
const nome = document.getElementById('nome');
const telefone = document.getElementById('telefone');
const email = document.getElementById('email');
const mensagem = document.getElementById('mensagem');


formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    if (validacao()) {
        alert('Formulário enviado com sucesso!');
        formulario.reset();

        removerClassesSucesso();
    }
});

function removerClassesSucesso() {
    const grupos = document.querySelectorAll('.grupo-form');
    grupos.forEach(grupo => grupo.classList.remove('sucesso'));
}

function validacao() {
    let valido = true;

    const valorNome = nome.value.trim();
    const valorTelefone = telefone.value.trim();
    const valorEmail = email.value.trim();
    const valorMensagem = mensagem.value.trim();

    if (valorNome === '') {
        setError(nome, 'O nome é obrigatório');
        valido = false;
    } else {
        setSucesso(nome);
    }
    if (valorTelefone === '') {
        setError(telefone, 'O telefone é obrigatório');
        valido = false;
    } else {
        setSucesso(telefone);
    }
    if (valorEmail === '') {
        setError(email, 'O e-mail é obrigatório');
        valido = false;
    } else if (emailValido(valorEmail)){
        setSucesso(email);
    } else {
        setError(email, 'Forneça um e-mail válido');
        valido = false;
    }
    if (valorMensagem === '') {
        setError(mensagem, 'A mensagem é obrigatória');
        valido = false;
    } else {
        setSucesso(mensagem);
    }

    return valido;
}

function setError(input, mensagem){
    const itemFormulario = input.parentElement;
    const mensagemErro = itemFormulario.querySelector('.mensagemErro');

    mensagemErro.innerText = mensagem;
    itemFormulario.classList.add('erro');
    itemFormulario.classList.remove('sucesso');
}

function setSucesso(input){
    const itemFormulario = input.parentElement;

    itemFormulario.classList.add('sucesso');
    itemFormulario.classList.remove('erro');

    const mensagemErro = itemFormulario.querySelector('.mensagemErro');
    mensagemErro.innerText = '';
}

function emailValido(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
        themeToggleBtn.textContent = '☀️';
    } else {
        themeToggleBtn.textContent = '🌙';
    }
});

// ------------- CARROSSEL -------------

const track = document.querySelector('.projetos-caixa');
const btnAnterior = document.querySelector('.carrossel-btn.prev');
const btnProximo = document.querySelector('.carrossel-btn.next');
const cards = document.querySelectorAll('.projetos-card');

let currentIndex = 0;

function attCarrossel() {
    const cardLargura = cards[0].offsetWidth; // Largura de um cartão
    const gap = 20; // O gap que foi definido no CSS (20px)
    
    // Calculo para ver o quanto sera movido para a esquerda
    // valor atual * (largura do card + o espaço entre eles)
    const moverValor = currentIndex * (cardLargura + gap);
    
    track.style.transform = `translateX(-${moverValor}px)`;
}

btnProximo.addEventListener('click', () => {
    // Aqui é verificado quantos cards cabem na tela para não rolar pro vazio
    // Se a largura da janela for maior que 768px, é mostrado 3 cards, senão apenas 1 card
    const cardsPerView = window.innerWidth > 768 ? 3 : 1;
    
    // Impede de passar do último card
    if (currentIndex < cards.length - cardsPerView) {
        currentIndex++;
        attCarrossel();
    } else {
        // Voltar ao inicio ao clicar no final
        currentIndex = 0;
        attCarrossel();
    }
});

btnAnterior.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        attCarrossel();
    }
});

// Ajusta o tamanho na tela (redimensiona)
window.addEventListener('resize', attCarrossel);

