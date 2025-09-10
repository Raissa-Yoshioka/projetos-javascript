function converterParaBinario() {
    const textoEntrada = document.getElementById('textoEntrada').value;
    let resultadoBinario = '';

    // Laço que itera sobre cada caractere da entrada
    for (let i = 0; i < textoEntrada.length; i++) {

        /* -> '.charCodeAt(i)' obtém o código ASCII do caractere no índice i
           ->'.toString(2)' converte esse código numérico para sua representação binária (de base 2)
           -> '.padStart(8, '0')' garante que a string binária tenha pelo menos 8 dígitos, preenchendo com
                zeros a esquerda se preciso */
        const binario = textoEntrada.charCodeAt(i).toString(2).padStart(8, '0');
        resultadoBinario += binario + ' ';
    }

    // '.trim()' é usado para remover qualquer espaço extra no final da string antes de
    //      definir o valor, atualizando o campo de saída na página
    document.getElementById('textoSaida').value = resultadoBinario.trim();
}

function converterParaTexto() {
    const textoEntrada = document.getElementById('textoEntrada').value;
    const arrayBinario = textoEntrada.split(' '); // Divide a string de entrada em um array de strings usando espaços como delimitador
    let resultadoTexto = '';

    for (let i = 0; i < arrayBinario.length; i++) {
        // Converte o código binário no índice 'i' para um número decimal
        //  e o segundo parâmetro '2' indica que a string deve ser interpretada como um n° binário
        const decimal = parseInt(arrayBinario[i], 2);

        // Retorna o caractere correspondente ao código ASCII e concatena esse caractere a variável atual.
        resultadoTexto += String.fromCharCode(decimal);
    }

    document.getElementById('textoSaida').value = resultadoTexto;
}

function mostrarExplicacao() {
    document.getElementById('modalExplicacao').style.display = 'block';
}

function fecharExplicacao() {
    document.getElementById('modalExplicacao').style.display = 'none';
}

// Função que fecha o modal se o usuário clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById('modalExplicacao');

    if (event.target === modal) {
        modal.style.display = 'none';
    }
}