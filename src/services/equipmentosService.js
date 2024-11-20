import { api } from 'src/boot/axios';

const equipamentosService = {
  async getEquipamentos() {
    const response = await api.get('/equipamentos');
    return response.data;
  },
  async addEquipamento(equipamento) {
    await api.post('/equipamentos', equipamento);
  },
  async updateEquipamento(id, equipamento) {
    await api.put(`/equipamentos/${id}`, equipamento);
  },
  async deleteEquipamento(id) {
    await api.delete(`/equipamentos/${id}`);
  },
};

export default equipamentosService;