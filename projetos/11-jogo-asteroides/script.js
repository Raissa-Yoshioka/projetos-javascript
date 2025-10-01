// Variáveis que recebem os elementos HTML necessáriospara o funcionamento geral do jogo
const canvas = document.getElementById("telaJogo");
const ctx = canvas.getContext("2d");

// Define a largura e altura do canvas
canvas.width = 800;
canvas.height = 600;

// Definição da nave, que representa o usuário
let nave = {
    
    // Posição que aparece no canvas
    x: canvas.width / 2,
    y: canvas.height / 2,
    
    // Tamanho e proporções da nave
    width: 20,
    height: 20,
    
    // Configurações iniciais da nave
    angle: 0,
    velocidade: 0,
    rotacao: 0,
    tiros: []
}

// Variáveis necessárias para o funcionamento geral do jogo
let asteroides = [];
let pontos = 0;
let vidas = 3;
const imgAsteroides = [];

// Loop que itera seis vezes para definir todos os asteroides do jogo
for (let i = 1; i <= 6; i++) {
    const img = new Image();
    img.src = `images/asteroide${i}.png`;
    imgAsteroides.push(img);
}

// Obtém os elementos HTML da pontuação e vidas do usuário
document.getElementById("pontuacao").innerText = `Pontuação: ${pontos}`;
document.getElementById("vidas").innerText = `Vidas: ${vidas}`;

// Adiciona eventos de ouvinte para detectar movimentos de teclas pelo usuário
document.addEventListener("keydown", teclaPressionada);
document.addEventListener("keyup", teclaSolta);

// Função que é chamada sempre que uma tecla é pressionada
function teclaPressionada(e) {

    // Verificação das teclas pressionadas
    if (e.key === "ArrowUp") {

        // Se a seta para cima foi a tecla pressionada, ajusta a velocidade da nave
        nave.velocidade = 5;

    } else if (e.key === "ArrowLeft") {

        // Se a seta para a esquerda foi a tecla pressionada, altera a rotação da nave
        nave.rotacao = -0.1;

    } else if (e.key === "ArrowRight") {

        // Se a seta para a direita foi a tecla pressionada, ajusta a rotação da nave
        nave.rotacao = 0.1;

    } else if (e.key === " ") {

        // Se a barra de espaço foi a tecla pressionada, a função 'atirar' é chamada
        atirar();

    }
}

// Função que é chamada quando uma tecla é solta
function teclaSolta(e) {

    // Verifica qual tecla que foi solta pelo usuário
    if (e.key === "ArrowUp") {

        // Se a tecla solta foi a seta para cima, ajusta a velocidade da nave
        nave.velocidade = 0;

    } else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {

        // Se a tecla solta foi a seta para a esquerda ou a seta para a direita, para a rotação da nave
        nave.rotacao = 0;

    }
}

// Função responsável por criar e disparar projéteis da nave
function atirar() {

    // Definição inicial do tiro
    const tiro = {
        
        // É usado o cosseno do ângulo atual da nave multiplicado pela largura da nave para posicionar o tiro na frente da nave
        x: nave.x + Math.cos(nave.angle) * nave.width,

        // Usa o seno do ângulo da nave para calcular sua posição vertical
        y: nave.y + Math.sin(nave.angle) * nave.width,

        // Definição das velocidades horizontais e verticais do tiro
        dx: Math.cos(nave.angle) * 5,
        dy: Math.sin(nave.angle) * 5
    };

    // Adiciona o tiro recém-criado ao array 'tiros'
    nave.tiros.push(tiro);
}

// Função responsável por inicializar os asteroides no jogo
function criarAsteroides() {

    // Inicia um loop que itera cinco vezes e cria múltiplos asteroides
    for (let i = 0; i < 5; i++) {
        adicionarAsteroide();
    }

}

