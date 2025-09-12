const canvas = document.getElementById('tetris');
const contexto = canvas.getContext('2d');

const tamanhoBloco = 30;
const linhas = 20;
const colunas = 10;
const tabuleiro = [];

// Variáveis que armazenam a pecaAtual no tabuleiro e sua respectiva cor
let pecaAtual;
let corAtual;

let intervalo;
let pontuacao = 0;
let pecaX, pecaY;

// Variável que determina se o jogo terminou
let gameOver = false;

const pecas = [
    {shape: [[1, 1, 1, 1]], name: "I"}, // Peça em formato de linha
    {shape: [[1, 1], [1, 1]], name: "O"}, // Peça em formato de quadrado
    {shape: [[0, 1, 0], [1, 1, 1]], name: "T"}, // Peça em formato de 'T'
    {shape: [[1, 1, 0], [0, 1, 1]], name: "S"}, // Peça em formato de 'S'
    {shape: [[0, 1, 1], [1, 1, 0]], name: "Z"}, // Peça em formato de 'Z'
    {shape: [[1, 1, 1], [1, 0, 0]], name: "L"}, // Peça em formato de 'L'
    {shape: [[1, 1, 1], [0, 0, 1]], name: "J"} // Peça em formato de 'J'
];

// Lista com as cores das peças que entram no tabuleiro
const cores = ['blue', '#e21717ff', '#752caeff', '#3fb92dff', 'pink', 'peru', '#3bc2cbff'];

// Função que inializa o tabuleiro do jogo
function inicializarTabuleiro() {

    // Loop que percorre cada linha do tabuleiro
    for (let linha = 0; linha < linhas; linha++) {

        // Cria uma nova linha no array tabuleiro
        tabuleiro[linha] = [];

        // Loop que percorre cada coluna da linha atual do tabuleiro
        for (let coluna = 0; coluna < colunas; coluna++) {
            // Inicializa cada célula da linha atual
            tabuleiro[linha][coluna] = 0;
        }
    }
}

// Função que desenha um bloco
function desenharBloco(x, y, cor) {

    contexto.fillStyle = cor;

    // Desenha um retângulo preenchido no canvas
    contexto.fillRect(x * tamanhoBloco, y * tamanhoBloco, tamanhoBloco, tamanhoBloco);
    
    // Define e desenha a borda do bloco no canvas
    contexto.strokeStyle = 'black';
    contexto.strokeRect(x * tamanhoBloco, y * tamanhoBloco, tamanhoBloco, tamanhoBloco);
}

// Função que desenha o tabuleiro
function desenharTabuleiro() {

    // Loop que percorre cada linha do tabuleiro
    for (let linha = 0; linha < linhas; linha++) {
        // Loop que percorre cada coluna da linha
        for (let coluna = 0; coluna < colunas; coluna++) {
            // Condição que verifica se há um bloco na célula atual
            if (tabuleiro[linha][coluna]) {
                desenharBloco(coluna, linha, tabuleiro[linha][coluna]);
            }
        }
    }

}

// Função que gera uma nova peça aleatória
function gerarNovaPeca() {
    // Gera um índice aleatório dentro dos limites da lista de peças
    const indice = Math.floor(Math.random() * pecas.length);
    return pecas[indice].shape;
}

// Função que define a cor da nova peça
function definirCor() {
    const indice = Math.floor(Math.random() * cores.length);
    return cores[indice];
}

// Função que desenha a nova peça no tabuleiro
function desenharPeca() {

    // Condição para garantir que nenhuma peça seja desenhada quando o jogo acabar
    if (!gameOver) {
        // Loop que percorre cada linha da peça atual
        for (let linha = 0; linha < pecaAtual.length; linha++) {

            // Loop que percorre cada coluna da linha atual
            for (let coluna = 0; coluna < pecaAtual[linha].length; coluna++) {
                // Condição que verifica se há um bloco na célula atual
                if (pecaAtual[linha][coluna]) {
                    desenharBloco(coluna + pecaX, linha + pecaY, corAtual);
                }
            }
        }
    }
    

}

