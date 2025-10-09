// Aguarda até que toda a página seja carregada para executar o código
window.addEventListener('load', function() {

    const canvas = document.getElementById('gameCanvas');
    const contexto = canvas.getContext('2d');

    // Define as dimensões do canvas
    const LARGURA = canvas.width;
    const ALTURA = canvas.height;

    // Define o tamanho de cada bloco no labirinto
    const TAMANHO_BLOCO = 16;

    // Define as cores usadas no jogo
    const PRETO = '#000000';
    const AZUL = '#1010e6ff';
    const AMARELO = '#f0f020ff';
    const BRANCO = '#ffffff';
    const VERMELHO = '#ed0808ff';
    const ROSA = '#f873d0ff';
    const CIANO = '#09ebefff';
    const VERDE = '#6de86fff';;
    const LARANJA = '#f67b00ff';
    const AZUL_CLARO = '#039effff';

    // Define os labirintos do jogo
    const labirintos = [
        // Fase 1: Estrutura do labirinto
        [
            "XXXXXXXXXXXXXXXXXXXXXXXXXXXX", // "X" representa uma parede sólida.
            "X............XX............X", // "." representa pontos que podem ser comidos pelo jogador.
            "X.XXXX.XXXXX.XX.XXXXX.XXXX.X", // "o" representa pastilhas especiais que ativam o poder.
            "XoXXXX.XXXXX.XX.XXXXX.XXXX.X", // "--" indica um caminho conectado.
            "X.XXXX.XXXXX.XX.XXXXX.XXXX.X", // "@@" representa a área de spawn dos fantasmas.
            "X............XX............X", 
            "X.XXXX.XX.XXXXXXXX.XX.XXXX.X", 
            "X.XXXX.XX.XXXXXXXX.XX.XXXX.X",
            "X......XX....XX....XX......X", 
            "XXXXXX.XXXXX.XX.XXXXX.XXXXXX", 
            "     X.XXXXX.XX.XXXXX.X     ", 
            "     X.XX..........XX.X     ", 
            "     X.XX.XXX--XXX.XX.X     ", 
            "XXXXXX.XX.Xo    oX.XX.XXXXXX", 
            "      ....X  oo  X....      ",
            "XXXXXX.XX.Xo    oX.XX.XXXXXX",
            "     X.XX.XXX--XXX.XX.X     ",
            "     X.XX..........XX.X     ",
            "     X.XX.XXXXXXXX.XX.X     ", 
            "XXXXXX.XX.XXXXXXXX.XX.XXXXXX", 
            "X............XX............X",
            "X.XXXX.XXXXX.XX.XXXXX.XXXX.X",
            "X.XXXX.XXXXX.XX.XXXXX.XXXX.X",
            "X...XX................XX...X", 
            "XXX.XX.XX.XXXXXXXX.XX.XX.XXX",
            "XXX.XX.XX.XXXXXXXX.XX.XX.XXX",
            "X......XX....XX....XX......X",
            "X.XXXXXXXXXX.XX.XXXXXXXXXX.X", 
            "X.XXXXXXXXXX.XX.XXXXXXXXXXoX",
            "X............@@............X", 
            "XXXXXXXXXXXXXXXXXXXXXXXXXXXX"
        ],

        // Fase 2: Estrutura semelhante, mas com variações
        [
            "XXXXXXXXXXXXXXXXXXXXXXXXXXXX", 
            "X............XX............X",
            "XoXXXX.XXXXX.XX.XXXXX.XXXX.X",
            "X.XXXX.XXXXX.XX.XXXXX.XXXX.X",
            "X.XXXX................XXXX.X", 
            "X.........X.XXXX.X.........X",
            "X.XXXX.XX.XXXXXXXX.XX.XXXX.X",
            "X......XX....XX....XX......X",
            "     X.XXXXX.XX.XXXXX.X     ",
            "     X.XXXXX.XX.XXXXX.X     ",
            "XXXXXX.XX..........XX.XXXXXX",
            "XXXXXX.XX.XXX--XXX.XX.XXXXXX",
            "XXXXXX.XX.X      X.XX.XXXXXX",
            "      ....Xo     X....      ",
            "XXXXXX.XX.X     oX.XX.XXXXXX",
            "XXXXXX.XX.XXX--XXX.XX.XXXXXX",
            "     X.XX..........XX.X     ",
            "X....X.XX.XXXXXXXX.XX.X....X",
            "X.XX.X.XX.XXXXXXXX.XX.X.XX.X",
            "X.XX....................XX.X", 
            "X.XXXX.XXXXX.XX.XXXXX.XXXX.X",
            "X.XXXX.XXXXX.XX.XXXXX.XXXX.X",
            "X.X......................X.X",
            "X...XX................XX...X",
            "XXX.XX.XX.XXXXXXXX.XX.XX.XXX",
            "XXX.XX.XX.XXXXXXXX.XX.XX.XXX",
            "X......XX....XX....XX......X",
            "X.XXXXXXXXXX.XX.XXXXXXXXXX.X",
            "X.XXXXXXXXXX.XX.XXXXXXXXXX.X",
            "X............@@.......o....X",
            "XXXXXXXXXXXXXXXXXXXXXXXXXXXX"
        ],
        
        // Fase 3: Outra variação
        [
            "XXXXXXXXXXXXXXXXXXXXXXXXXXXX", 
            "X............XX............X",
            "X.XXXX.XXXXX.XX.XXXXX.XXXX.X",
            "X.XXXX.......o........XXXX.X", 
            "X.XXXX.XXXXX.XX.XXXXX.XXXX.X",
            "X............XX............X",
            "X.XXXX.XX.XXXXXXXX.XX.XXXX.X",
            "X......XX....XX....XX......X",
            "XXXXXX.XXXXX.XX.XXXXX.XXXXXX",
            "     X.XXXXX.XX.XXXXX.X     ",
            "      .XX..........XX.      ",
            "     X.XX.XXX--XXX.XX.X     ",
            "XXXXXX.XX.X      X.XX.XXXXXX",
            "      ....X   o  X....      ",
            "XXXXXX.XX.X      X.XX.XXXXXX",
            "     X.XX.XXX--XXX.XX.X     ",
            "     X.XX..........XX.X     ",
            "X....X.XX.XXXXXXXX.XX.X....X",
            "X.XX.X.XX.XXXXXXXX.XX.X.XX.X",
            "X.XX....................XX.X",
            "X.XXXX.XXXXX.XX.XXXXX.XXXX.X",
            "X.XXXX.XXXXX.XX.XXXXX.XXXX.X",
            "X.XXXX................XXXX.X",
            "X...XX................XX...X",
            "XXX.XX.XX.XXXXXXXX.XX.XX.XXX",
            "XXX.XX.XX.XXXXXXXX.XX.XX.XXX",
            "X......XX....XX....XX......X",
            "X.XXXXXXXXXX.XX.XXXXXXXXXXoX",
            "X.XXXXXXXXXX.XX.XXXXXXXXXX.X",
            "X............@@............X",
            "XXXXXXXXXXXXXXXXXXXXXXXXXXXX"
        ]
    ];

    // Variável que acumula os pontos acumulados ao longo das fases 
    let pontuacaoTotal = 0;
    
    // Variáveis que contém as paredes e os pontos do labirinto da fase atual
    let paredes = [];
    let pontos = [];

    // Variáveis de controle para o funcionamento do jogo
    let pastilhasPoder = [];
    let fantasmas = [];
    let jogador;
    let vidas;
    let faseAtual;
    let pontuacao;
    
    // Variável que indica se o jogo está pausado ou não
    let pausado;
    
    // Variável que armazena o layout do labirinto na fase atual
    let labirinto;
    
    // Armazena as posições iniciais dos fantasmas
    let fantasmas_posicao_inicial = [];

    // Variável que controla o tempo do poder especial
    let tempoRestante = 0;

    // Variável que indica se o poder especial está ativo
    let poderAtivo = false;

    // Variável utilizada para parar/controlar o loop de animação do jogo
    let animationFrameId;

    // Define a classe do Pac-Man
    class Jogador {

        constructor (x, y) {
            this.posicao = [x, y];
            this.direcao = [0, 0];
            this.dirDesejada = [0, 0];
            this.velocidade = 2;

            // Define a área retangular ocupada pelo jogador
            this.retangulo = {
                // Ajustando para ficar centralizado
                x: x + 1,
                y: y + 1,
                // Define largura e altura menor que o bloco
                width: TAMANHO_BLOCO - 2,
                height: TAMANHO_BLOCO - 2
            };
        }

        // Função que verifica se ocorre uma colisão quando o jogador quiser se mover
        mover(paredes) {

            // Verifica se o jogador quer mudar de direção
            if (this.dirDesejada[0] !== this.direcao[0] || this.dirDesejada[1] !== this.direcao[1]) {
                
                // Calcula a nova posição do jogador
                let newPosicao = [
                    this.posicao[0] + this.dirDesejada[0] * this.velocidade,
                    this.posicao[1] + this.dirDesejada[1] * this.velocidade
                ];

                // Cria um novo retângulo na nova posição
                let newRetangulo = {
                    x: newPosicao[0] + 1,
                    y: newPosicao[1] + 1,
                    width: TAMANHO_BLOCO - 2,
                    height: TAMANHO_BLOCO - 2
                };

                // Verifica se ocorre uma colisão e, se não houver uma, atualiza a direção
                if (!this.verificarColisao(newRetangulo, paredes)) {
                    this.direcao = [...this.dirDesejada];
                }
            }
            
            /*------------------------------------*/

            // Caso o jogador não queira mudar de direção, permanece em frente

            // Calcula a nova posição
            let newPosicaoAtual = [
                this.posicao[0] + this.direcao[0] * this.velocidade,
                this.posicao[1] + this.direcao[1] * this.velocidade
            ];

            // Ajusta o jogador no novo retângulo
            let newRetanguloAtual = {
                x: newPosicaoAtual[0] + 1,
                y: newPosicaoAtual[1] + 1,
                width: TAMANHO_BLOCO - 2,
                height: TAMANHO_BLOCO - 2
            }
            
            // Verifica se não ocorre uma colisão com a nova posição e atualiza a posição do jogador
            if (!this.verificarColisao(newRetanguloAtual, paredes)) {
                
                this.posicao = [...newPosicaoAtual];
                this.retangulo = newRetanguloAtual;

            } else {

                // Se o jogador colidir, a função 'alinhar' é chamada para reposicionar o jogador
                this.alinhar();
            }

            /*------------------------------------*/

            /* Lógica de teletransporte quando o jogador atravessa os limites laterais do labirinto */
            
            // Verifica se o jogador saiu pelo lado esquerdo e ele reaparece na borda direita
            if (this.posicao[0] < -TAMANHO_BLOCO) {
                
                this.posicao[0] = LARGURA;

            } else if (this.posicao[0] > LARGURA) {

                // Se o jogador sair pelo lado direito da tela, reaparece na borde esquerda
                this.posicao[0] = -TAMANHO_BLOCO;
            }

            // Atualiza as coordenadas do retângulo do jogador
            this.retangulo.x = this.posicao[0] + 1;
            this.retangulo.y = this.posicao[1] + 1;

            /*------------------------------------*/
        }

        // Função que verifica se houve ou não uma colisão nas paredes do labirinto
        verificarColisao(retangulo, paredes) {

            // Itera sobre todas as paredes do labirinto
            for (let p of paredes) {
                if (colisaoRetangulos(retangulo, p)) {
                    return true;
                }
            }

            return false;
        }

        // Função que ajusta a posição do jogador
        alinhar() {

            // Ajusta a posição do jogador para o centro do bloco mais próximo
            this.posicao[0] = Math.round(this.posicao[0] / TAMANHO_BLOCO) * TAMANHO_BLOCO;
            this.posicao[1] = Math.round(this.posicao[1] / TAMANHO_BLOCO) * TAMANHO_BLOCO;

            // Atualiza a posição do retângulo
            this.retangulo.x = this.posicao[0] + 1;
            this.retangulo.y = this.posicao[1] + 1;
        }

        // Função responsável por desenhar o jogador (Pac-Man)
        desenhar(contexto) {

            contexto.fillStyle = AMARELO;

            // Inicia o processo de desenho da forma
            contexto.beginPath();
            contexto.arc(
                this.posicao[0] + TAMANHO_BLOCO / 2, // Define o centro do círculo
                this.posicao[1] + TAMANHO_BLOCO / 2, // Define o centro do círculo
                TAMANHO_BLOCO / 2,                   // Define o raio do círculo
                0,                                   // Começa a desenhar o arco a partir de 0 radianos (início do círculo).
                2 * Math.PI                          // Termina o arco em 2π radianos (círculo completo).
            );
            // Preenche o círculo com a cor definida
            contexto.fill();
        }

        // Função responsável por verificar a coleta de pontos
        coletarPontos(pontos) {

            // Itera sobre o array de pontos do último para o primeiro, evitando problemas ao remover elementos
            for (let i = pontos.length - 1; i >= 0; i--) {
                
                let ponto = pontos[i];

                // Verifica se o retângulo do jogador colide com o retângulo do ponto atual
                if (colisaoRetangulos(this.retangulo, ponto.retangulo)) {
                    
                    // Se houve colisão, remove o ponto do array de pontos, incrementa a pontuação total e retorna 1
                    pontos.splice(i, 1);
                    pontuacaoTotal++;
                    return 1;

                }
            }

            // Se nenhum ponto foi coletado, retorna 0
            return 0;
        }

        // Função responsável por verificar se o jogador coletou alguma pastilha de poder
        coletarPastilhasPoder(pastilhasPoder) {

            // Itera o array de pastilhas de poder do último para o primeiro
            for (let i = pastilhasPoder.length - 1; i >= 0; i--) {

                let pastilha = pastilhasPoder[i];

                // Verifica se o retângulo do jogador colidiu com o retângulo da pastilha de poder
                if (colisaoRetangulos(this.retangulo, pastilha.retangulo)) {
                    
                    // Remove a pastilha do array, adiciona 50 pontos ao jogador e ativa o poder
                    pastilhasPoder.splice(i, 1);
                    pontuacaoTotal += 50;
                    ativarPoder();
                    return 50;
                }
            }

            // Se nenhuma pastilha de poder foi coletada retorna 0
            return 0;
        }
    }

    // Define a classe para os Pontos
    class Ponto {

        constructor(x, y) {

            // Define a posição do ponto no labirinto
            this.posicao = [x, y];

            // Define o retângulo dos pontos para auxiliar na verificação de colisões
            this.retangulo = {
                x: x + TAMANHO_BLOCO / 2 - 2,
                y: y + TAMANHO_BLOCO / 2 - 2,
                width: 4,
                height: 4
            };
        }

        // Função responsável por desenhar cada ponto
        desenhar(contexto) {

            contexto.fillStyle = BRANCO;

            contexto.beginPath();
            contexto.arc(
                this.posicao[0] + TAMANHO_BLOCO / 2, // Coordenada X do centro do círculo.
                this.posicao[1] + TAMANHO_BLOCO / 2, // Coordenada Y do centro do círculo.
                2,                                   // Raio do círculo.
                0,                                   // Início do arco (0 radianos, início do círculo).
                2 * Math.PI                          // Fim do arco (2π radianos, círculo completo).
            );

            contexto.fill();
        }
    }

    // Define a classe para as pastilhas de poder
    class PastilhaPoder {

        constructor(x, y) {

            this.posicao = [x, y];
            
            this.retangulo = {
                x: x + TAMANHO_BLOCO / 2 - 4,
                y: y + TAMANHO_BLOCO / 2 - 4,
                width: 8,
                height: 8
            };
        }

        // Função responsável por desenhar a pastilha de poder
        desenhar(contexto) {
            
            contexto.fillStyle = VERDE;
            contexto.beginPath();
            contexto.arc(
                this.posicao[0] + TAMANHO_BLOCO / 2,
                this.posicao[1] + TAMANHO_BLOCO / 2,
                4,
                0,
                2 * Math.PI
            );
            contexto.fill();
        }
    }

    // Define a classe dos fantasmas
    class Fantasma {

        constructor(x, y, cor) {

            // Define a posição, direção e velocidade inicial do fantasma
            this.posicao = [x, y];
            this.direcao = this.escolherDirecaoAleatoria();
            this.velocidade = 2;

            // Define o retângulo do fantasma, que auxilia na detecção de colisões
            this.retangulo = {
                x: x + 1,
                y: y + 1,
                width: TAMANHO_BLOCO - 2,
                height: TAMANHO_BLOCO - 2
            };

            this.corOriginal = cor; // Cor utilizada no estado normal do fantasma
            this.cor = cor;         // Cor utilizada quando o fantasma está assustado

            // Define o estado inicial do fantasma, que pode ser 'normal' ou 'assustado'
            this.estado = 'normal';
        }

        // Função responsável por selecionar uma direção aleatória do fantasma
        escolherDirecaoAleatoria() {

            // Define uma lista de possíveis direções que o fantasma pode seguir
            const direcoes = [
                [1,0],      // Direita
                [-1, 0],    // Esquerda
                [0, 1],     // Para baixo
                [0, -1]     // Para cima
            ];

            // Retorna uma direção aleatória da lista de direções
            return direcoes[Math.floor(Math.random() * direcoes.length)];
        }

        // Função responsável por mover o fantasma
        mover(paredes) {
            
            // Variável que armazena a nova posição do fantasma
            let newPosicao;

            // Verifica qual o estado do fantasma e define a direção
            if (this.estado === 'assustado') {
                
                this.direcao = this.escolherDirecaoFuga();

            } else {

                if (Math.random() < 0.02) {
                    this.direcao = this.escolherDirecaoAleatoria();
                }
            }

            // Calcula a nova posição do fantasma
            newPosicao = [
                this.posicao[0] + this.direcao[0] * this.velocidade,
                this.posicao[1] + this.direcao[1] * this.velocidade
            ];

            // Define um novo retângulo para representar a área ocupada pelo fantasma
            let newRetangulo = {
                x: newPosicao[0] + 1,
                y: newPosicao[1] + 1,
                width: TAMANHO_BLOCO - 2,
                height: TAMANHO_BLOCO - 2
            };

            // Verifica se há uma colisão
            if (!this.verificarColisao(newRetangulo, paredes)) {
                
                // Se não há colisão, atualiza a posição e o retângulo do fantasma
                this.posicao = [...newPosicao];
                this.retangulo = newRetangulo;

            } else {

                // Se houver colisão, escolhe outra direção aleatória
                this.direcao = this.escolherDirecaoAleatoria();
            }

            /*---------------------------------*/
            
            // Lógica de teletransporte, verificando se o fantasma atravessou as bordas horizontais do labirinto
            
            if (this.posicao[0] < -TAMANHO_BLOCO) {
            
                // Se o fantasma atingir o lado esquerdo, reposiciona no lado direito
                this.posicao[0] = LARGURA;
            
            } else if (this.posicao[0] > LARGURA) {

                // Se o fantasma atingir o lado direito, reposiciona no lado esquerdo
                this.posicao[0] = -TAMANHO_BLOCO;
            }

            // Atualiza as coordenadas do retângulo do fantasma
            this.retangulo.x = this.posicao[0] + 1;
            this.retangulo.y = this.posicao[1] + 1;
        }

        // Função que calcula a direção de fuga do fantasma
        escolherDirecaoFuga() {

            // Lista de todas as direções possíveis
            const direcoes = [
                [1, 0],     // Direita
                [-1, 0],    // Esquerda
                [0, 1],     // Para baixo
                [0, -1]     // Para cima
            ];

            // Inicializa a variável da distância máxima com o menor valor possível
            let maxDistancia = -Infinity;

            // Define a direção atual do fantasma
            let melhorDirecao = this.direcao;

            // Itera por cada direção na lista de direções
            for (let direcao of direcoes) {

                // Calcula a nova posição do fantasma
                let newPosicao = [
                    this.posicao[0] + direcao[0] * this.velocidade,
                    this.posicao[1] + direcao[1] * this.velocidade
                ];

                // Inicia um novo retângulo para a nova posição do fantasma
                let newRetangulo = {
                    x: newPosicao[0] + 1,
                    y: newPosicao[1] + 1,
                    width: TAMANHO_BLOCO - 2,
                    height: TAMANHO_BLOCO - 2
                };

                // Verifica se há uma colisão na nova posição
                if (!this.verificarColisao(newRetangulo, paredes)) {

                    let distancia = distanciaEntrePontos(newPosicao, jogador.posicao);

                    // Verifica se a distância calculada é maior que a anterior registrada
                    if (distancia > maxDistancia) {
                        maxDistancia = distancia;
                        melhorDirecao = direcao;
                    }
                }
            }

            return melhorDirecao;
        }

        // Função que verifica se há uma colisão
        verificarColisao(retangulo, paredes) {

            // Itera sobre todas as paredes no array para verificar colisões
            for (let p of paredes) {

                if (colisaoRetangulos(retangulo, p)) {
                    return true;
                }
            }

            return false;
        }

        // Função que desenha o fantasma
        desenhar(contexto) {
            
            contexto.fillStyle = this.cor;
            contexto.fillRect(
                this.retangulo.x,
                this.retangulo.y,
                this.retangulo.width,
                this.retangulo.height
            );
        }
    }

    // Função para verificar se dois retângulos colidem entre si
    function colisaoRetangulos(r1, r2) {
        
        // Retorna 'true' se há colisão, caso contrário, retorna 'false
        return !(
            // Verifica se o lado esquerdo de 'r2' colide com a direita de 'r1'
            r2.x > r1.x + r1.width ||

            // Verifica se o lado direito de 'r2' colide com a esquerda de 'r1
            r2.x + r2.width < r1.x ||

            // Verifica se o lado superior de 'r2' colide com o lado inferior de 'r1'
            r2.y > r1.y + r1.height ||

            // Verifica se o lado inferior de 'r2' colide com o lado superior de 'r1'
            r2.y + r2.height < r1.y
        );
    }

    // Função para calcular a distância entre dois pontos
    function distanciaEntrePontos(p1, p2) {


        // Calcula a diferença entre as coordenadas
        let dx = p1[0] - p2[0];
        let dy = p1[1] - p2[1];

        // Retorna a distância entre os pontos usando o Teorema de Pitágoras
        //  A distância é a raiz quadrada da soma dos quadrados das diferenças (dx² + dy²)
        return Math.sqrt(dx*dx + dy*dy);
    }

    // Função para resetar as posições do jogador e dos fantasmas no estado inicial
    function resetarPosicoes() {

        // Reinicia as configurações do jogador
        jogador.posicao = [14 * TAMANHO_BLOCO, 23 * TAMANHO_BLOCO]; 
        jogador.direcao = [0, 0];
        jogador.dirDesejada = [0, 0];
        jogador.retangulo.x = jogador.posicao[0] + 1;
        jogador.retangulo.y = jogador.posicao[1] + 1;

        // Reinicia as posições e estados de todos os fantasmas
        for (let idx = 0; idx < fantasmas.length; idx++) {
            
            let fantasma = fantasmas[idx];
            let posInicial = fantasmas_posicao_inicial[idx];
            fantasma.posicao = [posInicial[0], posInicial[1]]; 
            fantasma.direcao = fantasma.escolherDirecaoAleatoria();
            fantasma.retangulo.x = fantasma.posicao[0] + 1;
            fantasma.retangulo.y = fantasma.posicao[1] + 1;
            fantasma.estado = 'normal';
            fantasma.cor = fantasma.corOriginal;

        }

        poderAtivo = false;
        tempoRestante = 0;
    }

    // Função responsável por ativar o poder no jogador ao coletar uma pastilha de poder
    function ativarPoder() {

        poderAtivo = true;
        tempoRestante = 10;

        // Itera sobre os fantasmas no labirinto para alterar seus estados e aparência
        for (let f of fantasmas) {
            f.estado = 'assustado';
            f.cor = AZUL_CLARO;
        }
    }

    // Função que atualiza o estado do poder especial
    function atualizarPoder(time) {

        // Verifica se o poder está ativo
        if (poderAtivo) {

            // Reduz o tempo do poder
            tempoRestante -= time;

            if (tempoRestante <= 0) {
                poderAtivo = false;

                // Itera sobre todos os fantasmas para voltar ao estado normal
                for (let f of fantasmas) {
                    f.estado = 'normal';
                    f.cor = f.corOriginal;
                }
            }
        }
    }

    // Função para exibir mensagens na tela
    function mostrarMensagem(mensagem, fimDeJogo) {
        
        // Pausa o jogo
        pausado = true;

        if (animationFrameId) {
            // Cancela o próximo quadro de animação
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }

        // Exibe a mensagem no centro da tela
        alert(mensagem);

        // Verifica se é fim de jogo
        if (fimDeJogo) {
            
            // Exibe a pontuação total
            alert(`Pontuação Total: ${pontuacaoTotal + pontuacao}`);

            // Após 5 segundos, exibe o menu principal
            setTimeout(() => {
                mostrarMenu();
            }, 1000);

        } else {
            // Se não for  fim de jogo, retoma o jogo após 2 segundo
            setTimeout(() => {
                pausado = false;

                // Reinicia o tempo para evitar inconsistência
                tempo = performance.now();
                animationFrameId = requestAnimationFrame(gameLoop);
            }, 1000);
        }
    }

    // Função para salvar a pontuação do jogador
    function salvarPontuacao(pontuacao) {
        let pontuacoes = JSON.parse(localStorage.getItem('pontuacaoPacMan')) || [];
        pontuacoes.push(pontuacao);
        localStorage.setItem('pontuacaoPacMan', JSON.stringify(pontuacoes));
    }

    // Função para carregar a soma acumulada de todas as pontuações salvas no localStorage
    function carregarPontuacaoAcumulada() {
        let pontuacoes = JSON.parse(localStorage.getItem('pontuacaoPacMan')) || [];
        let total = pontuacoes.reduce((a, b) => a + b, 0);
        return total;
    }

    // Função para exibir o menu principal do jogo
    function mostrarMenu() {

        // Prrenche o fundo do canvas de preto
        contexto.fillStyle = PRETO;
        contexto.fillRect(0, 0, LARGURA, ALTURA);

        // Configura o estilo de título do menu
        contexto.fillStyle = AMARELO;
        contexto.font = '48px Algerian';
        contexto.textAlign = 'center';
        contexto.fillText('Pac-Man', LARGURA / 2, ALTURA / 2 - 50);

        // Configura o estilo do sub-título e instruções
        contexto.fillStyle = BRANCO;
        contexto.font = '24px Arial';
        contexto.fillText('Pressione ESPAÇO para jogar', LARGURA / 2, ALTURA / 2); 

        // Configura e exibe a pontuação acumulada
        let pontuacao_acumulada = carregarPontuacaoAcumulada(); 
        contexto.fillStyle = VERDE;
        contexto.fillText(`Pontuação Acumulada: ${pontuacao_acumulada}`, LARGURA / 2, ALTURA / 2 + 50); 

        // Adiciona um evento de teclado para iniciar o jogo ao pressionar a tecla 'ESPAÇO'
        document.addEventListener('keydown', iniciarAoPressionarEspaco); 
    }

    // Função chamada quando uma tecla é pressionada no menu principal
    function iniciarAoPressionarEspaco(e) {

        // Verifica se a tecla pressionada é a barra de espaço
        if (e.code === 'Space') {
            // Remove o evento para evitar múltiplos disparos caso pressione espaço várias vezes
            document.removeEventListener('keydown', iniciarAoPressionarEspaco);
            iniciarJogo();
        }
    }

    // Função que inicia o jogo
    function iniciarJogo() {

        // Definições iniciais
        faseAtual = 0;
        pontuacaoTotal = 0;
        vidas = 5;

        // Chama a função responsável por configurar a fase do jogo
        iniciarFase();
    }

    // Função para iniciar uma nova fase do jogo
    function iniciarFase() {

        // Verifica se existe um loop de animação e o cancela
        if (animationFrameId) {
            // Cancela o próximo quadro de animação e reseta o identificador do loop de animação
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }

        // Inicializa as configurações necessárias para a fase
        paredes = [];
        pontos = [];
        pastilhasPoder = [];
        fantasmas = [];
        pontuacao = 0;
        pausado = false;
        poderAtivo = false;
        tempoRestante = 0;
        
        // Configurações do labirinto
        labirinto = labirintos[faseAtual];
        const LINHAS = labirinto.length;
        const COLUNAS = labirinto[0].length;

        // Configurações do jogador
        let jogador_posicao_inicial = [14 * TAMANHO_BLOCO, 23 * TAMANHO_BLOCO];
        jogador = new Jogador(jogador_posicao_inicial[0], jogador_posicao_inicial[1]);

        // Itera sobre cada linha do labirinto
        for (let linha = 0; linha < LINHAS; linha++) {

            // Itera sobre cada coluna da linha atuaç
            for (let coluna = 0; coluna < COLUNAS; coluna++) {
                
                let bloco = labirinto[linha][coluna];

                // Calcula a posição do bloco
                let x = coluna * TAMANHO_BLOCO;
                let y = linha * TAMANHO_BLOCO;

                // Verifica se o bloco representa uma parede
                if (bloco === 'X') {

                    // Cria um objeto representando a parede
                    let parede = {
                        x: x,
                        y: y,
                        width: TAMANHO_BLOCO,
                        height: TAMANHO_BLOCO
                    };

                    paredes.push(parede);

                // Verifica se o bloco é um ponto a ser coletado
                } else if (bloco === '.') {
                    
                    // Cria um novo ponto na posição calculada
                    let ponto = new Ponto(x, y);
                    pontos.push(ponto);

                // Verifica se o bloco é uma pastilha de poder
                } else if (bloco === 'o') {

                    // Cria uma nova pastilha de poder na posição calculada
                    let pastilha = new PastilhaPoder(x, y);
                    pastilhasPoder.push(pastilha);

                // Verifica se o bloco atual representa a entrada dos fantasmas
                } else if (bloco === '@') {

                    // Cria um novo fantasma na posição
                    let fantasma = new Fantasma(x, y, VERMELHO);
                    fantasmas.push(fantasma);
                    fantasmas_posicao_inicial.push([x, y]);

                }
            }
        }

        // Calcula o número de fantasmas extras em cada fase
        let numeroExtraFantasmas = faseAtual * 2;

        // Define as configurações dos fantasmas
        let coresFantasmas = [VERMELHO, ROSA, CIANO, LARANJA];
        let posicoesFantasmas = [
            [14 * TAMANHO_BLOCO, 14 * TAMANHO_BLOCO], // Posição central inicial.
            [14 * TAMANHO_BLOCO, 15 * TAMANHO_BLOCO], // Posição logo abaixo da inicial.
            [13 * TAMANHO_BLOCO, 14 * TAMANHO_BLOCO], // Posição à esquerda da inicial.
            [15 * TAMANHO_BLOCO, 14 * TAMANHO_BLOCO]  // Posição à direita da inicial.
        ];

        // Adiciona os fantasmas extras ao jogo
        for (let i = 0; i < numeroExtraFantasmas; i++) {
            
            // Determina a posição inicial do fantasma e a cor
            let pos = posicoesFantasmas[i % posicoesFantasmas.length];
            let cor = coresFantasmas[i % coresFantasmas.length];

            // Cria uma nova instância de um fantasma e adiciona ao array 'fantasmas'
            let fantasma = new Fantasma(pos[0], pos[1], cor);
            fantasmas.push(fantasma);

            // Armazena a posição inicial do fantasma
            fantasmas_posicao_inicial.push([pos[0], pos[1]]);

        }

        // Adiciona um evento de ouvinte que monitora se alguma tecla é clicada
        document.addEventListener('keydown', controlarJogador);

        // Inicia o loop principal do jogo
        tempo = performance.now();
        animationFrameId = requestAnimationFrame(gameLoop);
    }

    // Função responsável por controlar o jogador
    function controlarJogador(e) {

        // Verifica se a tecla pressionada é a seta para a esquerda
        if (e.code === 'ArrowLeft') {

            // Define a direção desejada do jogador
            jogador.dirDesejada = [-1, 0];

        } else if (e.code === 'ArrowRight') {

            // Verifica se a tecla pressionada é a seta para a direita e define a direção desejada
            jogador.dirDesejada = [1, 0];

        } else if (e.code === 'ArrowUp') {

            // Verifica se a tecla pressionada é a tecla para cima e define a direção desejada
            jogador.dirDesejada = [0, -1];

        } else if (e.code === 'ArrowDown') {

            // Verifica se a tecla pressionada é a tecla para baixo e define a direção desejada
            jogador.dirDesejada = [0, 1];
            
        }
    }

    // Função responsável por remover o controle do jogador
    function removerControleJogador() {

        // Remove o evento de ouvinte para impedir que o jogador continue movendo após certas ações
        document.removeEventListener('keydown', controlarJogador);

    }

    // Variável que armazena o último tempo registrado no loop de animação
    let tempo = 0;

    // Função principal do loop do jogo
    function gameLoop(tempoAtual) {

        // Verifica se o jogo está pausado e sai da função
        if (!pausado) {
            // Calcula o tempo decorrido desde o último quadro de animação
            let time = (tempoAtual - tempo) / 1000;
            tempo = tempoAtual;

            // Atualiza o estado de jogo
            atualizar(time);
            
            // Desenha os elementos na tela e solicita o próximo quadro de animação
            desenhar();
            animationFrameId = requestAnimationFrame(gameLoop);
        }

        return;
    }

    // Função responsável por atualizar o estado do jogo
    function atualizar(time) {

        // Configurando o jogo
        jogador.mover(paredes);
        pontuacao += jogador.coletarPontos(pontos);
        pontuacao += jogador.coletarPastilhasPoder(pastilhasPoder);
        atualizarPoder(time);

        for (let f of fantasmas) {

            // Move o fantasma
            f.mover(paredes, time);
    
            // Verifica se há colisão
            if (colisaoRetangulos(f.retangulo, jogador.retangulo)) {

                // Verifica o estado do fantasma
                if (f.estado === 'assustado') {

                    // Atualiza a posição
                    f.posicao = [...fantasmas_posicao_inicial[fantasmas.indexOf(f)]];

                    // Atualiza o retângulo do fantasma
                    f.retangulo.x = f.posicao[0] + 1;
                    f.retangulo.y = f.posicao[1] + 1;

                    // Atualiza a pontuação
                    pontuacaoTotal += 200;

                } else {

                    vidas -= 1;

                    if (vidas > 0) {

                        resetarPosicoes();
                        mostrarMensagem(`Você perdeu uma vida! Vidas restantes: ${vidas}`, false);

                    } else {

                        pausado = true;
                        removerControleJogador();
                        mostrarMensagem('Você perdeu todas as vidas! Fim de Jogo!', true);
                        salvarPontuacao(pontuacaoTotal + pontuacao);

                    }

                    // Sai do loop
                    break;
                }
            }
        }

        // Verifica se todos os pontos e pastilhas de poder foram coletados pelo jogador
        if (pontos.length === 0 && pastilhasPoder.length === 0) {

            // Atualiza a pontuação e fase
            pontuacaoTotal += pontuacao;
            faseAtual += 1;

            if (faseAtual < labirintos.length) {
                
                // Exibe uma mensagem
                mostrarMensagem("Fase Concluída!", false);

                // Aguarda 2 segundos antes de começar a próxima fase
                setTimeout(() => {
                    iniciarFase();
                }, 1000);

            } else {

                // Se não houver mais fases, o jogo é finalizado e remove o controle do jogador
                pausado = true;
                removerControleJogador();
                
                // Salva a pontuação total acumulada do jogador.
                salvarPontuacao(pontuacaoTotal + pontuacao);

                // Exibe uma mensagem, indicando a vitória.
                mostrarMensagem('Parabéns! Você venceu!', true);

            }
        }
    }

    // Função responsável por desenhar os elementos na tela
    function desenhar() {

        // Define e preenche a cor de fundo do canvas
        contexto.fillStyle = PRETO;
        contexto.fillRect(0, 0, LARGURA, ALTURA);

        // Define e preenche a cor das paredes
        contexto.fillStyle = AZUL;
        for (let p of paredes) {
            contexto.fillRect(p.x, p.y, p.width, p.height);
        }

        // Itera sobre cada ponto do jogo
        for (let ponto of pontos) {
            ponto.desenhar(contexto);
        }

        // Itera sobre cada pastilha de poder no jogo
        for (let pastilha of pastilhasPoder) {
            pastilha.desenhar(contexto);
        }

        // Chama o método para desenhar o jogador
        jogador.desenhar(contexto);

        // Itera sobre cada fantasma no jogo
        for (let f of fantasmas) {
            f.desenhar(contexto);
        }

        // Define as configurações do texto que será exibido na tela
        contexto.fillStyle = BRANCO;
        contexto.font = '16px Arial';
        contexto.textAlign = 'left';
        contexto.fillText(`Vidas: ${vidas}`, LARGURA - 80, 20);

        contexto.fillStyle = VERDE;
        contexto.fillText(`Pontuação: ${pontuacaoTotal + pontuacao}`, 10, 20);

        // Configurações para exibir a fase atual
        contexto.textAlign = 'center';
        contexto.fillText(`Fase: ${faseAtual + 1}`, LARGURA / 2, 20);

        // Verifica se o poder especial está ativo
        if (poderAtivo) {
            contexto.fillStyle = VERDE;
            contexto.font = '16px Arial';
            contexto.textAlign = 'center';
            contexto.fillText(`Poder ativo: ${Math.ceil(tempoRestante)}s`, LARGURA / 2, 40);
        }
    }

    // Inicia o jogo
    mostrarMenu();
});