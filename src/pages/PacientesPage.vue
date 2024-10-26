<!-- src/pages/PacientesPage.vue -->
<template>
  <q-page>
    <q-card>
      <q-card-section>
        <div class="text-h6">Lista de Pacientes</div>
      </q-card-section>

      <!-- Exibindo o estado de carregamento -->
      <q-spinner v-if="loading" color="primary" size="40px" class="q-my-md" />

      <!-- Exibindo erro -->
      <div v-if="error" class="text-negative q-pa-md">{{ error }}</div>

      <!-- Exibindo a lista de pacientes -->
      <q-list v-if="!loading && !error">
        <q-item v-for="paciente in pacientes" :key="paciente.PacienteID">
          <q-item-section>
            <q-item-label>{{ paciente.PacienteNome }}</q-item-label>
            <q-item-label caption>{{ paciente.DataNascimento }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { usePacientesStore } from 'src/stores/pacientesStore';

const pacientesStore = usePacientesStore();

const loading = computed(() => pacientesStore.loading);
const error = computed(() => pacientesStore.error);
const pacientes = computed(() => pacientesStore.pacientes);

onMounted(async () => {
  try {
    await pacientesStore.fetchPacientes();
  } catch (err) {
    console.error("Erro ao buscar pacientes:", err);
  }
});
</script>

<style scoped>
.q-card-section {
  text-align: center;
  padding: 20px;
}

.q-list {
  padding: 20px;
}

.q-item {
  margin-bottom: 10px;
}
</style>
