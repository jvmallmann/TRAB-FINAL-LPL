import { defineStore } from "pinia";
import dashboardService from "src/services/dashboardService";

export const useDashboardStore = defineStore("dashboardStore", {
  state: () => ({
    medicos: [],
    pacientes: [],
    // ranking: [],
    // mostPlayedAgents: [],
    // mostPlayedMaps: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchDashboardData() {
      this.loading = true;
      this.error = null;
      try {
        // Chamando o serviço para buscar os dados
        const data = await dashboardService.getDashboardData();
        console.log("Dados carregados:", data); // Verifique os dados

        // Atribuindo os dados ao estado
        this.medicos = data.medicos.slice(0, 3);
        this.pacientes = data.pacientes.slice(0, 3);
        // this.ranking = data.ranking;
        // this.mostPlayedAgents = data.mostPlayedAgents.slice(0, 4);
        // this.mostPlayedMaps = data.mostPlayedMaps.slice(0, 4);
      } catch (err) {
        this.error = "Erro ao carregar dados da Dashboard";
      } finally {
        this.loading = false;
      }
    },
  },
});