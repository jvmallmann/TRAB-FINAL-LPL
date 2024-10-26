<!-- src/layouts/MainLayout.vue -->
<template>
  <q-layout view="hHh Lpr lFf">
    <!-- Cabeçalho -->
    <q-header elevated :class="$q.dark.isActive ? 'bg-primary' : 'bg-primary'">
      <q-toolbar>
        <q-btn flat @click="toggleDrawer" round dense icon="menu" />
      </q-toolbar>
    </q-header>

    <!-- Menu lateral -->
    <q-drawer
      v-model="drawer"
      style="background-color: #285430;"
      show-if-above
      :mini="miniState"
      @mouseenter="miniState = false"
      @mouseleave="miniState = true"
      mini-to-overlay
      :width="200"
      :breakpoint="500"
      bordered
      class="custom-drawer"
    >
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
        <q-list padding>
          <q-item
            clickable
            v-ripple
            tag="router-link"
            to="/dashboard"
            @click="closeDrawer"
          >
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>
            <q-item-section v-if="!miniState">Dashboard</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            tag="router-link"
            to="/pacientes"
            @click="closeDrawer"
          >
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section v-if="!miniState">Pacientes</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            tag="router-link"
            to="/medicos"
            @click="closeDrawer"
          >
            <q-item-section avatar>
              <q-icon name="local_hospital" />
            </q-item-section>
            <q-item-section v-if="!miniState">Médicos</q-item-section>
          </q-item>


          <!-- Outros itens do menu... -->
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <!-- Conteúdo principal -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const drawer = ref(true);
const miniState = ref(true);
const router = useRouter();

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const closeDrawer = () => {
  drawer.value = false;
};

// Verifica mudanças na rota para resetar o drawer corretamente em cada página
watch(
  () => router.currentRoute.value.path,
  () => {
    drawer.value = true;
    miniState.value = true;
  }
);
</script>

<style scoped>
.custom-drawer {
  background-color: #285430;
  color: #ffffff;
  width: 250px;
}

.q-toolbar-title {
  font-weight: bold;
}

.q-drawer a {
  color: #ffffff;
}

.q-drawer a:hover {
  color: #FFBB56;
}

.q-item-section {
  color: #FFBB56;
}

.q-item-section:hover {
  color: #ab1717;
}
</style>
