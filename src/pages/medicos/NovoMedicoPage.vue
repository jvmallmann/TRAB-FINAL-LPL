<template>
    <q-page>
      <q-card class="medicos-card">
        <q-card-section>
          <div class="text-h6">{{ pageTitle }}</div>
        </q-card-section>
  
        <!-- Formulário de Médico -->
        <q-form @submit.prevent="submitForm">
          <q-input v-model="medico.MedicoNome" label="Nome" outlined dense />
          <q-input v-model="medico.Especialidade" label="Especialidade" outlined dense />
          <q-input v-model="medico.CRM" label="CRM" outlined dense />
          <q-input v-model="medico.MedicoTelefone" label="Telefone" outlined dense />
  
          <q-btn type="submit" label="Salvar" color="primary" class="q-mt-md" />
          <q-btn
            to="/medicos"
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
import { useMedicosStore } from 'src/stores/medicosStore';

const route = useRoute();
const router = useRouter();
const MedicosStore = useMedicosStore();

const isEditMode = computed(() => route.path !== '/medicos/novo');
const medico = ref({
  MedicoNome: '',
  Especialidade: '',
  CRM: '',
  MedicoTelefone: ''
});

const pageTitle = computed(() =>
  isEditMode.value ? `Editar Médico - ${medico.value.MedicoNome || ''}` : 'Novo Médico'
);

onMounted(async () => {
  if (isEditMode.value) {
    const medicoId = route.params.id;
    try {
      const existingMedico = await MedicosStore.fetchMedicoById(medicoId);
      if (existingMedico) {
        medico.value = { ...existingMedico }; // Atualiza os dados do médico para edição
      }
    } catch (error) {
      console.error("Erro ao carregar dados do médico:", error);
    }
  }
});

const submitForm = async () => {
  try {
    if (isEditMode.value) {
      await MedicosStore.updateMedico(route.params.id, medico.value);
    } else {
      await MedicosStore.addMedico(medico.value);
    }
    router.push('/medicos');
  } catch (error) {
    console.error("Erro ao salvar dados do médico:", error);
  }
};
</script>
  
  <style scoped>
  .medicos-card {
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
  