// Função responsável por criar cada asteroide e adicioná-lo ao jogo
function adicionarAsteroide() {

    // Variáveis que armazenam as coordenadas do asteroide
    let x, y;

    // Gera posições aleatórias nos cantos
    if (Math.random() < 0.5) {

        // Gera um novo número aleatório entre 0 e 1, se for menor que 0.5, 'x' é definido como 0 para 
        //  o asteroide aparecer no lado esquerdo do canvas, se for maior, o asteroide aparece no lado direito
        x = Math.random() < 0.5 ? 0 : canvas.width;

        // Gera uma altura aleatória para o asteroide aparecer
        y = Math.random() * canvas.height;

    } else {

        // Caso contrário e o valor aleatório for maior que '0.5', o cálculo será realizado para 
        //  que o asteroide apareça em uma das bordas horizontais do canvas
        y = Math.random() < 0.5 ? 0 : canvas.height;
        x = Math.random() * canvas.width;

    }

    // Definições do novo asteroide
    let asteroide = {

        x: x,
        y: y,

        // Definição das velocidades horizontal e vertical do asteroide
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2,

        radius: Math.random() * 30 + 15, // Define o tamanho do asteroide
        imagem: imgAsteroides[Math.floor(Math.random() * imgAsteroides.length)]
    };

    asteroides.push(asteroide);
}

// Função responsável por desenhar a nave que é controlada pelo usuário
function desenharNave() {

    // Salva o estado atual de 'ctx'
    ctx.save();

    // Desenhos da nave
    ctx.translate(nave.x, nave.y); // Define o ponto central da nova posição da nave
    ctx.rotate(nave.angle); // Rotaciona o ctx para o ângulo de orientação definido para a nave
    ctx.beginPath(); // nicia um novo caminho no canvas
    ctx.moveTo(-nave.width / 2, nave.height / 2); // Realinha o ponto central
    
    ctx.lineTo(nave.width / 2, 0); // Desenha uma linha do ponto inicial até a ponta da nave
    ctx.lineTo(-nave.width / 2, -nave.height / 2); // Desenha outra linha da ponta da nave até a parte traseira direita
    ctx.closePath(); // Fecha o caminho, completando o triângulo da nave

    // Preenche a nave com a cor branca
    ctx.fillStyle = 'white';
    ctx.fill();

    ctx.restore(); // Restaura o estado anterior do ctx

}

// Função responsável por desenhar os tiros disparados pela nave
function desenharTiros() {

    ctx.fillStyle = 'red'; // Define a cor do tiro

    // Inicia um loop para iterar sobre cada objeto dentro do array 'tiros'
    for (let tiro of nave.tiros) {

        // Desenhando cada tiro
        ctx.beginPath();
        ctx.arc(tiro.x, tiro.y, 2, 0, Math.PI * 2); // Desenha o arco para representar o tiro
        ctx.fill();

    }
}

// Função responsável por desenhar os asteroides
function desenharAsteroides() {

    // Inicia um loop para iterar sobre cada objeto dentro do array 'asteroides
    for (let asteroide of asteroides) {

        ctx.drawImage(
            asteroide.imagem,
            asteroide.x - asteroide.radius,
            asteroide.y - asteroide.radius,
            asteroide.radius * 2,
            asteroide.radius * 2
        );
    }
}

// Função responsável por mover a nave
function moverNave() {
    
    // Atualiza o ângulo de rotação da nave
    nave.angle += nave.rotacao;

    // Atualiza a posição horizontal e vertical da nave
    nave.x += Math.cos(nave.angle) * nave.velocidade;
    nave.y += Math.sin(nave.angle) * nave.velocidade;

    // Verifica se a nave ultrapassou o limite esquerdo do canvas
    if (nave.x < 0) nave.x = canvas.width;

    // Verifica se a nave ultrapassou o limite direito do canvas
    if (nave.x > canvas.width) nave.x = 0;

    // Verifica se a nave ultrapassou o limite superior do canvas
    if (nave.y < 0) nave.y = canvas.height;

    // Verifica se a nave ultrapassou o limite inferior do canvas
    if (nave.y > canvas.height) nave.y = 0;
}

