<!-- src/pages/PacientesPage.vue -->
<template>
  <q-page>
    <q-card class="pacientes-card">
        <div class="header-title">Gerenciar Pacientes</div>
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
            label="Novo Paciente"
            icon="add"
            color="primary"
            class="q-ml-md"
            @click="addPaciente"
          />
        </div>
      </q-card-section>

      <!-- Tabela de Pacientes -->
      <q-table
        :rows="filteredPacientes"
        :columns="columns"
        row-key="PacienteID"
        flat
        dense
        class="pacientes-table"
      >
        <template v-slot:body-cell-actions="props">
          <q-td align="center" style="white-space: nowrap;">
            <q-btn
              icon="delete"
              color="negative"
              flat
              dense
              @click="deletePaciente(props.row.id)"
            />
            <q-toggle
              v-model="props.row.status"
              color="green"
              left-label
              label="Ativo"
              dense
              class="q-ml-md"
            />
            <q-btn
              icon="edit"
              color="primary"
              flat
              dense
              class="q-ml-md"
              @click="editPaciente(props.row.id)"
            />
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { usePacientesStore } from 'src/stores/pacientesStore';
import { useRouter } from 'vue-router';

const pacientesStore = usePacientesStore();
const router = useRouter();
const search = ref('');

// Definindo as colunas da tabela
const columns = [
  { name: 'PacienteNome', label: 'Nome', align: 'left', field: 'PacienteNome' },
  { name: 'DataNascimento', label: 'Data de Nascimento', align: 'left', field: 'DataNascimento' },
  {
    name: 'Sexo',
    label: 'Sexo',
    align: 'left',
    field: 'Sexo',
    format: (val) => (val === 'F' ? 'Feminino' : val === 'M' ? 'Masculino' : val)
  },
  { name: 'Endereco', label: 'Endereço', align: 'left', field: 'Endereco' },
  { name: 'actions', label: 'Ações', align: 'center' }
];

// Computed para filtrar os pacientes com base na pesquisa
const filteredPacientes = computed(() => {
  return pacientesStore.pacientes.filter((paciente) =>
    paciente.PacienteNome.toLowerCase().includes(search.value.toLowerCase())
  );
});

onMounted(() => {
  pacientesStore.fetchPacientes();
});

const addPaciente = () => {
  router.push('/pacientes/novo');
};

const editPaciente = (pacienteID) => {
  router.push(`/pacientes/edit/${pacienteID}`);
};

const deletePaciente = async (pacienteID) => {
  try {
    await pacientesStore.deletePaciente(pacienteID);
  } catch (error) {
    console.error("Erro ao excluir paciente:", error);
  }
};
</script>

<style scoped>
.pacientes-card {
  max-width: 1400px;
  margin: auto;
  margin-top: 20px;
  border-top: 5px solid #285430;
}

.search-input {
  max-width: 1080px;
}

.pacientes-table {
  min-width: 1080px;
}

.header-title {
  font-size: 1.50rem;
  margin-top: 5px;
  margin-left: 10px;
}
</style>
