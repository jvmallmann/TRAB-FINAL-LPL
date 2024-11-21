import { defineStore } from 'pinia';
import usuariosService from 'src/services/usuarioService';

export const useUsuariosStore = defineStore('usuariosStore', {
  state: () => ({
    usuarios: [],
  }),

  actions: {
    // Obtém todos os usuários e atualiza o estado
    async fetchUsuarios() {
      try {
        const data = await usuariosService.getUsuarios();
        console.log("Usuários carregados:", data); // Verifica os dados carregados
        this.usuarios = data.map(user => ({
          id: user.id,
          Name: user.Name,
          Email: user.Email,
          Username: user.Username,
          Permissao: user.Permissao
        }));
      } catch (error) {
        console.error("Erro ao buscar usuários no store:", error);
      }
    },

    async fetchPermissions() {
      try {
        const data = await usuariosService.getPermissions();
        this.permissions = data; // Atualiza o estado com as permissões
      } catch (error) {
        console.error('Erro ao buscar permissões no store:', error);
      }
    },
    // Adiciona um novo usuário
    async addUsuario(usuarioData) {
      try {
        await usuariosService.addUsuario(usuarioData);
        await this.fetchUsuarios(); // Atualiza a lista após adicionar
      } catch (error) {
        console.error('Erro ao adicionar usuário no store:', error);
      }
    },

    // Atualiza um usuário existente
    async updateUsuario(id, usuarioData) {
      try {
        await usuariosService.updateUsuario(id, usuarioData);
        await this.fetchUsuarios(); // Atualiza a lista após editar
      } catch (error) {
        console.error('Erro ao atualizar usuário no store:', error);
      }
    },

    // Remove um usuário
    async deleteUsuario(id) {
      try {
        await usuariosService.deleteUsuario(id);
        await this.fetchUsuarios(); // Atualiza a lista após excluir
      } catch (error) {
        console.error('Erro ao excluir usuário no store:', error);
      }
    },
  },
});
