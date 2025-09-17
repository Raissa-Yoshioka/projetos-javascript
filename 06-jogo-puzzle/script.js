// Adiciona um ouvinte de evento que espera até que todo o documento DOM
    // esteja carregado e pronto, garantindo que todos os elementos HTML estejam disponíveis
document.addEventListener("DOMContentLoaded", () => {
    const containerPuzzle = document.getElementById('container-puzzle');
    const btnNovoTabuleiro = document.getElementById('novoTabuleiro')
    const btnTestar = document.getElementById('botao-testar');
    const tamanhoTabuleiro = document.getElementById('tamanho-tabuleiro');
    
    // Obtém o elemento do modal que informa ao usuário que o puzzle foi completado com sucesso
    //  e oculta esse modal
    const modalVitoria = document.getElementById('modal-vitoria');
    modalVitoria.style.display = "none";

    const fecharModal = document.getElementById('fechar-modal');
    const pontuacao = document.getElementById('pontuacao');

    /* Tenta recuperar a pontuação do jogo do armazenamento local do navegador
        se houver, converte para inteitro, se não houver, inicializa a variável como 0 */
    let pontos = localStorage.getItem('pontos_puzzle') ? parseInt(localStorage.getItem('pontos_puzzle')) : 0;
    pontuacao.innerText = `Pontos: ${pontos}`;

    let ordemPecas;
    let tamanhoAtual = 3;

    // Ambas as funções abaixo, são manipuladores de eventos que fechará o modal de vitória
    fecharModal.onclick = () => {
        modalVitoria.style.display = "none";
    }
    window.onclick = (event) => {
        if (event.target === modalVitoria) {
            modalVitoria.style.display = "none";
        }
    }

    // Manipulador de evento para mudança no tamanho do tabuleiro e reinicia o jogo com o novo tamanho
    tamanhoTabuleiro.addEventListener('change', () => {
        tamanhoAtual = parseInt(tamanhoTabuleiro.value);
        inicializarJogo();
    });

    // Manipulador de evento para clique no botão de 'Novo Tabuleiro', iniciando um novo jogo com um novo tabuleiro
    //  com o mesmo tamanho informado anteriormente
    btnNovoTabuleiro.addEventListener('click', () => {
        inicializarJogo();
    });

    // Manipulador de evento para clique no botão de testar que configura o tabuleiro para um
    //  estado de fácil resolução
    btnTestar.addEventListener('click', () => {
        ordemPecas = criarOrdemTeste(tamanhoAtual);
        renderizar(); // Função que atualiza a vizualização do tabuleiro
    });

    // Função que recebe um parâmetro 'tamanho' e gera uma configuração de tabuleiro em que o puzzle está
    //  quase completo, exceto por uma peça fora do lugar
    function criarOrdemTeste(tamanho) {
        const ordem = [];

        // Loop que percorre cada peça do puzzle, exceto pela última peça
        for (let i = 1; i < tamanho * tamanho - 1; i++) {
            ordem.push(i);
        }
        
        // Adiciona 'null' ao final da ordem e adiciona a última e única peça que está fora do lugar
        ordem.push(null);
        ordem.push(tamanho * tamanho - 1);
        
        return ordem;
    }

    // Função que inicializa um tabuleiro
    function inicializarJogo() {
        // Chama a função que cria a ordem inicial para o tabuleiro
        ordemPecas = criarOrdemInicial(tamanhoAtual);

        // Chama a função que embaralha a ordem das peças, a que cria o tabuleiro, ajustando o layout para
        //  acomodar o número de peças e chama a função 'renderizar' que atualiza a exibição no display
        embaralhar(ordemPecas);
        criarTabuleiro(tamanhoAtual);
        renderizar();
    }

    // Função que cria a ordem inicial com base no parâmetro 'tamanho'
    function criarOrdemInicial(tamanho) {
        const ordem = [];
        for (let i = 1; i < tamanho * tamanho; i++) {
            ordem.push(i);
        }
        ordem.push(null);
        return ordem;
    }

    // Função que recebe o parâmetro 'array' e embaralha seus elementos
    function embaralhar(array) {

        // Loop que percorre o array
        for (let i = array.length - 1; i > 0; i--) {
            // Gera um índice aleatório que vai de 0 até i
            const j = Math.floor(Math.random() * (i + 1));

            // Realiza a troca dos dois elementos
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Função que recebe o parâmetro 'tamanho' e cria o tabuleiro com base nesse parâmetro
    function criarTabuleiro(tamanho) {
        // Configura as propriedades das colunas e linhas no tabuleiro
        containerPuzzle.style.gridTemplateColumns = `repeat(${tamanho}, 100px)`;
        containerPuzzle.style.gridTemplateRows = `repeat(${tamanho}, 100px)`;
        
        // Limpa o conteúdo atual do container do puzzle, para garantir que o tabuleiro seja
        //  recriado do zero cada vez que a função é chamada
        containerPuzzle.innerHTML = '';

        for (let i = 1; i <= tamanho * tamanho; i++) {
            // Cria um novo elemento para representar uma peça do tabuleiro e adiciona a classe ao elemento 'div
            const peca = document.createElement('div');
            peca.classList.add('peca');

            // Verifica se o índice atual é a última posição do tabuleiro para colocar uma peça vazia ali,
            //  se não for, apenas adiciona a peça na sua devida posição
            if (i === tamanho * tamanho) {
                
                peca.id = 'peca-vazia';

            } else {
    
                // Define o atributo 'id' nas outras peças, como por exemplo 'peca-1' ou 'peca-2', criando um
                //  identificador único para cada peça e define o texto interno como o índice atual
                peca.id = `peca-${i}`;
                peca.innerText = i;

            }

            // Adiciona o novo elemento 'div' ao container do puzzle, inserindo a peça no DOM e tornando-a visível
            containerPuzzle.appendChild(peca);
        }
    }

    // Função responsável por atualizar a interface do usuário
    function renderizar() {

        // Seleciona todos os elementos do DOM com a classe 'peca' e os converte em um array
        const pecas = Array.from(document.querySelectorAll('.peca'));

        // Intera sobre cada valor e índice no array 'ordemPecas'
        ordemPecas.forEach((valor, index) => {

            // Verifica se o valor atual não é nulo e define as propriedades da peça correspondente
            if (valor !== null) {
                pecas[valor - 1].style.order = index;
                pecas[valor - 1].style.backgroundColor = '#ffdab9';

            } else {
                // Se o valor for nulo, significa que esta posição corresponde à peça vazia e então define
                //  as propriedades desta peça vazia
                const pecaVazia = document.getElementById('peca-vazia');
                pecaVazia.style.order = index;
                pecaVazia.style.backgroundColor = '#8b5a2b';
            }
        });

        // Chama a função que verifica se o jogador completou o puzzle
        verificarVitoria();
    }

    // Função responsável por verificar se o jogador completou o puzzle com sucesso
    function verificarVitoria() {

        const ordemCorreta = criarOrdemInicial(tamanhoAtual);

        // Verifica se todos os elementos em 'ordemPecas' correspondem aos elementos de 'ordemCorreta'
        if (ordemPecas.every((val, index) => val === ordemCorreta[index])) {

            // Incrementa a variável dos pontos, bem como armazena essa pontuação e atualiza sua exibição
            pontos += 10;
            localStorage.setItem('pontos_puzzle', pontos);
            pontuacao.innerText = `Pontos: ${pontos}`;

            // Exibe o modal de vitória
            modalVitoria.style.display = "flex";
        }
    }

    // Função responsável por verificar se a jogada é válida, que recebe dois parâmetros
    //  e verifica se a movimentação de 'idexOrigem' para 'indexDestino' é válida
    function jogadaValida(indexOrigem, indexDestino) {
        const colunas = tamanhoAtual;
        
        // Calcula a linha e a coluna da peça de origem
        const linhaOrigem = Math.floor(indexOrigem / colunas);
        const colunaOrigem = indexOrigem % colunas;

        // Calcula a linha e coluna da peça de destino
        const linhaDestino = Math.floor(indexDestino / colunas);
        const colunaDestino = indexDestino % colunas;

        // Calcula a distância entre ambas as peças somando a diferença absoluta entre suas linhas
        //  e a diferença absoluta entre suas colunas
        const distancia = Math.abs(linhaOrigem - linhaDestino) + Math.abs(colunaOrigem - colunaDestino);

        // Retorna 'true' se a distância entre as peças for exatamente 1, significando que as peças são adjacentes e
        //  a movimentação é válida. Caso contrário, a função retorn 'false'
        return distancia === 1;   
    }

    // Adiciona um ouvinte de evento que escuta eventos de clique
    document.addEventListener('click', (event) => {

        // Verifica se o elemento que foi clicado contém a classe 'peca'
        if (event.target.classList.contains('peca')) {
            
            // Obtém o índice da peça que foi clicada e também o da peça vazia
            const indexPeca = ordemPecas.indexOf(parseInt(event.target.innerText));
            const indexVazio = ordemPecas.indexOf(null);

            // Verifica se, com base dos índices obtidos, a jogada é válida
            if (jogadaValida(indexPeca, indexVazio)) {
                // Troca as peças e atualiza a visualização do tabuleiro
                [ordemPecas[indexPeca], ordemPecas[indexVazio]] = [ordemPecas[indexVazio], ordemPecas[indexPeca]];
                renderizar();
            }
        }

    });

    // Chama a função para iniciar o jogo
    inicializarJogo();
});