import { defineStore } from "pinia";
import medicosService from "src/services/medicosService";

export const useMedicosStore = defineStore("medicosStore", {
  state: () => ({
    medicos: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchMedicos() {
      this.loading = true;
      this.error = null;
      try {
        this.medicos = await medicosService.getMedicos();
      } catch (error) {
        this.error = "Erro ao carregar médicos.";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async addMedico(medico) {
      try {
        await medicosService.addMedico(medico);
        await this.fetchMedicos(); // Atualiza a lista após adicionar
      } catch (error) {
        console.error("Erro ao adicionar médico:", error);
        throw error;
      }
    },

    async updateMedico(id, medicoData) {
      try {
        await medicosService.updateMedico(id, medicoData);
        await this.fetchMedicos(); // Atualiza a lista após a edição
      } catch (error) {
        console.error("Erro ao atualizar médico:", error);
        throw error;
      }
    },

    async deleteMedico(id) {
      try {
        await medicosService.deleteMedico(id);
        await this.fetchMedicos(); // Atualiza a lista após exclusão
      } catch (error) {
        console.error("Erro ao deletar médico:", error);
        throw error;
      }
    },

    async updateMedicoStatus(id, status) {
      try {
        await medicosService.updateMedicoStatus(id, status);
        const medico = this.medicos.find((m) => m.id === id);
        if (medico) {
          medico.Status = status;
        }
      } catch (error) {
        console.error("Erro ao atualizar status do médico:", error);
        throw error;
      }
    },
  },
});
