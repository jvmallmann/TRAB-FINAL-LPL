import { api } from "src/boot/axios";

export default {
  async getPermissions() {
    try {
      const response = await api.get("/permissions");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar permissões:", error);
      throw error;
    }
  },
  async addPermission(permission) {
    try {
      const response = await api.post("/permissions", permission);
      return response.data;
    } catch (error) {
      console.error("Erro ao adicionar permissão:", error);
      throw error;
    }
  },
  async updatePermission(id, permission) {
    try {
      const response = await api.put(`/permissions/${id}`, permission);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar permissão:", error);
      throw error;
    }
  },
  async deletePermission(id) {
    try {
      await api.delete(`/permissions/${id}`);
    } catch (error) {
      console.error("Erro ao excluir permissão:", error);
      throw error;
    }
  }
};
