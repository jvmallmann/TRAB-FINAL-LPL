<template>
  <q-page>
    <q-card class="medicos-card">
      <q-card-section>
        <div class="text-h6">{{ pageTitle }}</div>
      </q-card-section>

      <!-- Formulário de Médico -->
      <q-form @submit.prevent="submitForm" class="q-gutter-md">
        <div class="q-gutter-sm row">
          <!-- Nome e Especialidade lado a lado -->
          <q-input
            v-model="medico.MedicoNome"
            label="Nome"
            outlined
            dense
            required
            class="col-5"
          />
          <q-input
            v-model="medico.Especialidade"
            label="Especialidade"
            outlined
            dense
            required
            class="col-5"
          />
        </div>
        <div class="q-gutter-sm row">
          <!-- CRM e Telefone lado a lado -->
          <q-input
            v-model="medico.CRM"
            label="CRM"
            outlined
            dense
            required
            class="col-4"
          />
          <q-input
            v-model="medico.MedicoTelefone"
            label="Telefone"
            outlined
            dense
            required
            class="col-4"
          />
        </div>

        <!-- Botões -->
        <div class="button-container">
          <q-btn type="submit" label="Salvar" color="primary" />
          <q-btn
            to="/medicos"
            label="Cancelar"
            class="bg-negative text-white"
            flat
          />
        </div>
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
        medico.value = { ...existingMedico };
      }
    } catch (error) {
      console.error('Erro ao carregar dados do médico:', error);
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
    console.error('Erro ao salvar dados do médico:', error);
  }
};
</script>

<style scoped>
.medicos-card {
  max-width: 1300px;
  margin: auto;
  margin-top: 20px;
  border-top: 5px solid #285430;
}

.q-form {
  padding: 10px;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.row {
  margin-bottom: 15px;
}
</style>
