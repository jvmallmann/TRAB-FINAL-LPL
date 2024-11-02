<template>
  <q-page>
    <q-card class="pacientes-card">
      <q-card-section>
        <div class="text-h6">{{ pageTitle }}</div>
      </q-card-section>

      <q-form @submit.prevent="submitForm">
        <q-input v-model="paciente.PacienteNome" label="Nome" outlined dense />
        <q-input v-model="paciente.DataNascimento" label="Data de Nascimento" outlined dense type="date" />
        <q-input v-model="paciente.Sexo" label="Sexo" outlined dense />
        <q-input v-model="paciente.Endereco" label="Endereço" outlined dense />

        <q-btn type="submit" label="Salvar" color="primary" class="q-mt-md" />
        <q-btn
          to="/pacientes"
          style="background-color: #882e25; float: right; color: white;"
          class="q-mt-md"
          label="Cancelar"
          flat
        />
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePacientesStore } from 'src/stores/pacientesStore';

const route = useRoute();
const router = useRouter();
const pacientesStore = usePacientesStore();

const paciente = ref({
  PacienteNome: '',
  DataNascimento: '',
  Sexo: '',
  Endereco: ''
});

const isEditMode = computed(() => route.path !== '/pacientes/novo');

const pageTitle = computed(() =>
  isEditMode.value ? `Editar Paciente - ${paciente.value.PacienteNome || ''}` : 'Novo Paciente'
);

onMounted(async () => {
  if (isEditMode.value) {
    const pacienteId = route.params.id;
    try {
      const existingPaciente = await pacientesStore.fetchPacienteById(pacienteId);
      if (existingPaciente) {
        paciente.value = existingPaciente;
      }
    } catch (error) {
      console.error("Erro ao carregar dados do paciente:", error);
    }
  }
});

const submitForm = async () => {
  try {
    if (isEditMode.value) {
      await pacientesStore.updatePaciente(route.params.id, paciente.value);
    } else {
      await pacientesStore.addPaciente(paciente.value);
    }
    router.push('/pacientes');
  } catch (error) {
    console.error("Erro ao salvar dados do paciente:", error);
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

.q-form {
  padding: 10px;
}

.q-input {
  margin: 5px;
}
</style>
