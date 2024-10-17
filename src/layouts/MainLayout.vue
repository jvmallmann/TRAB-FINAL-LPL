<!-- src/layouts/MainLayout.vue -->
<template>
  <q-layout view="hHh Lpr lFf">
    <!-- Cabeçalho -->
    <q-header elevated :class="$q.dark.isActive ? 'bg-primary' : 'bg-primary'">
      <q-toolbar>
        <q-btn flat @click="toggleDrawer" round dense icon="menu" />
        <q-toolbar-title>Dashboard</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- Menu lateral -->
    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="miniState"
      @mouseenter="miniState = false"
      @mouseleave="miniState = true"
      mini-to-overlay
      :width="200"
      :breakpoint="500"
      bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
        <q-list padding>
          <q-item clickable v-ripple tag="router-link" to="/pacientes">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section v-if="!miniState">
              Pacientes
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple tag="router-link" to="/medicos">
            <q-item-section avatar>
              <q-icon name="local_hospital" />
            </q-item-section>
            <q-item-section v-if="!miniState">
              Médicos
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple tag="router-link" to="/enfermarias">
            <q-item-section avatar>
              <q-icon name="meeting_room" />
            </q-item-section>
            <q-item-section v-if="!miniState">
              Enfermarias
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple tag="router-link" to="/equipamentos">
            <q-item-section avatar>
              <q-icon name="build" />
            </q-item-section>
            <q-item-section v-if="!miniState">
              Equipamentos
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <!-- Conteúdo principal -->
    <q-page-container>
      <q-page padding>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';

const drawer = ref(true);
const miniState = ref(true);

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};
</script>

<style scoped>
.custom-drawer {
  background-color: #285430;
  color: #285430;
  width: 250px;
}

.q-toolbar-title {
  font-weight: bold;
}

.q-drawer a {
  color: #285430;
}

.q-drawer a:hover {
  color: #FFBB56;
}

.q-item-section {
  color: #FFBB56; /* Garante que o texto do menu seja branco */
}

.q-item-section:hover {
  color: #d4d4d4; /* Cor ao passar o mouse */
}
</style>
