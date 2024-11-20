import { api } from "src/boot/axios";

export default {
  async getMedicos() {
    try {
      const response = await api.get("/medicos");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar médicos:", error);
      throw error;
    }
  },

  async addMedico(medico) {
    try {
      await api.post("/medicos", medico);
    } catch (error) {
      console.error("Erro ao adicionar médico:", error);
      throw error;
    }
  },

  async updateMedico(id, medicoData) {
    try {
      await api.put(`/medicos/${id}`, medicoData);
    } catch (error) {
      console.error("Erro ao atualizar médico:", error);
      throw error;
    }
  },

  async deleteMedico(id) {
    try {
      await api.delete(`/medicos/${id}`);
    } catch (error) {
      console.error("Erro ao deletar médico:", error);
      throw error;
    }
  },

  async updateMedicoStatus(id, status) {
    try {
      await api.patch(`/medicos/${id}`, { Status: status });
    } catch (error) {
      console.error("Erro ao atualizar status do médico:", error);
      throw error;
    }
  },
};
