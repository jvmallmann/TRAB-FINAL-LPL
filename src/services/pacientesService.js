// src/services/pacientesService.js
import { api } from 'src/boot/axios'; // Certifique-se de que o axios está configurado

const pacientesService = {
  // Função para buscar os dados dos pacientes
  async getPacientes() {
    try {
      const response = await api.get('/pacientes'); // Chama a rota da API para pacientes
      return response.data; // Retorna os dados de pacientes recebidos da API
    } catch (error) {
      console.error("Erro ao carregar dados dos pacientes:", error);
      throw error;
    }
  }
};

export default pacientesService;
