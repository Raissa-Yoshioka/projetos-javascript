// Obtém os elementos HTML
const container = document.getElementById("container");

// Lista das cores que podem aparecer nos quadrados
const cores = ['#e43926ff', '#e57513ff', '#efdf28ff', '#2ecc31ff', '#058924ff', '#3498db', '#8c2db5ff', '#f0438eff' ];

// Número total de quadrados
const total_quadrados = 306;

// Variável auxliar responsável por guardar a cor de fundo do quadrado
let corDeFundo;
let comCor;

// Loop que itera e cria cada quadrado, adicionando os ouvintes de eventos
for (let i = 0; i < total_quadrados; i++) {

    const quadrado = document.createElement('div');
    quadrado.classList.add('quadrado');

    // Ouvinte de evento para quando o mouse estiver no quadrado
    quadrado.addEventListener('mouseover', () => {
        setCorQuadrado(quadrado);
    });

    // Ouvinte de evento para quando o mouse sair do quadrado
    quadrado.addEventListener('mouseout', () => {
        removeCorQuadrado(quadrado);
    });

    quadrado.addEventListener('click', () => {
        fixarCorQuadrado(quadrado);
    });

    // Define que a cor de fundo do quadrado é a primeira opção, a original
    quadrado.corDeFundo = true;
    quadrado.comCor = false;

    // Adiciona o quadrado no ontainer
    container.appendChild(quadrado);
}

// Função responsável por retornar uma cor aleatória dentro da lista de cores
function getCorAleatoria() {
    return cores[Math.floor(Math.random() * cores.length)];
}

// Função responsável por adicionar a cor no quadrado atual
function setCorQuadrado(quadrado) {

    // Verifica se não uma cor fixa definida no quadrado e define a cor temporária
    if (!quadrado.comCor) {
        const cor = getCorAleatoria();

        quadrado.style.background = cor;
        quadrado.style.boxShadow = `0 0 2px ${cor}, 0 0 10px ${cor}`;
    }

}

// Função responsável por remover a cor do quadrado aos poucos
function removeCorQuadrado(quadrado) {

    if (!quadrado.comCor){

        if (!quadrado.corDeFundo) {
            quadrado.style.backgroundColor = '#332f70';
            quadrado.corDeFundo = true;
        
        } else {
            quadrado.style.backgroundColor = '#1a1648';
            quadrado.corDeFundo = false;
        }

        quadrado.style.boxShadow = `0 0 2px rgba(0, 0, 0, 0.1)`;

    }
}

function fixarCorQuadrado(quadrado) {

    if (quadrado.comCor) {
        // Se o quadrado está com um cor de fundo vinda da lista de cores

        removeCorQuadrado(quadrado);
        quadrado.comCor = false;

    } else {

        const cor = getCorAleatoria();
        quadrado.style.backgroundColor = cor;
        quadrado.comCor = true;

    }

}