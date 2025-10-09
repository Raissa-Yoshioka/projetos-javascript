const canvas = document.getElementById("canvasJogo");
const contexto = canvas.getContext("2d");

// Configurações principais do jogo
const LARGURA_TELA = canvas.width;
const ALTURA_TELA = canvas.height;
const LARGURA_CANO = 70;

// Variáveis relacionadas ao pássaro
let gravity = 0.25;
let movimentoPassaro = 0;
let passaroY = ALTURA_TELA / 2;
let passaroX = 100;

// Configurações para o funcionamento do jogo
let jogoAtivo = false;
let pontuacao = 0;
let velocidadeCanos = 2; // Velocidade de movimento dos canos
let limitePont = 5; // Pontuação limite para aumentar a dificuldade
let pontuacaoMaxima = parseInt(localStorage.getItem("pontuacaoMaximaFlappyBird") || "0", 10);

let listaCanos = [];

// Carregando as imagens para o jogo
const imgFundo = new Image();
imgFundo.src = "images/fundo.png";

const imgPassaro = new Image();
imgPassaro.src = "images/passaro.png";

const imgCano = new Image();
imgCano.src = "images/cano.png";

const btnComecar = document.getElementById("btnComecar");
const titulo = document.getElementById("titulo");

// Função responsável por inicializar o jogo
function iniciarJogo() {

    // Ativa o estado de jogo
    jogoAtivo = true;
    
    // Limpa a lista de canos
    listaCanos = [];

    // Define as configurações do pássaro
    passaroY = ALTURA_TELA / 2;
    movimentoPassaro = 0;
    pontuacao = 0;
    gravity = 0.25;

    velocidadeCanos = 2;
    limitePont = 5;

    // Oculta o botão de Começar e o título para evitar aparecer durante o jogo
    titulo.style.display = "none";
    btnComecar.style.display = "none";

    // Inicia o loop de jogo
    loopJogo();
}

// Função responsável para desenhar o fundo do jogo
function desenharFundo() {

    // Desenha a imagem de fundo no canvas
    contexto.drawImage(imgFundo, 0, 0, LARGURA_TELA, ALTURA_TELA);

}

// Função responsável por desenhar o pássaro
function desenharPassaro() {

    // Desenha a imagem do pássaro no canvas, com `34` e `24`
    //   representando a largura e altura do pássaro, respectivamente
    contexto.drawImage(imgPassaro, passaroX, passaroY, 34, 24);

}

// Função responsável por criar novos canos no jogo
function criarCano() {

    // Calcula o tamanho do espaço entre os canos de modo aleatório
    const tamanhoGap = Math.floor(Math.random() * 50) + 100;

    // Calcula a posição vertical do espaço de forma aleatória
    const posicaoGap = Math.floor(Math.random() * (ALTURA_TELA - tamanhoGap - 100)) + 50;

    // Adiciona um novo par de canos na lista de canos
    listaCanos.push({ x: LARGURA_TELA, y: posicaoGap, gap: tamanhoGap });

}

// Função responsável por desenhar os Cano no canvas
function desenharCanos() {

    // Percorre cada elemento da lista de canos
    listaCanos.forEach(cano => {

        // Salva o estado atual do contexto para evitar conflitos
        contexto.save();

        // Rotaciona o cano para desenhar o cano superior no canvas
        contexto.translate(cano.x + LARGURA_CANO / 2, cano.y - imgCano.height / 2);
        contexto.rotate(Math.PI);
        contexto.drawImage(imgCano, -LARGURA_CANO / 2, -imgCano.height / 2 - 34, LARGURA_CANO, imgCano.height);

        // Restaura o estado do contexto para evitar interferências nos outros desenhos
        contexto.restore();

        // Desenha o cano inferior
        contexto.drawImage(imgCano, cano.x, cano.y + cano.gap - 12, LARGURA_CANO, imgCano.height);

    });

}

// Função responsável por mover os canos no jogo
function moverCanos() {

    // Itera sobre cada cano na lista de canos
    listaCanos.forEach(cano => {

        // Move o cano para a esquerda
        cano.x -= velocidadeCanos;
    });

    // Remove os canos que saíram completamente da tela
    listaCanos = listaCanos.filter(cano => cano.x > -LARGURA_CANO);

}

