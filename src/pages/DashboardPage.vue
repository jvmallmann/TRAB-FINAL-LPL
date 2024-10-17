<!-- src/pages/DashboardPage.vue -->
<template>
    <q-layout view="lHh Lpr lFf">
     

      <!-- Conteúdo principal -->
      <q-page-container>
        <q-page class="q-pa-lg custom-page">
          <!-- Spinner de carregamento -->
          <q-spinner v-if="loading" size="30px" color="primary" />
          <div v-if="error" class="text-negative">{{ error }}</div>

          <!-- Cards principais -->
          <div class="row q-gutter-md q-justify-center q-mt-md" v-if="!loading && !error">
            <!-- Card de Pacientes -->
            <q-card class="col-5 custom-card">
              <q-card-section>
                <div class="text-h6 card-title">Pacientes</div>
                <q-separator class="q-mb-md" />
                <div v-if="pacientes.length > 0">
                  <q-item-label v-for="paciente in pacientes" :key="paciente.id">
                    {{ paciente.PacienteNome || 'Nome não disponível' }}
                  </q-item-label>
                </div>
                <div v-else>Nenhum dado disponível para pacientes.</div>
              </q-card-section>
            </q-card>

            <!-- Card de Médicos -->
            <q-card class="col-5 custom-card">
              <q-card-section>
                <div class="text-h6 card-title">Médicos</div>
                <q-separator class="q-mb-md" />
                <div v-if="medicos.length > 0">
                  <q-item-label v-for="medico in medicos" :key="medico.id">
                    {{ medico.MedicoNome || 'Nome não disponível' }}
                  </q-item-label>
                </div>
                <div v-else>Nenhum dado disponível para médicos.</div>
              </q-card-section>
            </q-card>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useDashboardStore } from 'src/stores/dashboardStore';

const store = useDashboardStore();

onMounted(() => {
  store.fetchDashboardData();
});

// Computed properties para dados reativos
const loading = computed(() => store.loading);
const error = computed(() => store.error);
const pacientes = computed(() => store.pacientes);
const medicos = computed(() => store.medicos);
</script>

<style scoped>
/* Estilização personalizada para a dashboard */
.custom-drawer {
  background-color: #f7f7f7;
}

.custom-page {
  background-color: #f0f0f0;
}

.custom-card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  margin: 15px;
}

.card-title {
  color: #2c7c83;
  font-weight: bold;
  text-align: center;
}

.q-drawer a {
  color: #333;
}

.q-drawer a:hover {
  color: #2c7c83;
}
</style>
