let horas = 0, minutos = 0, segundos = 0, milissegundos = 0;
let intervalo;
let pausado = false;

// Função para atualizar o display do cronômetro
const atualizarDisplay = () => {
    document.getElementById('horas').textContent = String(horas).padStart(2, '0');
    document.getElementById('minutos').textContent = String(minutos).padStart(2, '0');
    document.getElementById('segundos').textContent = String(segundos).padStart(2, '0');
    document.getElementById('milissegundos').textContent = String(Math.floor(milissegundos / 10)).padStart(2, '0');
    /* É usado o padStart(2,'0') para garantir que sempre tenha dois dígitos em exibição, preenchendo com
          zeros à esquerda se preciso. Para os milissegundos, a variável é dividido por 10 e seu valor é 
          arredondado para baixo */
}

// Função responsável por iniciar o cronômetro
const iniciarCronometro = () => {

    // Inicia um intervalo que executa uma função a cada 10 milissegundos
    intervalo = setInterval(() => {

        // Verifica se o cronômetro está pausado
        if (!pausado) {
            milissegundos += 10; // Incrementa a variável 'milissegundos'

            // Verifica se os milissegundos alcançaram 1000, que equivale a um segundo
            // Reinicia a contagem de milissegundos e incrementa os segundos
            if (milissegundos >= 1000) {
                milissegundos = 0;
                segundos++;
            }

            // Verifica se os segundos alcançaram 60, que equivale a um minuto
            //  Reinicia a contagem dos segundos e incrementa o minuto
            if (segundos >= 60) {
                segundos = 0;
                minutos++;
            }

            // Verifica se os minutos alcançaram 60, que equivale a uma hora
            //  Reinicia a contagem dos minutos e incrementa a hora
            if (minutos >= 60) {
                minutos = 0;
                horas++;
            }

            // Chama a função para atualizar o display
            atualizarDisplay();
        }

    }, 10);

    // Configuração dos botões para quando o cronômetro já está funcionando
    document.getElementById('iniciar').disabled = true;
    document.getElementById('pausar').disabled = false;
    document.getElementById('continuar').disabled = true;
    document.getElementById('resetar').disabled = false;
}

// Função responsável por pausar o cronômetro, habilitando ou desabilitando os botões necessários
const pausarCronometro = () => {
    pausado = true;
    document.getElementById('pausar').disabled = true;
    document.getElementById('continuar').disabled = false;
}

// Função responsável por continuar a contagem do cronômetro, habilitando ou desabilitando os botões necessários
const continuarCronometro = () => {
    pausado = false;
    document.getElementById('pausar').disabled = false;
    document.getElementById('continuar').disabled = true;
}

// Função responsável por resetar o cronômetro
const resetarCronometro = () => {
    
    // Interrompe o intervalo de tempo estabelecido
    clearInterval(intervalo);

    // Reinicia as variáveis e atualiza o display
    horas = 0;
    minutos = 0;
    segundos = 0;
    milissegundos = 0;

    atualizarDisplay();

    // Retorna os botões as configurações iniciais
    document.getElementById('iniciar').disabled = false;
    document.getElementById('pausar').disabled = true;
    document.getElementById('continuar').disabled = true;
    document.getElementById('resetar').disabled = true;
}

// Adiciona ouvintes de evento para quando cada um dos botões for clicado
document.getElementById('iniciar').addEventListener('click', iniciarCronometro);
document.getElementById('pausar').addEventListener('click', pausarCronometro);
document.getElementById('continuar').addEventListener('click', continuarCronometro);
document.getElementById('resetar').addEventListener('click', resetarCronometro);

// Chama a função de atualizar o display assim que a página for carregada
atualizarDisplay();

// Configuração incial dos botões
document.getElementById('iniciar').disabled = false;
    document.getElementById('pausar').disabled = true;
    document.getElementById('continuar').disabled = true;
    document.getElementById('resetar').disabled = true;