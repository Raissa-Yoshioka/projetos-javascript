const canvas = document.getElementById("canvasJogo");
const contexto = canvas.getContext("2d");

// Define as dimensões do canvas
canvas.width = 900;
canvas.height = 600;

// Define as propriedades da barra do jogo
const barraAltura = 10;
const barraLargura = 100;
let barraX = (canvas.width - barraLargura) / 2; // Posição inicial da barra

// Propriedades da bola
const bolaRaio = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 3; // Velocidade da bola na dimensão x
let dy = -3; // Velocidade da bola na dimensão y

// Propriedades individuais dos blocos
const blocoLinhas = 6;
const blocoColunas = 10;
const blocoAltura = 20;
const blocoLargura = 75;
const espacamentoBloco = 10;
const deslocSuperiorBloco = 30;
const deslocEsquerdaBloco = 30;

let blocos = [];

// Função responsável por criar os blocos
function criarBlocos() {

    // Loop que itera sobre cada coluna de blocos
    for (let i = 0; i < blocoColunas; i++) {

        // Inicializa a coluna atual
        blocos[i] = [];

        // Loop que itera sobre cada linha dentro da coluna
        for (let j = 0; j < blocoLinhas; j++) {
            // Cria um objeto representando um bloco
            blocos[i][j] = { x: 0, y: 0, status: 1 };
        }  
    }
}

// Chama a função para criar os blocos
criarBlocos();

// Cria a variável de pontos e atualiza o elemento HTML respectivo
let pontos = 0;
document.getElementById("pontuacao").innerText = `Pontuação: ${pontos}`;

// Duas variáveis que ajudam a controlar o estado da direção
let direitaPressionada = false;
let esquerdaPressionada = false;

// Adiciona eventos de ouvinte para cada ocasião de movimento do usuário
document.addEventListener("keydown", teclaPressionada);
document.addEventListener("keyup", teclaSolta);
document.addEventListener("mousemove", movimentoMouse);

// Função que é chamada sempre que uma tecla é pressionada
function teclaPressionada(e) {

    if (e.key == "Right" || e.key == "ArrowRight") {
        
        direitaPressionada = true;

    } else if (e.key == "Left" || e.key == "ArrowLeft") {

        esquerdaPressionada = true;

    }
}

// Função que é chamada sempre que um tecla é solta
function teclaSolta(e) {

    if (e.key == "Right" || e.key == "ArrowRight") {

        direitaPressionada = false;

    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        
        esquerdaPressionada = false;

    }
}

// Função que é chamada sempre que há um movimento do mouse
function movimentoMouse(e) {

    // Calcula a posição horizontal relativa do mouse em relação ao canvas
    const relativeX = e.clientX - canvas.offsetLeft;

    // Verifica se a posição calculada está dentro do limite do canvas
    if (relativeX > 0 && relativeX < canvas.width) {

        // Ajusta a posição da barra
        barraX = relativeX - barraLargura / 2;

    }
}

// Função responsável por desenhar a bola do jogo
function desenharBola() {

    contexto.beginPath();
    contexto.arc(x, y, bolaRaio, 0, Math.PI * 2);
    contexto.fillStyle = "#0b90e3ff";
    contexto.fill();
    contexto.closePath();

}

// Função responsável por desenhar a barra
function desenharBarra() {

    contexto.beginPath();
    contexto.rect(barraX, canvas.height - barraAltura, barraLargura, barraAltura);
    contexto.fillStyle = "#0b90e3ff";
    contexto.fill();
    contexto.closePath();

}

// Função responsável por desenhar os blocos
function desenharBlocos() {

    // Define o array de cores usados para os blocos
    const cores = ["#8812ffff", "#b629cfff", "#22dfcfff", "#57ee11ff", "#e9a81dff", "#ee5634ff"];

    // Loop que itera sobre cada coluna do array
    for (let i = 0; i < blocoColunas; i++) {

        // Loop que itera sobre cada linha de blocos na coluna
        for (let j = 0; j < blocoLinhas; j++) {

            // Verifica se o bloco atual está com o status ativo
            if (blocos[i][j].status == 1) {

                // Calcula a posição X e Y do bloco
                const blocoX = i * (blocoLargura + espacamentoBloco) + deslocEsquerdaBloco;
                const blocoY = j * (blocoAltura + espacamentoBloco) + deslocSuperiorBloco;

                // Atualiza as propriedades x e y do objeto do bloco atual
                blocos[i][j].x = blocoX;
                blocos[i][j].y = blocoY;

                // Começa o desenho do bloco
                contexto.beginPath();
                contexto.rect(blocoX, blocoY, blocoLargura, blocoAltura);
                contexto.fillStyle = cores[j % cores.length];
                contexto.fill();
                contexto.closePath();
            }
        }
    }
}

