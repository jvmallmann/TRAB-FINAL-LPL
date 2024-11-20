<template>
  <q-layout view="hHh Lpr lFf">
    <!-- Conteúdo principal -->
    <q-page-container>
      <q-page class="q-pa-lg custom-page">
        <div class="dashboard-grid">
          <!-- Calendário -->
          <div class="calendar-card">
            <EventCalendar :events="calendarEvents" />
          </div>

         <!-- Equipamentos com Defeitos -->
        <div class="info-card-equipamentos">
          <h3 class="info-card-title">Equipamentos com Defeitos</h3>
            <div class="scrollable-content-equipamentos">
              <ul>
                <li
                  class="info-card-item-equipamentos"
                  v-for="equipamento in equipamentosComDefeito"
                  :key="equipamento.id"
                >
                  <!-- Ícone fixo de ferramenta -->
                  <span class="icon">
                    <q-icon name="build" />
                  </span>
                  <div class="info-card-content">
                    <p class="info-title">{{ equipamento.Descricao }}</p>
                    <p class="info-subtitle">Fabricante: {{ equipamento.Fabricante }}</p>
                  </div>
                </li>
              </ul>
            </div>
        </div>

        <!-- Médicos Ativos -->
        <div class="info-card">
          <h3 class="info-card-title">Médicos Ativos</h3>
          <div class="scrollable-content">
            <ul>
              <li
                class="info-card-item"
                v-for="medico in medicosAtivos"
                :key="medico.id"
              >
                <!-- Ícone fixo de médico -->
                <span class="icon">
                  <q-icon name="local_hospital" />
                </span>
                <div class="info-card-content">
                  <p class="info-title">{{ medico.MedicoNome }}</p>
                  <p class="info-subtitle">Especialidade: {{ medico.Especialidade }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Enfermarias Disponíveis -->
        <div class="info-card">
          <h3 class="info-card-title">Enfermarias Disponíveis</h3>
          <div class="scrollable-content">
            <ul>
              <li
                class="info-card-item"
                v-for="enfermaria in enfermariasDisponiveis"
                :key="enfermaria.id"
              >
                <!-- Ícone fixo de enfermaria -->
                <span class="icon">
                  <q-icon name="hotel" />
                </span>
                <div class="info-card-content">
                  <p class="info-title">{{ enfermaria.EnfermariaNome }}</p>
                  <p class="info-subtitle">{{ enfermaria.Localizacao }}  -  Capacidade: {{ enfermaria.Capacidade }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Enfermeiros Ativos -->
          <div class="info-card">
            <h3 class="info-card-title">Enfermeiros Ativos</h3>
            <div class="scrollable-content">
              <ul>
                <li
                  class="info-card-item"
                  v-for="enfermeiro in enfermeirosAtivos"
                  :key="enfermeiro.id"
                >
                  <!-- Ícone fixo de enfermeiro -->
                  <span class="icon">
                    <q-icon name="local_hospital" />
                  </span>
                  <div class="info-card-content">
                    <p class="info-title">{{ enfermeiro.EnfermeiroNome }}</p>
                    <p class="info-subtitle">Turno: {{ enfermeiro.Turno }}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted, computed } from "vue";
import EventCalendar from "src/components/Calendar.vue";
import { useDashboardStore } from "src/stores/dashboardStore";

const store = useDashboardStore();

onMounted(() => {
  store.fetchDashboardData();
  console.log("Dados carregados:", store); // Depuração
});

// Computed properties para dados reativos
const calendarEvents = computed(() => store.events || []);

// Filtrar equipamentos com status "X"
const equipamentosComDefeito = computed(() =>
  store.equipamentos.filter((equipamento) => equipamento.Status === "X")
);

// Filtrar médicos com status "A" (ativos)
const medicosAtivos = computed(() =>
  store.medicos.filter((medico) => medico.Status === "A")
);

// Filtrar enfermarias com status "D" (disponíveis)
const enfermariasDisponiveis = computed(() =>
  store.enfermarias.filter((enfermaria) => enfermaria.Status === "D")
);

// Filtrar enfermeiros com status "A" (ativos)
const enfermeirosAtivos = computed(() =>
  store.enfermeiros.filter((enfermeiro) => enfermeiro.Status === "A")
);

console.log("Enfermeiros carregados:", store.enfermeiros);
</script>

<style scoped>
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Define 3 colunas */
  gap: 20px; /* Espaçamento entre os cards */
  margin: 0 auto;
  max-width: 1200px;
}

.avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}


.calendar-card {
  grid-column: span 2;
  border-radius: 9px 9px 10px 10px;
  border: 2px solid #285430;
  height: 400px; /* Altura reduzida */
  overflow-y: hidden; /* Impede overflow vertical */
}

.info-card-equipamentos {
  background-color: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  border: 2px solid #285430;
  height: 400px; /* Altura reduzida */
  overflow-y: auto; /* Habilita scroll, caso necessário */
}



.info-card {
  background-color: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  border: 2px solid #285430;
  height: auto; 
}

.info-card-title {
  background-color: #285430;
  color: #ffffff;
  text-align: center;
  padding: 10px;
  margin: 0;
  font-size: 20px;
  border-radius: 9px 9px 0 0;
}

.info-card ul {
  list-style: none;
  padding: 20px;
  margin: 0;
}

.info-card-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 12px;
  background-color: #f4f4f4;
  border-radius: 80px;
  margin-bottom: 10px;
  max-height: 100px;
  transition: background-color 1.3s ease;
}

.info-card-item-equipamentos {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 12px;
  background-color: #f4f4f4;
  border-radius: 80px;
  margin-bottom: 10px;
  margin-left: -18px;
  max-height: 100px;
  margin-right: 40px;
  transition: background-color 1.3s ease;

  /* Aumentar a largura */
  width: 100%; /* Define a largura como 95% do container pai */
}

.info-card-item:hover {
  background-color: #bbdbba;
}

.info-card-item-equipamentos:hover {
  background-color: #bbdbba;
}

.icon {
  font-size: 20px;
  color: #285430;
  background-color: #f4f4f4;
  padding: 8px;
  margin-left: 5px;
  border-radius: 50%;
}

.info-card-content {
  display: flex;
  flex-direction: column;
}

.info-title {
  font-weight: bold;
  font-size: 16px;
  margin: 0;
}

.info-subtitle {
  font-size: 0.85rem;
  color: #666666;
  margin: 0;
}

.scrollable-content {
  max-height: 250px; /* Altura máxima para o scroll */
  overflow-y: auto; /* Habilita scroll vertical */
  padding-right: 8px; /* Espaço para a barra de rolagem */
}

.scrollable-content::-webkit-scrollbar {
  width: 3px; /* Largura da barra de rolagem */
}

.scrollable-content::-webkit-scrollbar-thumb {
  background: #285430; /* Cor do thumb */
  border-radius: 3px;
}

.scrollable-content::-webkit-scrollbar-thumb:hover {
  background: #1d3728; /* Cor ao passar o mouse */
}


.scrollable-content-equipamentos {
  max-height: 320px; /* Altura máxima específica para o scroll do Equipamentos com Defeitos */
  overflow-y: auto; /* Habilita scroll vertical */
  padding-right: 8px; /* Espaço para a barra de rolagem */
}

.scrollable-content-equipamentos::-webkit-scrollbar {
  width: 3px; /* Largura da barra de rolagem */
}

.scrollable-content-equipamentos::-webkit-scrollbar-thumb {
  background: #285430; /* Cor do thumb */
  border-radius: 3px;
}

.scrollable-content-equipamentos::-webkit-scrollbar-thumb:hover {
  background: #1d3728; /* Cor ao passar o mouse */
}


</style>
