import { api } from 'src/boot/axios'; // Certifique-se de que o axios está configurado

const medicosService = {
  // Função para buscar os dados dos pacientes
  async getMedicos() {
    try {
      const response = await api.get('/medicos'); // Chama a rota da API para pacientes
      return response.data; // Retorna os dados de pacientes recebidos da API
    } catch (error) {
      console.error("Erro ao carregar dados dos medicos:", error);
      throw error;
    }
  },
  async getMedicoById(id) {
    try {
      const response = await api.get(`/medicos/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao carregar dados do médico:", error);
      throw error;
    }
  },

    async updateMedico(id, medicoData) {
      await api.put(`/medicos/${id}`, medicoData);
    },

    async addMedico(medicoData) {
      await api.post('/medicos', medicoData);
    }
};

export default medicosService;