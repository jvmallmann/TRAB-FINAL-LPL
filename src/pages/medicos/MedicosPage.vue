<template>
  <q-page>
    <q-card class="medicos-card">
      <div class="header-title">Gerenciar Médicos</div>

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
            label="Novo Médico"
            icon="add"
            color="primary"
            class="q-ml-md"
            @click="addMedico"
          />
        </div>
      </q-card-section>

      <!-- Tabela de Médicos -->
      <q-table
        :rows="filteredMedicos"
        :columns="columns"
        row-key="id"
        flat
        dense
        class="medicos-table"
        v-model:pagination="pagination"
      >
        <template v-slot:body-cell-actions="props">
          <q-td align="center" style="white-space: nowrap;">
            <q-btn
              icon="delete"
              color="negative"
              flat
              dense
              @click="deleteMedico(props.row.id)"
            />
            <q-toggle
              v-model="props.row.Status"
              color="green"
              left-label
              label="Ativo"
              dense
              class="q-ml-md"
              :true-value="'A'"
              :false-value="'X'"
              @update:model-value="(val) => updateStatus(props.row.id, val)"
            />
            <q-btn
              icon="edit"
              color="primary"
              flat
              dense
              class="q-ml-md"
              @click="editMedico(props.row.id)"
            />
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useMedicosStore } from 'src/stores/MedicosStore';
import { useRouter } from 'vue-router';

const MedicosStore = useMedicosStore();
const router = useRouter();
const search = ref('');

// Definindo as colunas da tabela
const columns = [
  { name: 'MedicoNome', label: 'Nome', align: 'left', field: 'MedicoNome' },
  { name: 'CRM', label: 'CRM', align: 'left', field: 'CRM' },
  { name: 'MedicoTelefone', label: 'Telefone', align: 'left', field: 'MedicoTelefone' },
  { name: 'Especialidade', label: 'Especialidade ', align: 'left', field: 'Especialidade' },
  { name: 'actions', label: 'Ações', align: 'center' },
];

// Computed para filtrar os médicos com base na pesquisa
const filteredMedicos = computed(() => {
  return MedicosStore.medicos.filter((medico) =>
    medico.MedicoNome.toLowerCase().includes(search.value.toLowerCase())
  );
});

onMounted(() => {
  MedicosStore.fetchMedicos();
});

const addMedico = () => {
  router.push('/medicos/novo');
};

const editMedico = (medicoID) => {
  router.push(`/medicos/edit/${medicoID}`);
};

const deleteMedico = async (medicoID) => {
  try {
    await MedicosStore.deleteMedico(medicoID);
  } catch (error) {
    console.error('Erro ao excluir médico:', error);
  }
};

// Função para atualizar o status do médico
const updateStatus = async (id, newStatus) => {
  try {
    await MedicosStore.updateMedicoStatus(id, newStatus);
    console.log(`Status do médico ${id} atualizado para ${newStatus}`);
  } catch (error) {
    console.error('Erro ao atualizar status do médico:', error);
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

.medicos-card {
  max-width: 1400px;
  margin: auto;
  margin-top: 20px;
  border-top: 5px solid #285430;
}

.search-input {
  max-width: 1080px;
}

.medicos-table {
  min-width: 1080px;
}
</style>
