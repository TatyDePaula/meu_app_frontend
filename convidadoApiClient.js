const ConvidadoApiClient = {
  apiUrl: "http://127.0.0.1:5000",

  async fetchList() {
    let resourceUrl = `${this.apiUrl}/convidados`;
    try {
      const response = await fetch(resourceUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log(response);
        throw error(response);
      }

      const object = await response.json();
      return object;
    } catch (error) {
      throw error;
    }
  },

  async create(formData) {
    let resourceUrl = `${this.apiUrl}/convidado`;
    try {
      const response = await fetch(resourceUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.log(response);
        throw error(response);
      }
      const object = await response.json();
      return object;
    } catch (error) {
      throw error;
    }
  },

  async delete(Id) {
    let resourceUrl = `${this.apiUrl}/convidado?id=${Id}`;
    try {
      const response = await fetch(resourceUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log(response);
        throw error(response);
      }

      return "Convidado excluído com sucesso";
    } catch (error) {
      throw error;
    }
  },
};

export default ConvidadoApiClient;
