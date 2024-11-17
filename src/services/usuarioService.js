// src/services/usuariosService.js
import { api } from 'src/boot/axios';

const usuariosService = {
  // Obtém todos os usuários
  async getUsuarios() {
    try {
      const response = await api.get('/usuarios');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw error;
    }
  },

  // Adiciona um novo usuário
  async addUsuario(usuarioData) {
    try {
      const response = await api.post('/usuarios', usuarioData);
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
      throw error;
    }
  },

  // Atualiza um usuário existente
  async updateUsuario(id, usuarioData) {
    try {
      const response = await api.put(`/usuarios/${id}`, usuarioData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error;
    }
  },

  // Remove um usuário
  async deleteUsuario(id) {
    try {
      await api.delete(`/usuarios/${id}`);
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      throw error;
    }
  },
};

export default usuariosService;
