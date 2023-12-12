/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = "http://127.0.0.1:5000/convidados";
  fetch(url, {
    method: "get",
  })
    .then((response) => response.json())
    .then((data) => {
      data.convidados.forEach((item) =>
        insertList(item.id, item.nome, item.numero_telefone)
      );
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList();

/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const salvarConvidado = async (numeroConvidado, nome, telefone) => {
  const formData = new FormData();
  formData.append("numero_convidado", numeroConvidado);
  formData.append("nome", nome);
  formData.append("numero_telefone", telefone);

  let url = "http://127.0.0.1:5000/convidado";
  fetch(url, {
    method: "post",
    body: formData,
  })
    .then((response) => response.json())
    .then(() => getList()) // Recarrega a lista após adicionar um convidado
    .catch((error) => {
      console.error("Error:", error);
    });
};

/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deletarConvidado = (nomeConvidado) => {
  if (confirm("Você tem certeza?")) {
    let url = "http://127.0.0.1:5000/convidado?nome=" + nomeConvidado;
    fetch(url, {
      method: "delete",
    })
      .then(() => getList()) // Recarrega a lista após excluir um convidado
      .catch((error) => {
        console.error("Error:", error);
      });
  }
};

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (numeroConvidado, nome, telefone) => {
  var item = [numeroConvidado, nome, telefone];
  var table = document.getElementById("myTable");
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }

  insertButton(row.insertCell(-1), nome);
  removeElement();
};

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent, nome) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  span.onclick = function () {
    deletarConvidado(nome); // Certifique-se de que o nome do convidado seja passado corretamente aqui
  };
  parent.appendChild(span);
};

/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      console.log(div);
    };
  }
};
