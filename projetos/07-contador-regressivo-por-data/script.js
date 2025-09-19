document.addEventListener('DOMContentLoaded', () => {

    // Data em que o evento ocorrerá, para colocar uma outra data é só alterar a linha abaixo para a data desejada
    const dataEvento = new Date('September 18, 2025 00:00:00').getTime();

    const intervalo = setInterval(() => {
        const agora = new Date().getTime();
        const distancia = dataEvento - agora;

        /*
            Conta:
            -- '1000' milissegundos em um segundo,
            -- '60' segundos em um minuto,
            -- '60' minutos em uma hora,
            -- '24' horas em um dia.
        */
        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

        // Alterando a exibição da contagem, verificando para acrescentar um '0' à esquerda quando
        //  for o número for menor que '10'
        document.querySelector('#dias .number').textContent = dias < 10 ? '0' + dias : dias;
        document.querySelector('#horas .number').textContent = horas < 10 ? '0' + horas : horas;
        document.querySelector('#minutos .number').textContent = minutos < 10 ? '0' + minutos : minutos;
        document.querySelector('#segundos .number').textContent = segundos < 10 ? '0' + segundos : segundos;

        // Verifica se a contagem até o evento já chegou ao fim
        if (distancia < 0) {
            // Se sim, o temporazidor será interrompido e informado o display da tela
            clearInterval(intervalo);
            document.querySelector('.contador').innerHTML = "<div>O evento já começou!</div>";
        }
    // Define o intervalo de 1000 milissegundos, ou seja, 1 segundo
    }, 1000);

});