// Função que move a peça para baixo
function moverPecaBaixo() {

    // Verifica se a peça colide com outra peça ou com o fundo do tabuleiro
    if (verificarColisao(0,1)) {
        
        fixarPeca();
        pecaAtual = gerarNovaPeca();
        corAtual = definirCor();
        
        // Calcula a posição inicial da nova peça e centraliza no meio do tabuleiro
        pecaX = Math.floor(colunas / 2) - Math.floor(pecaAtual[0].length / 2);
        pecaY = 0;

        // Verifica se a nova peça colide com peças existentes na posição inicial
        if (verificarFimDeJogo()) {
            gameOver = true;
            alert("Fim de Jogo!");
        }

    } else {
        // Se não houver colisão, move a peça para baixo
        pecaY++;
    }

}

// Função que verifica se o jogo deve terminar
function verificarFimDeJogo() {

    for (let coluna = 0; coluna < colunas; coluna++) {
        // Verifica se o topo do tabuleiro está cheio e retorna o fim do jogo
        if (tabuleiro[0][coluna]) {
            return true;
        }
    }

    return false;
}

// Função que limpa uma linha ao ser completada
function limparLinhasCompletas() {
    let linhasEliminadas = 0;

    // Loop que começa na parte inferior do tabuleiro
    for (let linha = linhas - 1; linha >= 0; linha--) {
        // Verifica se todos os blocos da linha estão preenchidos
        if (tabuleiro[linha].every(bloco => bloco)) {
            // Remove a linha preenchida do tabuleiro
            tabuleiro.splice(linha, 1);

            // Insere uma nova linha vazia no topo do tabuleiro
            tabuleiro.unshift(Array(colunas).fill(0));
            
            // Incrementa o contador e incrementa 'linha' para verificar novamente
            linhasEliminadas++;
            linha++;
        }
    }

    pontuacao += linhasEliminadas;
    document.getElementById('pontValor').textContent = pontuacao;
}

// Função para desenhar o jogo
function desenhar() {

    // Limpa o canvas, removendo qualquer desenho anterior
    contexto.clearRect(0, 0, canvas.width, canvas.height);

    desenharTabuleiro();
    desenharPeca();
}

// Função responsável por manter o jogo no loop
function loopJogo() {

    // Verifica se o jogo não acabou e continua o loop após 500 milissegundos
    if (!gameOver) {
        moverPecaBaixo();
        desenhar();
        intervalo = setTimeout(loopJogo, 500);
    }
}

// Inicializa a área que mostrar as peças disponíveis no jogo
function inicializarPecasDisponiveis() {

    // Obtém o elemento HTML onde será apresentado as peças
    const pecasDiv = document.getElementById('pecas');

    // Percorre o array das peças
    pecas.forEach((peca, indice) => {
        // Cria um elemento no HTML para representar cada peça disponível
        const pecaDiv = document.createElement('div');
        
        // Adiciona a classe ao elemento e adiciona seus atributos
        pecaDiv.classList.add('peca');
        pecaDiv.dataset.indice = indice;
        pecaDiv.dataset.shape = pecas[indice].name;

        // Percorre cada linha na forma da peça
        peca.shape.forEach(linha => {
            // Percorre cada bloco da linha da peça
            linha.forEach(bloco => {
                // Cria um novo elemento para cada bloco da peça e preenche a cor do bloco para formar a peça
                const blocoDiv = document.createElement('div');
                blocoDiv.style.backgroundColor = bloco ? '#270092ff' : 'white';
                pecaDiv.appendChild(blocoDiv);
            });
        });

        // Adiciona o <div> da peça ao elemento que contém as peças disponíveis
        pecasDiv.appendChild(pecaDiv);
        
    });
}

