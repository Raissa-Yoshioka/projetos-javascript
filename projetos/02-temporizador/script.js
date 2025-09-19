let horas = 0, minutos = 0, segundos = 0;
let intervalo;
let pausado = false;

// Função que atualiza o conteúdo textual dos elementos do temporizador
const atualizarDisplay = () => {
    document.getElementById('horas').textContent = String(horas).padStart(2, '0');
    document.getElementById('minutos').textContent = String(minutos).padStart(2, '0');
    document.getElementById('segundos').textContent = String(segundos).padStart(2, '0');
    // É usado o padStart(2,'0') para garantir que sempre tenha dois dígitos em exibição, preenchendo com
    //  zeros à esquerda se preciso
}

const iniciarTemporizador = () => {
    // Se existir um intervalo ativo armazenado, ele é interrompido para começar um novo
    if (intervalo) clearInterval(intervalo);

    // Recupera os valores de entrada informados e os atribuem as variáveis declaradas no início
    horas = parseInt(document.getElementById('entrada-horas').value);
    minutos = parseInt(document.getElementById('entrada-minutos').value);
    segundos = parseInt(document.getElementById('entrada-segundos').value);

    // Caso os campos de entrada estejam nulos, para evitar dar um erro na exibição do temporizador
    //  as variáveis são definidas como 0
    if (!horas) horas = 0;
    if (!minutos) minutos = 0;
    if (!segundos) segundos = 0;

    // Verifica se todos os campos estão definidos como zero e exibe um alerta para o usuário, além
    //  de encerrar a função
    if (horas === 0 && minutos === 0 && segundos === 0) {
        alert("Defina um tempo válido para o temporizador.")
        return;
    }

    atualizarDisplay();
    pausado = false;

    intervalo = setInterval(() => {

        // Verifica se o temporizador não está pausado e implementa a lógica da contagem regressiva
        if (!pausado) {
            
            if (segundos === 0) {

                if (minutos === 0) {

                    if (horas === 0) {
                        // Se essa condição é verdadeira, indica que o tempo acabou, reinicia e limpa as
                        //  entradas anteriores e encerra a função
                        clearInterval(intervalo);
                        alert("O tempo acabou!");
                        reiniciarBotoes();
                        limparInputs();
                        return;

                    } else {
                        // Caso as horas não tenham acabado, implementa a contagem regressiva na variável das horas
                        horas--;
                        minutos = 59;
                        segundos = 59;
                    }

                } else {
                    // Caso os minutos não tenham chegado a zero, implementa a contagem regressiva na variável dos minutos
                    minutos--;
                    segundos = 59;
                }

            } else {
                // Caso os segundos não tenham chegado a zero, implementa a contagem regressiva na variável dos segundos
                segundos--;

            }

            // Atualiza a exibição do temporizador para mostrar o tempo atualizado
            atualizarDisplay();
        }

    }, 1000);
    // O intervalo executa a função a cada 1 segundo (1000 milissegundos)

    // Desabilita o botão de iniciar, porque o temporizador já está em execução
    document.getElementById('iniciar').disabled = true;

    // Habilita o botão de pausar, permitindo que o usuário pause o temporizador
    document.getElementById('pausar').disabled = false;

    // Mantém o botão de continuar desabilitado, já que só deve ser habilitado se o
    //  temporizador for pausado
    document.getElementById('continuar').disabled = true;

    // Habilita o botão de resetar, permitindo que o temporizador seja resetado a qualquer
    //  momento após o início do temporizador
    document.getElementById('resetar').disabled = false;
}

// Função que configura o estado inicial dos botões
const reiniciarBotoes = () => {

    // Habilita o botão iniciar, permitindo que o temporizador seja inicializado
    //  pelo usuário
    document.getElementById('iniciar').disabled = false;

    // Desabilita todos os outros botões, já que para o funcionamento deles é preciso que
    //  o temporizador esteja inicializado
    document.getElementById('pausar').disabled = true;
    document.getElementById('continuar').disabled = true;
    document.getElementById('resetar').disabled = true;
}

// Função responsável pelo funcionamento do botão de pausa
const pausarTemporizador = () => {
    pausado = true;
    document.getElementById('pausar').disabled = true; // Desabilita o botão de pausar
    document.getElementById('continuar').disabled = false; // Habilita o botão de continuar
}

// Função responsável pelo funcionamento do botão de continuar
const continuarTemporizador = () => {
    pausado = false;
    document.getElementById('pausar').disabled = false; // Habilita o botão de pausar
    document.getElementById('continuar').disabled = true; // Desabilita o botão de continuar
}

// Função responsável pelo funcionamento do botão resetar
const resetarTemporizador = () => {
    clearInterval(intervalo);
    horas = 0, minutos = 0, segundos = 0;
    pausado = false;
    atualizarDisplay();
    reiniciarBotoes();
    limparInputs();
}

// Função responsável por limpar os campos de entrada, retornando seus valores para zero
const limparInputs = () => {
    document.getElementById('entrada-horas').value = 0;
    document.getElementById('entrada-minutos').value = 0;
    document.getElementById('entrada-segundos').value = 0;
}

// Adionando ouvintes de evento para cada um dos botões, chamando suas respectivas funções
//  ao serem clicados
document.getElementById('iniciar').addEventListener('click', iniciarTemporizador);
document.getElementById('pausar').addEventListener('click', pausarTemporizador);
document.getElementById('continuar').addEventListener('click', continuarTemporizador);
document.getElementById('resetar').addEventListener('click', resetarTemporizador);

// Chamando as funções para garantir o estado inicial do temporizador
atualizarDisplay();
reiniciarBotoes();