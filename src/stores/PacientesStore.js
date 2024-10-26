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
  },
});
