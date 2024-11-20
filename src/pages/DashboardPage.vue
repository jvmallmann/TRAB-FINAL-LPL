<template>
  <q-layout view="hHh Lpr lFf">
    <!-- Conteúdo principal -->
    <q-page-container>
      <q-page class="q-pa-lg custom-page">
        <div class="dashboard-grid">
          <!-- Calendário -->
          <div class=" calendar-card">
            <EventCalendar :events="calendarEvents" />
          </div>
            <!-- Equipamentos com Defeitos -->
            <div class="info-card">
              <h3 class="info-card-title">Equipamentos com Defeitos</h3>
              <ul>
                <li class="info-card-item" v-for="equipamento in equipamentos" :key="equipamento.id">
                  <span class="icon material-symbols-outlined">build</span>
                  <div>
                    <p>{{ equipamento.nome }}</p>
                    <p class="text-sm">{{ equipamento.defeito }}</p>
                  </div>
                </li>
              </ul>
            </div>
          <!-- Médicos Ativos -->
          <div class="info-card">
            <h3 class="info-card-title">Médicos Ativos</h3>
            <ul>
              <li class="info-card-item" v-for="medico in medicos" :key="medico.id">
                <img
                  src="https://via.placeholder.com/30"
                  alt="Médico"
                  class="avatar"
                />
                <div>
                  <p>{{ medico.especialidade }}</p>
                  <p class="text-sm">{{ medico.nome }}</p>
                </div>
              </li>
            </ul>
          </div>

           <!-- Pacientes Ativos -->
           <div class="info-card">
            <h3 class="info-card-title">Pacientes Ativos</h3>
            <ul>
              <li class="info-card-item" v-for="paciente in pacientes" :key="paciente.id">
                <img
                  src="https://via.placeholder.com/30"
                  alt="Paciente"
                  class="avatar"
                />
                <div>
                  <p>{{ paciente.nome }}</p>
                  <p class="text-sm">{{ paciente.idade }} anos</p>
                </div>
              </li>
            </ul>
          </div>

          <!-- Enfermeiros Ativos -->
          <div class="info-card">
            <h3 class="info-card-title">Enfermeiros Ativos</h3>
            <ul>
              <li class="info-card-item" v-for="enfermeiro in enfermeiros" :key="enfermeiro.id">
                <img
                  src="https://via.placeholder.com/30"
                  alt="Enfermeiro"
                  class="avatar"
                />
                <div>
                  <p>{{ enfermeiro.area }}</p>
                  <p class="text-sm">{{ enfermeiro.nome }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import EventCalendar from 'src/components/Calendar.vue';
import { useDashboardStore } from 'src/stores/dashboardStore';

const store = useDashboardStore();

onMounted(() => {
  store.fetchDashboardData();
});

// Computed properties para dados reativos
const medicos = computed(() => store.medicos || []);
const enfermeiros = computed(() => store.enfermeiros || []);
const equipamentos = computed(() => store.equipamentos || []);
const pacientes = computed(() => store.pacientes || []);
const calendarEvents = computed(() => store.events || []);
</script>

<style scoped>
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Define 3 colunas */
  gap: 20px; /* Espaçamento entre os cards */
  margin: 0 auto;
  max-width: 1200px;
}

.info-card {
  background-color: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 9px 9px 10px 10px;
  border: 2px solid #285430;
}

.info-card-title {
  background-color: #285430;
  color: white;
  text-align: center;
  border-radius: 10px 10px 0px 0px;
  margin-top: -5px;
  font-size: 1rem;
  border: 1px solid #285430;

}

.info-card-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background-color: #eef5ef;
  border-radius: 4px;
  margin-top: 8px;
}

.avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.icon {
  font-size: 18px;
  color: #285430;
}

.calendar-card {
  grid-column: span 2;
  border-radius: 9px 9px 10px 10px;
  border: 2px solid #285430; /* Faz o calendário ocupar toda a largura (3 colunas) */
}
</style>
