// src/stores/pacientesStore.js
import { defineStore } from 'pinia';
import pacientesService from 'src/services/pacientesService';

export const usePacientesStore = defineStore('pacientes', {
  state: () => ({
    pacientes: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchPacientes() {
      this.loading = true;
      this.error = null;
      try {
        this.pacientes = await pacientesService.getPacientes();
      } catch (error) {
        this.error = 'Erro ao carregar pacientes';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async fetchPacienteById(id) {
      try {
        const paciente = await pacientesService.getPacienteById(id);
        return paciente;
      } catch (error) {
        console.error("Erro ao buscar paciente:", error);
        throw error;
      }
    },

    async updatePaciente(id, pacienteData) {
      try {
        await pacientesService.updatePaciente(id, pacienteData);
        this.fetchPacientes();
      } catch (error) {
        console.error("Erro ao atualizar paciente:", error);
        throw error;
      }
    },

    async addPaciente(pacienteData) {
      try {
        await pacientesService.addPaciente(pacienteData);
        this.fetchPacientes();
      } catch (error) {
        console.error("Erro ao adicionar paciente:", error);
        throw error;
      }
    }
  }
});
