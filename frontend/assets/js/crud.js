  // Fechar Modal
  let modalContainerEdit = document.querySelector(".modalContainerEdit");
  let closeModalEdit = document.querySelector("#closeModalEdit");

  closeModalEdit.addEventListener("click", () => {
      modalContainerEdit.style.display = "none"
  })

  // pegando dados

  const apiUrl = 'http://localhost:8080/aluno';
  const editForm = document.querySelector(`.editForm`);

  // Função para preencher a tabela com os dados
  function preencherTabela(data) {
      const tbody = document.querySelector('tbody');
    
      // Itera sobre os dados e cria as linhas da tabela
      data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.nome}</td>
          <td>${item.matricula}</td>
          <td>${item.email}</td>
          <td>${item.turma}</td>
          <td>${item.curso}</td>
          <td class="actionIcons"><i class="bi bi-pencil-square"></i> <i class="bi bi-trash3-fill" data-matricula="${item.matricula}"></i></td>
        `;
        tbody.appendChild(row);
      });
      
      // Inicio editar aluno
      const editIcon = document.querySelectorAll('.bi-pencil-square');
      editIcon.forEach(icon => {
          icon.addEventListener('click', () => {
              const row = icon.closest('tr');
              const nome = row.cells[0].textContent;
              const matricula = row.cells[1].textContent;
              const email = row.cells[2].textContent;
              const turma = row.cells[3].textContent;
              const curso = row.cells[4].textContent;

              // Preencha o modal com os dados para edição
              document.querySelector('#nomeEdit').value = nome;
              document.querySelector('#matriculaEdit').value = matricula;
              document.querySelector('#matriculaEdit').disabled = true
              document.querySelector('#emailEdit').value = email;
              document.querySelector('#turmaEdit').value = turma;
              document.querySelector('#cursoEdit').value = curso;
              
              editForm.addEventListener('submit', (e) => submitEdit(e, matricula));
              // Abra o modal de edição
              modalContainerEdit.style.display = 'block';
          });
      });
      // Event listener para o botao de exclusão
    document.querySelector('tbody').addEventListener('click', function(event) {
    if (event.target.classList.contains('bi-trash3-fill')) {
      const matricula = event.target.getAttribute('data-matricula');
      deletarAluno(matricula);
    }
  });
  }
  // metodo de buscar dados no banco e transformar em tabela
  fetch(apiUrl)
    .then(response => {
      // Verifica se a resposta está ok (código 200)
      if (!response.ok) {
        throw new Error('Erro ao obter os dados da API');
      }
      // Se estiver tudo ok, converte a resposta para JSON
      return response.json();
    })
    .then(data => {
      // Chama a função para preencher a tabela com os dados recebidos
      preencherTabela(data);
    })
    .catch(error => {
      // Caso ocorra algum erro durante a requisição
      console.error('Erro na requisição:', error);
    });
    

  //functions

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


  // Função para deletar um aluno pela matrícula
  function deletarAluno(matricula) {
    fetch(`http://localhost:8080/aluno/${matricula}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao excluir aluno');
        }
        console.log('Aluno excluído com sucesso!');
        successMessage.style.display = 'block'; //mensagem de sucesso
          setTimeout(function() {
              successMessage.style.display = 'none';
              location.reload() //Recarrega a pagina 
          }, 1000);
      })
      .catch(error => {
        console.error('Erro ao excluir aluno:', error);
      });
  }

  function submitEdit(e, matricula) {
    e.preventDefault();
    if (validarFormulario(editForm)){
      const formData = new FormData(editForm);
      const data = {};
      formData.forEach((value, key) => {
          data[key] = value;
      });

      fetch(`http://localhost:8080/aluno/${matricula}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Erro ao atualizar os dados do aluno');
          }
          console.log('Dados atualizados com sucesso!');
          // Fechar o modal após a edição
          modalContainerEdit.style.display = 'none';
          successMessage.style.display = 'block'; //mensagem de sucesso
            setTimeout(function() {
                successMessage.style.display = 'none';
                location.reload() //Recarrega a pagina 
            }, 1000);
      })
      .catch(error => {
          console.error('Erro ao atualizar os dados:', error);
          // Tratar mensagem de erro, se necessário
      });
    }
  }