// Função que verifica se ocorreu uma colisão da peça com o tabuleiro
function verificarColisao(deslocX, deslocY) {

    // Percorre as linhas da peça atual
    for (let linha = 0; linha < pecaAtual.length; linha++) {
        
        // Percorre cada coluna da linha
        for (let coluna = 0; coluna < pecaAtual[linha].length; coluna++) {
            // Verifica o bloco da peça
            if (pecaAtual[linha][coluna]) {
                // Calcula a nova posição da célula
                const novoX = coluna + pecaX + deslocX;
                const novoY = linha + pecaY + deslocY;

                // Verifica se anova posicao está fora dos limites do tabuleiro ou se
                //  a posição já está ocupada
                if (novoX < 0 || novoX >= colunas || novoY >= linhas || tabuleiro[novoY][novoX]) {
                    return true;
                }
            }
        }

    }

    return false;
}

// Função responsável por fixar a peça no tabuleiro
function fixarPeca() {

    for (let linha = 0; linha < pecaAtual.length; linha++) {
        for (let coluna = 0; coluna < pecaAtual[linha].length; coluna++) {
            // Verifica se há um bloco na célula atual da peça
            if (pecaAtual[linha][coluna]) {
                // Calcula a posição no tabuleiro onde o bloco da peça atual será fixado
                //  Atribuindo a cor atual a peça fixada
                tabuleiro[linha + pecaY][coluna + pecaX] = corAtual;
            }
        }
    }

    // Após fixar a peça no tabuleiro, chama a função para verificar se há alguma linha completa e limpá-la
    limparLinhasCompletas();
}

// Função responsável por rotacionar a peça atual
function rotacionarPeca() {
    const novaPeca = [];

    for (let coluna = 0; coluna < pecaAtual[0].length; coluna++) {
        const novaLinha = [];
        for (let linha = pecaAtual.length - 1; linha >= 0; linha--) {
            // Adiciona o valor da célula atual da peça original à nova linha da peça rotacionada
            novaLinha.push(pecaAtual[linha][coluna]);
        }
        // Adiciona a nova linha à peça rotacionada
        novaPeca.push(novaLinha);
    }

    // É verificado se a peça rotacionada colide com algo no tabuleiro
    if (!verificarColisao(0, 0, novaPeca)) {
        pecaAtual = novaPeca;
    }
}

// Adiciona um ouvinte de evento para pressionamento de tecla
document.addEventListener('keydown', function(event) {

    // Verifica se a tecla pressionada é a seta para esquerda e se ocorre alguma colisão
    if (event.key === 'ArrowLeft' && !verificarColisao(-1, 0)) {
        // Move a peça uma posição à esquerda
        pecaX--;

    } else if (event.key === 'ArrowRight' && !verificarColisao(1, 0)) {
    // Verifica se a tecla pressionada é a seta para direita e se ocorre alguma colisão

        // Move a peça uma posição para a direita
        pecaX++;

    } else if (event.key === 'ArrowDown') {
        // Verifica se a tecla pressionada é a seta para baixo e chama a função que move a peça para baixo
        moverPecaBaixo();

    } else if (event.key === 'ArrowUp') {
        // Verifica se a tecla pressionada é a seta para cima e chama a função de rotacionar a peça
        rotacionarPeca();
    }

    // Após mover ou  rotacionar a peça, redesenha o jogo para atualizar a posição da peça
    desenhar();

});

// Função responsável por reiniciar o jogo
function reiniciarJogo() {
    window.location.reload();
}

inicializarTabuleiro();

// Inicializa a pontuação como 0 e atualiza a exibição
pontuacao = 0;
document.getElementById('pontValor').textContent = pontuacao;

// Gera uma nova peça e cor aleatórias
pecaAtual = gerarNovaPeca();
corAtual = definirCor();

// Calcula e define a posição inicial da peça no tabuleiro nas dimensões x e y
// Centralizando a peça na linha do topo do tabuleiro
pecaX = Math.floor(colunas / 2) - Math.floor(pecaAtual[0].length / 2);
pecaY = 0;

// Inicializa a área onde as peças disponíveis no jogo são apresentadas
inicializarPecasDisponiveis();

// Inicia o loop do jogo
loopJogo();