// Função responsável por mover os tiros
function moverTiros() {

    // Inicia um loop que percorre o array de tiros da nave de trás para frente
    for (let i = nave.tiros.length - 1; i >= 0; i--) {
        let tiro = nave.tiros[i];

        // Atualiza as posições do tiro
        tiro.x += tiro.dx;
        tiro.y += tiro.dy;

        // Verifica se o tiro saiu dos limites do canvas e o elimina do array
        if (tiro.x < 0 || tiro.x > canvas.width || tiro.y < 0 || tiro.y > canvas.height) {
            nave.tiros.splice(i, 1);
        }
    }
}

// Função responsável por modificar as posições dos asteroides
function moverAsteroides() {

    // Inicia um loop que itera sobre cada asteroide do array
    for (let asteroide of asteroides) {
        asteroide.x += asteroide.dx;
        asteroide.y += asteroide.dy;

        // Verifica se o asteroide ultrapassou o limite esquerdo do canvas
        if (asteroide.x < 0) asteroide.x = canvas.width;

        // Verifica se o asteroide ultrapassou o limite direito do canvas
        if (asteroide.x > canvas.width) asteroide.x = 0;

        // Verifica se o asteroide ultrapassou o limite superior do canvas
        if (asteroide.y < 0) asteroide.y = canvas.height;

        // Verifica se o asteroide ultrapassou o limite inferior do canvas
        if (asteroide.y > canvas.height) asteroide.y = 0;
    }
}

// Função responsável por detectar colisões
function detectarColisoes() {

    // Inicia um lop que percorre o array de tiros da nave, a fim de verificar se ocorre uma 
    //  colisão entre um asteroide e um tiro da nave
    for (let i = nave.tiros.length - 1; i >= 0; i--) {
        
        let tiro = nave.tiros[i];

        // Inicia outro loop que percorre o array de asteroides
        for (let j = asteroides.length - 1; j >= 0; j--) {

            let asteroide = asteroides[j];

            // Calcula a distância entre o tiro e o asteroide usando a diferença dos quadrados das
            //   diferenças entre as coordenadas dos dois objetos
            let distancia = Math.hypot(tiro.x - asteroide.x, tiro.y - asteroide.y);

            // Verifica se a distância calculada é menor que o raio do asteroide, indicando uma colisão
            if (distancia < asteroide.radius) {

                // Atualiza a pontuação
                pontos += 10;
                document.getElementById("pontuacao").innerText = `Pontuação: ${pontos}`;

                nave.tiros.splice(i, 1); // Remove o tiro do array de tiros da nave
                asteroides.splice(j, 1); // Remove o asteroide do array de asteroides
                adicionarAsteroide(); // Chama a função para substituir o asteroide destruído por um novo no canvas

                break; // Interrompe o loop
            }
        }
    }

    // Inicia um loop para iterar sobre cada objeto no array 'asteroides', permitindo verificar se há colisões de asteroides com a nave
    for (let asteroide of asteroides) {

        // Calcula a distância entre a nave e o asteroide
        let distancia = Math.hypot(nave.x - asteroide.x, nave.y - asteroide.y);

        // Verifica se houve a colisão
        if (distancia < asteroide.radius) {

            // Atualiza as vidas
            vidas--;
            document.getElementById("vidas").innerText = `Vidas: ${vidas}`;

            if (vidas <= 0) {
                alert("Game Over!");
                document.location.reload();
            }

            asteroides.splice(asteroides.indexOf(asteroide), 1);
            adicionarAsteroide();
            break;
        }
    }
}

// Função responsável por renderizar o jogo
function desenhar() {

    // Limpa completamente o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Chama as funções de desenhar os objetos
    desenharNave();
    desenharTiros();
    desenharAsteroides();

    // Chama as funções para mover os objetos do jogo
    moverNave();
    moverTiros();
    moverAsteroides();

    // Chama a função para detectar as colisões no jogo
    detectarColisoes();

    // Cria um loop de animação
    requestAnimationFrame(desenhar);
}

criarAsteroides();

// Adiciona um novo asteroide a cada 5 segundos
setInterval(adicionarAsteroide, 5000);

desenhar();