import { api } from "src/boot/axios";

export default {
  async getDashboardData() {
    try {
      // Fazendo todas as requisições simultaneamente
      const [
        medicosResponse,
        pacientesResponse,
        // rankingResponse,
        // agentsResponse,
        // mapsResponse,
      ] = await Promise.all([
        api.get("/medicos"), // Requisição para usuários
        api.get("/pacientes"), // Requisição para times
        // api.get("/partidas"), // Requisição para partidas
        // api.get("/agentes"), // Requisição para agentes
        // api.get("/mapas"), // Requisição para mapas
      ]);

      // Retornando os dados como um objeto
      return {
        medicos: medicosResponse.data,
        pacientes: pacientesResponse.data,
        // ranking: rankingResponse.data,
        // mostPlayedAgents: agentsResponse.data,
        // mostPlayedMaps: mapsResponse.data,
      };
    } catch (error) {
      console.error("Erro ao carregar dados da Dashboard:", error);
      throw error;
    }
  },
};