// src/stores/medicosStore.js
import { defineStore } from 'pinia';
import medicosService from 'src/services/medicosService';

export const useMedicosStore = defineStore('medicos', {
  state: () => ({
    medicos: [],
    loading: false,
    error: null,
  }),
  actions: {
    // Método para buscar todos os médicos
    async fetchMedicos() {
      this.loading = true;
      this.error = null;
      try {
        this.medicos = await medicosService.getMedicos();
      } catch (error) {
        this.error = 'Erro ao carregar médicos';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    // Método para buscar um médico específico por ID
    async fetchMedicoById(id) {
      try {
        return await medicosService.getMedicoById(id);
      } catch (error) {
        console.error("Erro ao buscar médico:", error);
        throw error;
      }
    },

    // Método para atualizar os dados de um médico
    async updateMedico(id, medicoData) {
      try {
        await medicosService.updateMedico(id, medicoData);
        await this.fetchMedicos(); // Atualiza lista após a edição
      } catch (error) {
        console.error("Erro ao atualizar médico:", error);
        throw error;
      }
    },

    // Método para adicionar um novo médico
    async addMedico(medicoData) {
      try {
        await medicosService.addMedico(medicoData);
        await this.fetchMedicos(); // Atualiza lista após a adição
      } catch (error) {
        console.error("Erro ao adicionar médico:", error);
        throw error;
      }
    }
  }
});
