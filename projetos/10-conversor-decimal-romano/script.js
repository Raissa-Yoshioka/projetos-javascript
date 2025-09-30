// A função de converter números decimais em romano foi separada para que fosse possível apresentar
//  o número romano correto no caso de ser informado uma sequência incorreta de números romanos em outra função
function converterParaRomano(entrada) {

    // Verifica se o número informado é válido ou se é menor que zero
    if (isNaN(entrada) || entrada <= 0) {
        return "Por favor, insira um número decimal válido acima de 0.";
    }

    // Array de objetos relacionando valores decimais aos seus equivalente números romanos
    const numRomanos = [
        { valor: 1000, simbolo: 'M' },
        { valor: 900, simbolo: 'CM' },
        { valor: 500, simbolo: 'D' },
        { valor: 400, simbolo: 'CD' },
        { valor: 100, simbolo: 'C' },
        { valor: 90, simbolo: 'XC' },
        { valor: 50, simbolo: 'L' },
        { valor: 40, simbolo: 'XL' },
        { valor: 10, simbolo: 'X' },
        { valor: 9, simbolo: 'IX' },
        { valor: 5, simbolo: 'V' },
        { valor: 4, simbolo: 'IV' },
        { valor: 1, simbolo: 'I' }
    ];

    // Variáveis auxiliares
    let numRomano = '';
    let num = entrada;

    numRomanos.forEach((item) => {
        // Itera sobre cada item do array 'numRomanos',
        //  verificando se é maior ou igual ao número
        while (num >= item.valor) {
            numRomano += item.simbolo;
            num -= item.valor;
        }
    });

    // Retorna o número romano equivalente
    return numRomano;
}

function mostrarRomano() {

    // Variáveis que acessam os elementos HTML
    const numEntrada = parseInt(document.getElementById('numEntrada').value);
    const resultadoDiv = document.getElementById('numSaida');

    // Chama a função que converte o valor decimal para romano
    let numRomano = converterParaRomano(numEntrada);

    // Atualiza o valor do elemento, exibindo para o usuário
    resultadoDiv.value = numRomano;
}

function converterParaDecimal() {

    // Variáveis que acessam os elementos HTML
    const numEntrada = document.getElementById('numEntrada').value.toUpperCase();
    const resultadoDiv = document.getElementById('numSaida');

    // Objeto que mapeia os números romanos com seus respectivos valores decimais
    const numRomanos = {
        'M': 1000,
        'CM': 900,
        'D': 500,
        'CD': 400,
        'C': 100,
        'XC': 90,
        'L': 50,
        'XL': 40,
        'X': 10,
        'IX': 9,
        'V': 5,
        'IV': 4,
        'I': 1
    };

    // Variáveis auxiliares
    let numDecimal = 0;
    let i = 0;

    // Inicia um loop para encontrar o valor decimal correspondente
    while( i < numEntrada.length) {

        // Verifica se existe um próximo caractere na variável 'numEntrada' e checa se os dois caracteres atuais formam um
        //  número romano conhecido, como 'IX' ou 'IV', e converte os dois valores no decimal correspondente
        if ( i+1 < numEntrada.length && numRomanos[numEntrada.substring(i, i+2)]) {
            
            numDecimal += numRomanos[numEntrada.substring(i, i+2)];
            i += 2;

        } else {
        // Caso não seja dois caracteres, converte e adiciona apenas um caractere
            numDecimal += numRomanos[numEntrada[i]];
            i++;
        }
    }

    // Chama a função que converte decimal em romano a fim de verificar se o número romano informado é da configuração correta
    let romanoCorreto = converterParaRomano(numDecimal);

    if (numDecimal == 0 || !isNaN(numEntrada)) {
        // Verifica se o decimal é válido
        resultadoDiv.value = "Por favor, insira um número romano válido";

    } else if (numEntrada === romanoCorreto) {
        // Verifica se o número romano de entrada informado é o correto e atualiza a exibição do usuário
        resultadoDiv.value = numDecimal;

    } else {
        // Caso não seja o número correto informado, atualiza a exibição do usuário para o resultado e a entrada
        resultadoDiv.value = numDecimal;
        document.getElementById('numEntrada').value = romanoCorreto;
    }
    
}

// Função responsável por tornar visível o modal da Dica
function mostrarDica() {
    document.getElementById('modalDica').style.display = 'block';
}

// Funções responsáveis por fechar o modal da dica

// Quando se clica no elemento de fechar o modal
function fecharDica() {
    document.getElementById('modalDica').style.display = 'none';
}
// Quando se clica fora do modal de dica
window.onclick = function(event) {
    const modal = this.document.getElementById('modalDica');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Adiciona um evento de ouvinte para checar se o botão de conversão de número decimal para romano foi clicado e chama a função
document.getElementById('converterRomano').addEventListener('click', mostrarRomano);