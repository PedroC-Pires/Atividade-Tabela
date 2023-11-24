// Obtendo referências para elementos HTML
let tabela = document.getElementById("tabela");
let campoSobre = document.getElementById("sobre");
let modal1 = document.getElementById("modal1");
let modal2 = document.getElementById("modal2");
let nome = document.getElementById("nome");
let conceito = document.getElementById("conceito");
let frequencia = document.getElementById("frequencia");

// Variáveis para armazenar dados e total de alunos
let bancoDeDados = 0;
let total = 0;

// Carregando dados do localStorage e exibindo a tabela
bancoDeDados = JSON.parse(localStorage.getItem("alunosDB"));
printTabela();

// Função para cadastrar um novo aluno
function funcCad(){
    // Recarregando dados do localStorage
    bancoDeDados = JSON.parse(localStorage.getItem("alunosDB"));
    total = JSON.parse(localStorage.getItem("total"))
    total++;
    localStorage.setItem("total", JSON.stringify(total));

    // Inicializando o array se estiver vazio
    if (bancoDeDados == null) {
        bancoDeDados = [];
    }

    // Validando os campos de entrada
    if (nome.value!="" && conceito.value!=0 && frequencia.value>=0 && frequencia.value<=100){
        let aluno = {
            matricula: total,
            nome: nome.value,
            conceito: conceito.value,
            frequencia: frequencia.value,
            aprovado: "",
            mais: ""
        }

        // Verificando se o aluno está aprovado
        if(aluno.conceito!="C"&&aluno.frequencia>=75){
            aluno.aprovado = "Sim";
        }else{
            aluno.aprovado = "Não";
        }

        // Adicionando o aluno ao banco de dados
        bancoDeDados.push(aluno);
        localStorage.setItem("alunosDB", JSON.stringify(bancoDeDados));

        // Exibindo mensagem e fechando modal
        alert("Aluno cadastrado!");
        modal1.close();
    } else{
        // Exibindo mensagem em caso de erro
        alert("Por favor, preencha todos os campos corretamente");
        console.log("Error");
    }

    // Atualizando e exibindo a tabela
    printTabela();
}

// Função para exibir a tabela na página
function printTabela(){
    //Limpando a tabela e iniciando a variavel para a contagem de linhas
    let a = 0;
    tabela.innerHTML = "";

    // Iterando sobre os alunos no banco de dados
    for (aluno of bancoDeDados){
        a++;

        // Criando linhas da tabela dinamicamente
        let linha = `<tr>
        <td>${aluno.matricula}</td>
        <td>${aluno.nome}</td>
        <td>${aluno.conceito}</td>
        <td>${aluno.frequencia}%</td>
        <td>${aluno.aprovado}</td>
        <td><button type="button" name="${a}" onclick="localStorage.setItem('sobre',JSON.stringify(this.name)); printSobre(); modal2.showModal();" class="btn btn-outline-info btn-sm">Sobre</button></td>
        </tr>`;

        // Adicionando a linha à tabela
        tabela.innerHTML += linha;
    }
}

// Função para exibir detalhes sobre um aluno
function printSobre(){
    // Obtendo índice do aluno selecionado
    i2 = JSON.parse(localStorage.getItem("sobre"))-1;
    bancoDeDados = JSON.parse(localStorage.getItem("alunosDB"));

    // Obtendo informações do aluno e exibindo no campoSobre
    aluno = bancoDeDados[i2];
    campoSobre.value = aluno.mais;
}

// Função para salvar informações adicionais sobre um aluno
function salvarSobre(){
    // Atualizando informações adicionais e removendo o aluno do array
    aluno.mais = campoSobre.value;
    bancoDeDados.splice(i2,0)
    localStorage.setItem("alunosDB", JSON.stringify(bancoDeDados));

    // Exibindo mensagem, fechando modal e atualizando a tabela
    alert("Informações salvas!");
    modal2.close();
    printTabela();
}

// Função para excluir um aluno pelo índice
function excluirMatricula(){
    // Pergunta ao usuario se o mesmo tem certeza que deseja excluir estes arquivos
    AreUSure = confirm("Você tem certeza que deseja excluir este registro?\n\nEsta alteração não poderá ser desfeita e os dados relacionados a este aluno serão permanentemente perdidos.");

    // Analiza a resposta do usuario
    if(AreUSure==true){
        // Removendo o aluno do array e atualizando o localStorage
        bancoDeDados.splice(i2,1)
        localStorage.setItem("alunosDB", JSON.stringify(bancoDeDados));

        // Fechando modal e atualizando a tabela
        modal2.close();
        printTabela();
    } else{
        breaK;
    }
}

/*
    Curso:
        Técnico em Desenvolvimento de Sistemas - Escola SESI/CTAI Florianópolis, SC
    Projeto:
        Atividade Avaliativa - Tabela
    Objetivo:
        Seguindo como exemplo o código anexado nesta atividade, crie uma página de cadastro, leitura e exclusão de ESTUDANTES, alimentando uma tabela através do LocalStorage.
        Todos os estudantes cadastrados devem aparecer na tabela, tendo também a opção de excluí-los.
    Autor:
        Pedro Pires | Full-Stack
    Turma:
        2B - 2023
    Versão do documento: 
        1.0
    Data e hora de conclusão do documento: 
        24/11/2023 - 03:57
*/