// Função responsável por verificar a colisão entre a bola e os blocos
function verificarColisao() {

    // Loops que percorrem as colunas e linhas de blocos
    for (let i = 0; i < blocoColunas; i++) {

        for (let j = 0; j < blocoLinhas; j++) {

            const blocoAtual = blocos[i][j];

            if (blocoAtual.status === 1) {

                // Verifica se a bola está dentro dos limites do bloco atual
                if (x > blocoAtual.x && x < blocoAtual.x + blocoLargura && y > blocoAtual.y && y < blocoAtual.y + blocoAltura) {

                    // Inverte a direção vertical da bola, muda o status do bloco e incrementa a pontuação
                    dy = -dy;
                    blocoAtual.status = 0;
                    pontos++;

                    // Atualiza o elemento HTML
                    document.getElementById("pontuacao").innerText = `Pontuação: ${pontos}`;

                    // Verifica se todos os blocos estão quebrados para ir para a próxima fase
                    if (todosBlocosQuebrados()) {
                        proximaFase();
                    }
                }
            }
        }
    }
}

// Função responsável por verificar se todos os blocos estão quebrados
function todosBlocosQuebrados() {

    // Loops que iteram pelas colunas e linhas dos blocos
    for (let i = 0; i < blocoColunas; i++) {
        
        for (let j = 0; j < blocoLinhas; j++) {

            // Verifica o status de cada bloco, se algum deles for verdadeiro retorna 'false'
            if (blocos[i][j].status === 1) {
                return false;
            }
        }
    }

    // Retorna true se após todo loop, o status de todos os blocos for falso
    return true;

}

// Função responsável para chamar a próxima fase do jogo
function proximaFase() {

    criarBlocos();

    // Redefine a posição horizontal e vertical da bola
    x = canvas.width / 2;
    y = canvas.height - 30;

    // Aumenta a velocidade horizontal da bola
    dx += 1;
    dy = dy > 0 ? dy + 1 : dy - 1;
    // Aumenta a magnitude da velocidade vertical da bola dependendo da direção atual, mantendo a direção 
    //      consistente com o movimento anterior

    // Redefine a posição horizontal da barra
    barraX = (canvas.width - barraLargura) / 2;

}

// Função responsável por atualizar e renderizar o estado do jogo
function desenhar() {

    contexto.clearRect(0, 0, canvas.width, canvas.height);
    desenharBlocos();
    desenharBola();
    desenharBarra();
    verificarColisao();

    // Verifica se a bola atingiu as bordas laterais, modificando a direção horizontal da bola
    if (x + dx > canvas.width - bolaRaio || x + dx < bolaRaio) {
        dx = -dx;
    }

    // Verifica se a bola atingiu a borda superior, mudando a direção da bola
    if (y + dy < bolaRaio) {
        
        dy = -dy;

    } else if (y + dy > canvas.height - bolaRaio) {
    // Verifica se a bola atingiu a borda inferior
        
        // Verifca se a bola está dentro dos limites da barra, rebatendo a bola
        if (x > barraX && x < barraX + barraLargura) {
            
            dy = -dy;

        } else {

            // Caso não esteja dentro dos limites da barra, recarrega a página, reiniciando o jogo
            document.location.reload();

        }
    }

    // Verificações para movimentar a barra
    if (direitaPressionada && barraX < canvas.width - barraLargura) {

        barraX += 7;

    } else if (esquerdaPressionada && barraX > 0) {

        barraX -= 7;

    }

    // Atualiza a posição da bola, incrementando as velocidades horizontal e vertical
    x += dx;
    y += dy;

    // Cria um loop de animação contínuo, mantendo o jogo atualizado e renderizado
    requestAnimationFrame(desenhar);

}

// Chama a função desenhar
desenhar();