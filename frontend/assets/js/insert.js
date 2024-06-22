// Abrir modal
let adicionarAluno = document.querySelector(".addButton");
let modalContainer = document.querySelector(".modalContainer");
adicionarAluno.addEventListener("click", () => {
    modalContainer.style.display = "block"
})
// Fechar Modal
let closeModal = document.querySelector("#closeModal");

closeModal.addEventListener("click", () => {
    modalContainer.style.display = "none"
})





// Pegar dados do formulario
const formulario = document.querySelector(`.studentForm`);
formulario.addEventListener("submit", function(e) {
    e.preventDefault(); // Evita o comportamento padrão de envio do formulário
    //chamando função de validação
    if (validarFormulario(formulario)) {
        const formData = new FormData(formulario);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

    const matricula = data.matricula.trim(); // Remove espaços em branco da matrícula

    // Verificar se a matrícula já existe na tabela
    if (verificarMatriculaExistente(matricula)) {
        const MatriculaExistente = document.getElementById("MatriculaExistente")
        MatriculaExistente.style.display = 'block'; 
        setTimeout(function() {
            MatriculaExistente.style.display = 'none';
        }, 5000);// Exibir mensagem de matrícula existente
        return;
    }

    // Matrícula não existe na tabela
    fetch('http://localhost:8080/aluno', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao enviar os dados');
        }
        formulario.reset(); // Limpa os campos do formulário após o envio
        console.log('Dados enviados com sucesso!');
        console.log(data);
        successMessage.style.display = 'block'; //mensagem de sucesso
        setTimeout(function() {
            successMessage.style.display = 'none';
            location.reload(); //Recarrega a página 
        }, 1000);
        })
            .catch(error => {
            console.error('Erro ao enviar os dados:', error);
            errorMessage.style.display = 'block'; //mensagem de erro
            setTimeout(function() {
                errorMessage.style.display = 'none';
            }, 5000);
        });
    }
});


// Função para verificar se a matrícula já existe na tabela
function verificarMatriculaExistente(matricula) {
    const tabela = document.querySelector('tbody'); // Seleciona o corpo da tabela
    const linhas = tabela.querySelectorAll('tr'); // Seleciona todas as linhas da tabela
  
    for (let i = 0; i < linhas.length; i++) {
      const matriculaCell = linhas[i].querySelector('td:nth-child(2)'); // Seleciona a célula de matrícula
  
      if (matriculaCell && matriculaCell.textContent.trim() === matricula) {
        return true; // Matrícula encontrada na tabela
      }
    }
    return false; // Matrícula não encontrada na tabela
  }


// Função para validar o formulário antes de enviar
function validarFormulario(formulario) {
    const inputs = formulario.querySelectorAll(".inputModal");
    const campoInvalidadoMsg = document.getElementById("campoInvalidadoMsg");
    const campoInvalidadoMatricula = document.getElementById("campoInvalidadoMatricula");

    let valido = true;

    inputs.forEach(input => {
        // Verifica se o campo está vazio
        if (input.value.trim() === "") {
            input.style.borderColor = "red";
            input.setAttribute("placeholder", "Este campo é obrigatório!");
            campoInvalidadoMsg.style.display = 'block'; //mensagem de erro
            setTimeout(function () {
                campoInvalidadoMsg.style.display = 'none';
            }, 5000);
            valido = false;
        } else {
            input.style.borderColor = ""; // Limpa a borda caso esteja em vermelho
            input.setAttribute("placeholder", ""); // Limpa o placeholder
        }

        // Verifica se a matrícula tem mais de 8 caracteres
        if (input.id === "matricula" && input.value.trim().length > 8) {
            input.style.borderColor = "red";
            input.setAttribute("placeholder", "A matrícula deve ter no máximo 8 caracteres!");
            campoInvalidadoMatricula.style.display = 'block'; //mensagem de erro
            setTimeout(function () {
                campoInvalidadoMatricula.style.display = 'none';
            }, 5000);
            valido = false;
        }   
    });

    return valido;
}





