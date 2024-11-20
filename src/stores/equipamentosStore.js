// src/stores/equipamentosStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useEquipamentosStore = defineStore('equipamentos', {
  state: () => ({
    equipamentos: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchEquipamentos() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('http://localhost:3000/equipamentos');
        this.equipamentos = response.data;
      } catch (err) {
        this.error = 'Erro ao carregar equipamentos.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async addEquipamento(novoEquipamento) {
      try {
        const response = await axios.post('http://localhost:3000/equipamentos', novoEquipamento);
        this.equipamentos.push(response.data);
      } catch (err) {
        this.error = 'Erro ao adicionar equipamento.';
        console.error(err);
      }
    },

    async updateEquipamento(id, equipamentoAtualizado) {
      try {
        await axios.put(`http://localhost:3000/equipamentos/${id}`, equipamentoAtualizado);
        const index = this.equipamentos.findIndex(equipamento => equipamento.id === id);
        if (index !== -1) {
          this.equipamentos[index] = { ...this.equipamentos[index], ...equipamentoAtualizado };
        }
      } catch (err) {
        this.error = 'Erro ao atualizar equipamento.';
        console.error(err);
      }
    },

    async deleteEquipamento(id) {
      try {
        await axios.delete(`http://localhost:3000/equipamentos/${id}`);
        this.equipamentos = this.equipamentos.filter(equipamento => equipamento.id !== id);
      } catch (err) {
        this.error = 'Erro ao deletar equipamento.';
        console.error(err);
      }
    },
  },

  getters: {
    equipamentosComDefeito: state => {
      return state.equipamentos.filter(equipamento => equipamento.Status === 'X');
    },
  },
});
