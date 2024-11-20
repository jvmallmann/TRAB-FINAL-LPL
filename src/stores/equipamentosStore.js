import { defineStore } from 'pinia';
import equipamentosService from 'src/services/equipmentosService';

export const useEquipamentosStore = defineStore('equipamentos', {
  state: () => ({
    equipamentos: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchEquipamentos() {
      this.loading = true;
      try {
        this.equipamentos = await equipamentosService.getEquipamentos();
      } catch (error) {
        this.error = 'Erro ao carregar equipamentos';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async addEquipamento(equipamento) {
      try {
        await equipamentosService.addEquipamento(equipamento);
        await this.fetchEquipamentos();
      } catch (error) {
        console.error('Erro ao adicionar equipamento:', error);
      }
    },
    async updateEquipamento(id, equipamento) {
      try {
        await equipamentosService.updateEquipamento(id, equipamento);
        await this.fetchEquipamentos();
      } catch (error) {
        console.error('Erro ao atualizar equipamento:', error);
      }
    },
    async deleteEquipamento(id) {
      try {
        await equipamentosService.deleteEquipamento(id);
        await this.fetchEquipamentos();
      } catch (error) {
        console.error('Erro ao deletar equipamento:', error);
      }
    },
  },
});
