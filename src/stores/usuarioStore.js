// src/stores/usuariosStore.js
import { defineStore } from 'pinia';
import usuariosService from 'src/services/usuariosService';

export const useUsuariosStore = defineStore('usuarios', {
  state: () => ({
    usuarios: [],
    loading: false,
    error: null,
  }),

  actions: {
    // Busca todos os usuários
    async fetchUsuarios() {
      this.loading = true;
      this.error = null;
      try {
        this.usuarios = await usuariosService.getUsuarios();
      } catch (error) {
        this.error = 'Erro ao carregar usuários.';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    // Adiciona um novo usuário
    async addUsuario(usuarioData) {
      try {
        const newUser = await usuariosService.addUsuario(usuarioData);
        this.usuarios.push(newUser);
      } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
        throw error;
      }
    },

    // Atualiza um usuário existente
    async updateUsuario(id, usuarioData) {
      try {
        await usuariosService.updateUsuario(id, usuarioData);
        const index = this.usuarios.findIndex((u) => u.id === id);
        if (index !== -1) {
          this.usuarios[index] = { ...this.usuarios[index], ...usuarioData };
        }
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        throw error;
      }
    },

    // Exclui um usuário
    async deleteUsuario(id) {
      try {
        await usuariosService.deleteUsuario(id);
        this.usuarios = this.usuarios.filter((u) => u.id !== id);
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        throw error;
      }
    },
  },
});
