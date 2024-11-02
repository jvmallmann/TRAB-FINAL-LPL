<template>
  <q-layout view="hHh Lpr lFf">
    <!-- Cabeçalho -->
    <q-header elevated :class="$q.dark.isActive ? 'bg-primary' : 'bg-primary'">
      <q-toolbar>
        <q-btn flat @click="toggleDrawer" round dense icon="menu" />
        <q-toolbar-title>{{ pageTitle }}</q-toolbar-title>
      </q-toolbar>
    </q-header>

        <!-- Menu lateral -->
        <q-drawer
      v-model="drawer"
      style="background-color: #285430; display: flex; flex-direction: column;" 
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
      <!-- Conteúdo principal do menu -->
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
        <q-list padding class="main-menu-content">
          <q-item clickable v-ripple tag="router-link" to="/dashboard" @click="closeDrawer">
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>
            <q-item-section v-if="!miniState">Dashboard</q-item-section>
          </q-item>

          <q-item clickable v-ripple tag="router-link" to="/pacientes" @click="closeDrawer">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section v-if="!miniState">Pacientes</q-item-section>
          </q-item>

          <q-item clickable v-ripple tag="router-link" to="/medicos" @click="closeDrawer">
            <q-item-section avatar>
              <q-icon name="local_hospital" />
            </q-item-section>
            <q-item-section v-if="!miniState">Médicos</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <!-- Perfil do Usuário e Logout no final do drawer -->
      <q-list padding class="user-menu-content">


        <!-- Perfil do Usuário -->
        <q-item class="user" v-if="userName" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="account_circle" />
          </q-item-section>
          <q-item-section v-if="!miniState">{{ userName }}</q-item-section>
        </q-item>

        <!-- Logout -->
        <q-item to="/login" class="user" clickable v-ripple @click="logout">
          <q-item-section avatar>
            <q-icon name="exit_to_app" />
          </q-item-section>
          <q-item-section v-if="!miniState" class="">Sair</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Conteúdo principal -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const drawer = ref(true);
const miniState = ref(true);
const router = useRouter();
const route = useRoute();

const userName = ref(localStorage.getItem('loggedInUserName') || '');

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const closeDrawer = () => {
  drawer.value = false;
};

const logout = () => {
  localStorage.removeItem('loggedInUserName'); // Remove o nome do usuário
  userName.value = ''; // Limpa o nome do usuário localmente
  router.push('/login'); // Redireciona para a página de login
};

// Atualiza o título do cabeçalho com base na rota
const pageTitle = ref('');
watch(
  () => route.path,
  (newPath) => {
    if (newPath.includes('dashboard')) pageTitle.value = 'Dashboard';
    else if (newPath.includes('pacientes')) pageTitle.value = 'Pacientes';
    else if (newPath.includes('medicos')) pageTitle.value = 'Médicos';
    else pageTitle.value = '';
  },
  { immediate: true }
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

.main-menu-content {
  flex: 1;
}

.user-menu-content {
  margin-top: auto;
}

.q-drawer a {
  color: #ffffff;
  border-radius: 0px 15px 15px 0px;
}

.q-drawer a:hover {
  color: #FFBB56;
  background-color: black;
  margin-right: 8px;
  border-radius: 0px 15px 15px 0px;
}

.user {
  color: #ffffff;
}

.q-item-section {
  color: #FFBB56;
}

.q-item-section:hover {
  color: #ab1717;
}
</style>
