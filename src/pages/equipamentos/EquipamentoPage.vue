<template>
  <q-page>
    <q-card class="equipamentos-card">
      <div class="header-title">Gerenciar Equipamentos</div>

      <q-card-section>
        <div class="q-gutter-sm row items-center justify-between">
          <q-input
            outlined
            dense
            placeholder="Pesquisar"
            v-model="search"
            class="search-input"
            prefix-icon="search"
          />

          <q-btn
            label="Novo Equipamento"
            icon="add"
            color="primary"
            class="q-ml-md"
            @click="addEquipamento"
          />
        </div>
      </q-card-section>

      <!-- Tabela de Equipamentos -->
      <q-table
        :rows="filteredEquipamentos"
        :columns="columns"
        row-key="id"
        flat
        dense
        class="equipamentos-table"
        v-model:pagination="pagination"
      >
        <template v-slot:body-cell-actions="props">
          <q-td align="center" style="white-space: nowrap;">
            <q-btn
              icon="delete"
              color="negative"
              flat
              dense
              @click="deleteEquipamento(props.row.id)"
            />
            <q-btn
              icon="edit"
              color="primary"
              flat
              dense
              class="q-ml-md"
              @click="editEquipamento(props.row.id)"
            />
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useEquipamentosStore } from 'src/stores/equipamentosStore';
import { useRouter } from 'vue-router';

const EquipamentosStore = useEquipamentosStore();
const router = useRouter();
const search = ref('');

// Definindo as colunas da tabela
const columns = [
  { name: 'Descricao', label: 'Descrição', align: 'left', field: 'Descricao' },
  { name: 'Fabricante', label: 'Fabricante', align: 'left', field: 'Fabricante' },
  { name: 'DataCompra', label: 'Data de Compra', align: 'left', field: 'DataCompra' },
  { name: 'StatusEquipamento', label: 'Status', align: 'center', field: 'StatusEquipamento' },
  { name: 'actions', label: 'Ações', align: 'center' },
];

// Computed para filtrar os equipamentos com base na pesquisa
const filteredEquipamentos = computed(() => {
  return EquipamentosStore.equipamentos.filter((equipamento) =>
    equipamento.Descricao.toLowerCase().includes(search.value.toLowerCase())
  );
});

onMounted(() => {
  EquipamentosStore.fetchEquipamentos();
});

const addEquipamento = () => {
  router.push('/equipamentos/novo');
};

const editEquipamento = (equipamentoID) => {
  router.push(`/equipamentos/edit/${equipamentoID}`);
};

const deleteEquipamento = async (equipamentoID) => {
  try {
    await EquipamentosStore.deleteEquipamento(equipamentoID);
  } catch (error) {
    console.error('Erro ao excluir equipamento:', error);
  }
};

// Função para atualizar o status do equipamento
const updateStatus = async (id, newStatus) => {
  try {
    await EquipamentosStore.updateEquipamentoStatus(id, newStatus);
    console.log(`Status do equipamento ${id} atualizado para ${newStatus}`);
  } catch (error) {
    console.error('Erro ao atualizar status do equipamento:', error);
  }
};

const pagination = ref({
  page: 1,         // Página inicial
  rowsPerPage: 10, // Quantidade de registros por página
  rowsNumber: 0,   // Quantidade total de registros (atualizado automaticamente)
});          

</script>

<style scoped>
.header-title {
  font-size: 1.50rem;
  margin-top: 5px;
  margin-left: 10px;
}

.equipamentos-card {
  max-width: 1400px;
  margin: auto;
  margin-top: 20px;
  border-top: 5px solid #285430;
}

.search-input {
  max-width: 1080px;
}

.equipamentos-table {
  min-width: 1080px;
}
</style>
