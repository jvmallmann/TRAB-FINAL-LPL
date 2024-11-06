<template>
  <q-layout view="hHh Lpr lFf">
    <!-- Cabeçalho -->
    <q-header elevated class="bg-primary">
      <q-toolbar>
        <q-btn flat @click="toggleDrawer" round dense icon="menu" />
        <q-toolbar-title>{{ pageTitle }}</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- Menu lateral -->
    <q-drawer
      v-model="drawer"
      show-if-above
      :width="220"
      style="background-color: #285430;"
      :breakpoint="500"
      class="custom-drawer"
    >
      <!-- Imagem e Informações do Usuário -->
      <q-img src="/src/assets/LOGO.png" class="user-banner"></q-img>

      <!-- Conteúdo principal do menu -->
      <q-scroll-area class="fit" style="height: calc(100% - 50px); margin-top: 20px;">
        <q-list padding class="main-menu-content">
          <q-item clickable v-ripple tag="router-link" to="/dashboard" @click="closeDrawer">
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>
            <q-item-section>Dashboard</q-item-section>
          </q-item>

          <q-item clickable v-ripple tag="router-link" to="/pacientes" @click="closeDrawer">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>Pacientes</q-item-section>
          </q-item>

          <q-item clickable v-ripple tag="router-link" to="/medicos" @click="closeDrawer">
            <q-item-section avatar>
              <q-icon name="local_hospital" />
            </q-item-section>
            <q-item-section>Médicos</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <!-- Perfil do Usuário e Logout fixos na parte inferior -->
      <q-list  class="user-menu-content" style="margin-top: auto;">
        <!-- Perfil do Usuário -->
        <q-item class="user" v-if="userName" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="account_circle" />
          </q-item-section>
          <q-item-section>{{ userName }}</q-item-section>
        </q-item>

        <!-- Logout -->
        <q-item to="/login" class="user" clickable v-ripple @click="logout">
          <q-item-section avatar>
            <q-icon name="exit_to_app" color="negative" />
          </q-item-section>
          <q-item-section class="text-negative">Sair</q-item-section>
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
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const drawer = ref(true);
const router = useRouter();
const route = useRoute();
const userName = ref(localStorage.getItem('loggedInUserName') || 'Usuário');

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const closeDrawer = () => {
  drawer.value = false;
};

const logout = () => {
  localStorage.removeItem('loggedInUserName');
  userName.value = 'Usuário';
  router.push('/login');
};

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

}

.user-banner {
  height: 110px;
  padding: 10px;
  margin-top: 20px;
}

.main-menu-content {
  flex: 1;
}

.user-menu-content {
  margin-top: 1px;
  border-top: 1px solid #444;
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

.q-item-section {
  color: #FFBB56;
}

.q-item-section:hover {
  color: #ab1717;
}
</style>