// Função responsável por verificar colisões com canos e bordas
function verificarColisoes() {

    // Itera sobre cada cano na lista de canos
    for (let cano of listaCanos) {

        // Verifica se o pássaro colidiu com o cano superior ou inferior
        if (
            // Condição que verifica se o pássaro está fora do espaço livre entre os canos
            (passaroY < cano.y || passaroY > cano.y + cano.gap) &&

            // Verifica se o pássaro está na posição horizontal do cano
            (passaroX + 28 > cano.x && passaroX < cano.x + LARGURA_CANO)
        ) {

            // Caso ocorra a colisão, finaliza o jogo
            jogoAtivo = false;

            // Exibe novamente o botão 'Começar'
            btnComecar.style.display = "block";

            atualizarPontuacaoMaxima();

            return;
        }

    }

    // Verifica se o pássaro colidiu com o topo ou o fundo do canvas
    if (passaroY <= 0 || passaroY >= ALTURA_TELA - 15) {

        // Caso haja a colisão, finaliza o jogo
        jogoAtivo = false;

        // Exibe o botão de 'Começar' novamente
        btnComecar.style.display = "block";

        atualizarPontuacaoMaxima();
    }

}

// Função responsável por exibir a pontuação atual e a pontuação máxima já alcançada
function exibirPontuacao() {

    // Definições do texto a ser apresentado
    contexto.fillStyle = "#ffffff"
    contexto.font = "20px Arial";

    // Exibe a pontuação atual no canto superior esquerdo do canvas
    contexto.fillText(`Pontuação: ${Math.floor(pontuacao)}`, 10, 30);

    // Exibe a pontuação máxima já alcançada no canto superior direito da tela
    contexto.fillText(`Recorde: ${pontuacaoMaxima}`, LARGURA_TELA - 150, 30); 

}

// Função responsável por atualizar a pontuação máxima
function atualizarPontuacaoMaxima() {

    // Verifica se a pontuação atual é maior que a pontuação máxima já registrada
    if (pontuacao > pontuacaoMaxima) {
        pontuacaoMaxima = Math.floor(pontuacao);
        localStorage.setItem("pontuacaoMaximaFlappyBird", pontuacaoMaxima);
    }

}

// Função responsável por controlar o loop do jogo
function loopJogo() {

    // Verifica se o jogo está ativo
    if (!jogoAtivo) return;

    // Limpa o canvas para evitar desenhos sobrepostos
    contexto.clearRect(0, 0, LARGURA_TELA, ALTURA_TELA);

    // Chama as funções para desenhar o jogo
    desenharFundo();
    desenharPassaro();
    desenharCanos();

    // Atualiza as posições do pássaro
    movimentoPassaro += gravity; // Aumenta o movimento vertical pela gravidade
    passaroY += movimentoPassaro; // Atualiza a posição vertical do pássaro

    moverCanos();
    verificarColisoes();

    // Atualiza a pontuação ao longo do tempo
    pontuacao += 0.0065;
    exibirPontuacao();

    // Aumenta a dificuldade do jogo conforme a pontuação cresce
    if (pontuacao >= limitePont) {
        
        // Incrementa gradualmente algumas variáveis para o funcionamento do jogo
        velocidadeCanos += 0.05;
        gravity += 0.005;
        limitePont += 5;

    }

    // Gera novos canos se não há canos ou se o último cano está a uma distância o suficiente para criar outro
    if (listaCanos.length === 0 || listaCanos[listaCanos.length - 1].x < LARGURA_TELA - 300) {
        criarCano();
    }

    // Reexecuta o loop para continuar a animação do jogo
    requestAnimationFrame(loopJogo);

}

// Configurações de controle do jogo
document.addEventListener("keydown", (event) => {

    // Verifica se a tecla pressionada foi a barra de espaço e se o jogo está ativo
    //  Outro modo de verificar se a tecla pressionada foi a barra de espaço é com 'evento.code ===  "Space"'
    if (event.key === " " && jogoAtivo) {
        movimentoPassaro = -6;
    }

});

// Configura o evento de clique para o botão 'Começar'
document.getElementById("btnComecar").addEventListener("click", iniciarJogo);
