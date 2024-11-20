import { defineStore } from "pinia";
import dashboardService from "src/services/dashboardService";

export const useDashboardStore = defineStore("dashboardStore", {
  state: () => ({
    medicos: [],
    enfermeiros: [], // Adicionado enfermeiros
    pacientes: [],
    equipamentos: [],
    enfermarias: [],
    events: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchDashboardData() {
      this.loading = true;
      this.error = null;
      try {
        const data = await dashboardService.getDashboardData();
        this.medicos = data.medicos || [];
        this.enfermeiros = data.enfermeiros || []; // Atualiza enfermeiros
        this.pacientes = data.pacientes || [];
        this.equipamentos = data.equipamentos || [];
        this.enfermarias = data.enfermarias || [];
        this.events = data.events || [];
      } catch (error) {
        console.error("Erro ao carregar dados da Dashboard:", error);
        this.error = "Erro ao carregar dados.";
      } finally {
        this.loading = false;
      }
    },
  },
});
