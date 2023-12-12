import ConvidadoApi from "./convidadoApiClient.js";

const IConvidado = {
  form: document.getElementById("convidadoForm"),
  tableBody: document.getElementById("convidadoTableBody"),
  convidadoInput: document.getElementById("convidado"),
  nomeInput: document.getElementById("nome"),
  telefoneInput: document.getElementById("telefone"),

  init() {
    this.fetchAndRenderList();
    this.form.addEventListener("submit", this.submit.bind(this));
  },

  async submit(event) {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("nome", this.nomeInput.value);
      formData.append("numero_convidado", this.convidadoInput.value);
      formData.append("numero_telefone", this.telefoneInput.value);

      await ConvidadoApi.create(formData);

      this.clearForm();

      await this.fetchAndRenderList();
    } catch (error) {
      // Log...
      console.error(error);
    }
  },

  async delete(Id) {
    try {
      if (confirm("Você tem certeza?")) {
        console.log(`Excluir Convidado ID ${Id}`);

        const message = await ConvidadoApi.delete(Id);

        await this.fetchAndRenderList();
      }
    } catch (error) {
      // Log...
      console.error(error);
    }
  },

  async fetchAndRenderList() {
    try {
      const objects = await ConvidadoApi.fetchList();

      this.renderList(objects.convidados);
    } catch (error) {
      // Log...
      console.error(error);
    }
  },

  renderList(objects) {
    console.log(objects);
    this.tableBody.innerHTML = "";
    objects.forEach((data) => {
      const row = document.createElement("tr");
      row.innerHTML = `        
        <td>${data.id}</td>
        <td>${data.nome}</td>
        <td>${data.numero_telefone}</td>       
        <td style="text-align: center;">          
          <button class="btn btn-danger" style="width:80px !important;" type="button" data-id="${data.id}" data-delete="true">Delete</button>
        </td>
      `;
      this.tableBody.appendChild(row);
    });

    this.tableBody.querySelectorAll("button[data-id]").forEach((item, i) => {
      // Set userId
      const objectId = item.getAttribute("data-id");

      if (item.hasAttribute("data-delete")) {
        //console.log(`Excluir usuário com ID ${userId}`);
        item.addEventListener("click", this.delete.bind(this, objectId));
      }
    });
  },

  clearForm() {
    this.nomeInput.value = "";
    this.convidadoInput.value = 1;
    this.telefoneInput.value = "";
  },
};

export default IConvidado;
