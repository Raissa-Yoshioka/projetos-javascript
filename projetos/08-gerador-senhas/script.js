// Evento de ouvinte para quando a página for carregada
document.addEventListener('DOMContentLoaded', () => {

    const btnGerar = document.getElementById('gerar');
    const divSenha = document.getElementById('senha');

    // Adiciona um evento de ouvinte para quando o botão de 'gerar a senha' for clicado
    btnGerar.addEventListener('click', () => {

        // Obtendo as informações de preferência do usuário para a geração da senha
        const comprimento = parseInt(document.getElementById('comprimento').value);
        const incluirMaiuscula = document.getElementById('incluir-maiusculas').checked;
        const incluirEspeciais = document.getElementById('incluir-especiais').checked;
        const incluirNumeros = document.getElementById('incluir-numeros').checked;

        // Opções para a geração da senha
        const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
        const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const caracteresEspeciais = '!@#$%&*()^?_=-+/';
        const numeros = '0123456789';

        // Variável que será usada para a geração da senha
        //  por padrão, a senha tem letras minúscuças
        let conjuntoCaracteres = letrasMinusculas;

        // Verificando as preferências do usuário e adicionando na variável 'conjuntoCaracteres'
        if (incluirMaiuscula) conjuntoCaracteres += letrasMaiusculas;
        if (incluirEspeciais) conjuntoCaracteres += caracteresEspeciais;
        if (incluirNumeros) conjuntoCaracteres += numeros;

        // Variável que armazena a senha segura
        let senha = '';

        // Loop responsável por gerar a senha segura
        for (let i = 0; i < comprimento; i++) {
            // Seleciona um índice aleatório da variável 'conjuntoCaracteres' e adiciona na variável que armazena a senha
            const indiceAleatorio = Math.floor(Math.random() * conjuntoCaracteres.length);
            senha += conjuntoCaracteres[indiceAleatorio];
        }

        /* Verifica se incluirNumeros está ativa e verifica se a senha atual não contém nenhum
            dígito nnumérico, com '/\d/' sendo uma expressão regular que busca dígitos
            a função '.test()' retorna verdadeiro se encontrar um dígito e falso se não */
        if (incluirNumeros && !/\d/.test(senha)) {
            
            // Seleciona um índice aleatório dentro da variável da senha e outro índice aleatório
            //  dentro da variável que armazena as opções de números
            const indiceAleatorio = Math.floor(Math.random() * senha.length);
            const indiceDigitoAleatorio = Math.floor(Math.random() * numeros.length);

            /*  Atualiza a senha inserindo um dígito aleatório
                    'senha.substring(0, indiceAleatorio)' retorna a parte da senha antes do índice aleatório
                */
            //senha[indiceAleatorio] = numeros[indiceDigitoAleatorio];
            senha = senha.substring(0, indiceAleatorio) + numeros[indiceDigitoAleatorio] + senha.substring(indiceAleatorio + 1);

        }

        // Verifica se nenhuma das opções para uma senha segura foi assinalada e envia uma mensagem de alerta para o usuário, indicando
        //  que essa não é uma senha segura
        if (!incluirMaiuscula && !incluirEspeciais && !incluirNumeros) {
            alert("Atenção! Para uma senha segura é indicado que haja a presença de caracteres especiais, letras maiúsculas e/ou números. A senha apresentada não é uma senha considerada forte.")
        }

        // Verifica se foi inserido algum valor não permitido para o comprimento da senha, informando o erro
        //  Caso contrário, e for informado um valor válido, a senha será exibida
        if (!comprimento | comprimento < 8) {
            divSenha.innerText = 'Por favor, insira um número maior ou igual a 8 para o comprimento de sua senha.';
        } else {
            divSenha.innerText = senha;
        }

    });

});