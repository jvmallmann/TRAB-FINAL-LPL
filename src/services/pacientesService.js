import { api } from 'src/boot/axios';

const pacientesService = {
  async getPacientes() {
    try {
      const response = await api.get('/pacientes');
      return response.data;
    } catch (error) {
      console.error("Erro ao carregar dados dos pacientes:", error);
      throw error;
    }
  },

  async getPacienteById(id) {
    try {
      const response = await api.get(`/pacientes/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao carregar paciente:", error);
      throw error;
    }
  },

  async updatePaciente(id, pacienteData) {
    try {
      await api.put(`/pacientes/${id}`, pacienteData);
    } catch (error) {
      console.error("Erro ao atualizar paciente:", error);
      throw error;
    }
  },

  async addPaciente(pacienteData) {
    try {
      await api.post('/pacientes', pacienteData);
    } catch (error) {
      console.error("Erro ao adicionar paciente:", error);
      throw error;
    }
  },

  // Adicionando o método deletePaciente
  async deletePaciente(id) {
    try {
      await api.delete(`/pacientes/${id}`);
    } catch (error) {
      console.error("Erro ao excluir paciente:", error);
      throw error;
    }
  },
};

export default pacientesService;
