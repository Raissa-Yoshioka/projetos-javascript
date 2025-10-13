// Define os objetos que representam uma cidade com seu nome, a sigla do país e fuso horário
const locais = [
    {nome: "Nova York - US", fusoHorario: -4},
    {nome: "Londres - UK", fusoHorario: 1},
    {nome: "Tóquio - JP", fusoHorario: 9},
    {nome: "Sydney - AU", fusoHorario: 10},
    {nome: "Dubai - UAE", fusoHorario: 4},
    {nome: "Moscou - RU", fusoHorario: 3},
    {nome: "São Paulo - BR", fusoHorario: -3},
    {nome: "Pequim - CN", fusoHorario: 8},
    {nome: "Berlim - DE", fusoHorario: 2},
    {nome: "Paris - FR", fusoHorario: 2}
];

// Função responsável pelo funcionamento dos relógios a serem exibidos
function atualizarRelogios () {

    // Seleciona e limpa o elemento HTML
    const containerRelogios = document.getElementById('relogios');
    containerRelogios.innerHTML = '';

    // Itera sobre cada item no array de locais
    locais.forEach(local => {

        // Cria um novo objeto com a data e hora atuais
        const agora = new Date();

        // Calcula a hora local considerando o fuso horário, calclando o deslocamento total em milissegundos
        const horaLocal = new Date(agora.getTime() + (local.fusoHorario * 60 + agora.getTimezoneOffset()) * 60000);

        // Formata a data e a hora
        const dataFormatada = horaLocal.toLocaleDateString('pt');
        const horaFormatada = horaLocal.toLocaleTimeString('pt', {hour : '2-digit', minute: '2-digit', second: '2-digit'});
        
        // Cria um novo elemento 'div' para representar um relógio
        const divRelogio = document.createElement("div");
        divRelogio.className = "relogio";

        // Cria e define um elemento 'div' para o nome do local
        const divLocal = document.createElement("div");
        divLocal.className = "local";
        divLocal.textContent = local.nome;

        // Cria e define um novo elemento 'div' para a data e hora já formatadas
        const divDataHora = document.createElement("div");
        divDataHora.className = "data-hora";
        divDataHora.textContent = `${dataFormatada} - ${horaFormatada}`;

        // Adiciona os elementos criados como filho dentro do elemento 'divRelogio'
        divRelogio.appendChild(divLocal);
        divRelogio.appendChild(divDataHora);

        // Adiciona o elemento 'divRelogio' no container definido
        containerRelogios.appendChild(divRelogio);

    });
}

// Define um intervalo de tempo de 1000 milissegundos (1 segundo)
setInterval(atualizarRelogios, 1000); 

// Chama a função para que os relógios sejam atualizados assim que a página for carregada
atualizarRelogios();