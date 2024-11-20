import { api } from "src/boot/axios";

export default {
  async getDashboardData() {
    try {
      const [
        medicosResponse,
        pacientesResponse,
        equipamentosResponse,
        enfermariasResponse,
        enfermeirosResponse, // Adiciona enfermeiros
      ] = await Promise.all([
        api.get("/medicos"),
        api.get("/pacientes"),
        api.get("/equipamentos"),
        api.get("/enfermarias"),
        api.get("/enfermeiros"), // Chamada correta para enfermeiros
      ]);

      return {
        medicos: medicosResponse.data,
        pacientes: pacientesResponse.data,
        equipamentos: equipamentosResponse.data,
        enfermarias: enfermariasResponse.data,
        enfermeiros: enfermeirosResponse.data, // Inclua no retorno
      };
    } catch (error) {
      console.error("Erro ao carregar dados da Dashboard:", error);
      throw error;
    }
  },
};
