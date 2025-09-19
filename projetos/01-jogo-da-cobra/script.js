const tela = document.getElementById('jogo');
const contexto = tela.getContext('2d');
const tamanhoCelula = 20;

// Determinando onde a cobra e a fruta aparecerão assim
//  que o jogo abrir
let cabecaCobra = {x: 10, y: 10};
let fruta = {x: 15, y: 15};

// Inicializa a direção da cobra como 0, para que ela não
//  se movimente no início do jogo
let direcaoX = 0;
let direcaoY = 0;

// Inicializa a variável que guarda o valor da pontuação
let pontuacao = 0;

// Define a imagem que será utilizada para a fruta
const imgFruta = new Image();
imgFruta.src = 'fruta.png'

// Array que contém a posição inicial da cobra, que é representada 
//  por uma lista de objetos com coordenadas x e y
const cobra = [{x: 10, y: 10}];

// Função que controla o fluxo principal do jogo
function loopJogo() {
    
    // Função que atualiza o estado do jogo
    atualizar(); 
    
    // Função que limpa a tela e desenha todos os
    //  componentes do jogo novamente
    desenhar(); 

    // Utiliza a função 'setTimeout' para chamar a função 'loopJogo'
    //  após um intervalo de 100 milissegundos, garantindo o ciclo do jogo
    setTimeout(loopJogo, 100);
}

function desenhar() {
    // Limpa o canvas antes de desenhar um novo quadro
    contexto.clearRect(0, 0, tela.width, tela.height);

    // Define o próximo item a ser desenhado, usando a imagem da fruta
    //  declarada anteriormente, determinando o tamanho como o de um bloco do canvas
    contexto.drawImage(imgFruta, fruta.x * tamanhoCelula, fruta.y * tamanhoCelula, tamanhoCelula, tamanhoCelula);

    // Define a cor do próximo item a ser desenhado, no caso a cobra
    contexto.fillStyle = '#1b960eff';

    // Desenha cada segmento da cobra no canvas
    cobra.forEach(celula => {
        contexto.fillRect(celula.x * tamanhoCelula, celula.y * tamanhoCelula, tamanhoCelula, tamanhoCelula);
    });
}

function atualizar() {
    // Atualiza as posições horizontal e vertical da cobra
    cabecaCobra.x += direcaoX;
    cabecaCobra.y += direcaoY;

    // Verifica se a cobra atingiu o limite do canvas terminando o jogo e chamando a função 'reiniciarJogo'
    if (cabecaCobra.x < 0 || cabecaCobra.x >= tela.width / tamanhoCelula ||
        cabecaCobra.y < 0 || cabecaCobra.y >= tela.height / tamanhoCelula) {
        reiniciarJogo();
    }

    // Verifica se a cobra 'comeu' a fruta analisando a coordenada de ambas
    if (cabecaCobra.x === fruta.x && cabecaCobra.y === fruta.y) {
        // Redefinindo a posição da fruta para um ponto aleatório dentro do canvas
        fruta.x = Math.floor(Math.random() * (tela.width / tamanhoCelula));
        fruta.y = Math.floor(Math.random() * (tela.height / tamanhoCelula));

        // Cria uma nova célula para a cobra, já que ela 'comeu' a fruta
        const novaCelula = {x: cobra[cobra.length- 1].x, y: cobra[cobra.length - 1].y};
        cobra.push(novaCelula);
        
        // Aumenta a pontuação do jogador e atualiza a exibição da mesma na tela
        pontuacao++;
        atualizarPontuacao();
    }

    // Percorre a 'lista' da cobra, atualizando cada segmenta para a posição do 
    //  segmento anterior a ele, garantindo que as células sigam a cabeça da cobra
    for (let i = cobra.length - 1; i > 0; i--) {
        cobra[i] = {...cobra[i-1]};
    }

    // Define a cabeca da cobra novamente após terminar o loop do for
    cobra[0] = {...cabecaCobra};

    // Verifica se a cabeça da cobra atingiu alguma célula do 'corpo' da cobra
    //  caso a resposta seja sim, o jogo termina e é preciso reiniciá-lo
    for (let i = 1; i < cobra.length; i++){
        if (cabecaCobra.x === cobra[i].x && cabecaCobra.y === cobra[i].y) {
            reiniciarJogo();
        }
    }
}

function atualizarPontuacao() {
    document.getElementById('pontuacao').textContent = 'Pontuação: ' + pontuacao;
}

function reiniciarJogo() {
    // Redefine as variáveis do jogo, como posições da cobra, fruta e a pontuação
    cabecaCobra = {x: 10, y: 10};
    fruta = {x: 15, y: 15};
    direcaoX= 0;
    direcaoY = 0;
    pontuacao = 0;
    cobra.length = 1;

    // Atualiza a pontuação de volta em zero na exibição
    atualizarPontuacao();

    // Exibe uma mensagem de alerta indicando que o usuário perdeu o jogo
    alert('Você perdeu! Clique em OK para jogar novamente.');
}

// Adiciona um ouvinte de evento para quando uma tecla é pressionada
document.addEventListener('keydown', function(event) {

    // Condições para verificar as teclas pressionadas e verificar a direção atual da
    //  da cobra para impedir que a cobra inverta sua direção instantaneamente
    if (event.key === 'ArrowUp' && direcaoY !== 1) {
        direcaoX = 0; 
        direcaoY = -1; 
    } else if (event.key === 'ArrowDown' && direcaoY !== -1) {
        direcaoX = 0;
        direcaoY = 1; 
    } else if (event.key === 'ArrowLeft' && direcaoX !== 1) {
        direcaoX = -1;
        direcaoY = 0;
    } else if (event.key === 'ArrowRight' && direcaoX !== -1) {
        direcaoX = 1;
        direcaoY = 0;
    }

});

// Chama a função para iniciar o ciclo principal do jogo
loopJogo();