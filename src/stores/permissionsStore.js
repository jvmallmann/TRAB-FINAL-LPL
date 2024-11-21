import { defineStore } from "pinia";
import permissionsService from "src/services/permissionsService";

export const usePermissionsStore = defineStore("permissionsStore", {
  state: () => ({
    permissions: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchPermissions() {
      this.loading = true;
      this.error = null;
      try {
        const data = await permissionsService.getPermissions();
        this.permissions = data;
      } catch (error) {
        this.error = "Erro ao carregar permissões.";
      } finally {
        this.loading = false;
      }
    },
    async addPermission(permission) {
      try {
        const newPermission = await permissionsService.addPermission(permission);
        this.permissions.push(newPermission);
      } catch (error) {
        this.error = "Erro ao adicionar permissão.";
      }
    },
    async updatePermission(id, updatedPermission) {
      try {
        const updated = await permissionsService.updatePermission(id, updatedPermission);
        const index = this.permissions.findIndex((p) => p.id === id);
        if (index !== -1) this.permissions[index] = updated;
      } catch (error) {
        this.error = "Erro ao atualizar permissão.";
      }
    },
    async deletePermission(id) {
      try {
        await permissionsService.deletePermission(id);
        this.permissions = this.permissions.filter((p) => p.id !== id);
      } catch (error) {
        this.error = "Erro ao excluir permissão.";
      }
    }
  }
});
