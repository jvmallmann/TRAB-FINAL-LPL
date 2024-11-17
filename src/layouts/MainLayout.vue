<template>
  <q-layout view="hHh Lpr lFf">
    <!-- Menu lateral -->
    <q-drawer
      v-model="drawer"
      :mini="miniDrawer"
      show-if-above
      :width="220"
      mini-to-overlay
      style="background-color: #285430; display: flex; flex-direction: column;"
      class="custom-drawer"
    >
      <q-btn
        flat
        @click="toggleDrawer"
        round
        dense
        icon="menu"
        style="color: aliceblue; margin: 8px;"
      />

      <!-- Imagem do Logo -->
      <q-img src="/src/assets/LOGO.png" class="user-banner" v-if="!miniDrawer"></q-img>

      <!-- Menu principal -->
      <q-list padding class="main-menu-content">
        <q-item clickable v-ripple tag="router-link" to="/dashboard" @click="closeDrawer">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section v-if="!miniDrawer">Dashboard</q-item-section>
        </q-item>

        <q-item clickable v-ripple tag="router-link" to="/pacientes" @click="closeDrawer">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section v-if="!miniDrawer">Pacientes</q-item-section>
        </q-item>

        <q-item clickable v-ripple tag="router-link" to="/medicos" @click="closeDrawer">
          <q-item-section avatar>
            <q-icon name="local_hospital" />
          </q-item-section>
          <q-item-section v-if="!miniDrawer">Médicos</q-item-section>
        </q-item>

        <!-- Gerenciamento de usuários visível apenas para admins -->
        <q-item
          v-if="userPermission === 'adm'"
          clickable
          v-ripple
          tag="router-link"
          to="/usuarios"
          @click="closeDrawer"
        >
          <q-item-section avatar>
            <q-icon name="supervisor_account" />
          </q-item-section>
          <q-item-section v-if="!miniDrawer">Usuários</q-item-section>
        </q-item>
      </q-list>

      <!-- Perfil e Logout -->
      <q-list padding class="user-menu-content" style="margin-top: auto;">
        <q-item class="user" v-if="userName" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="account_circle" />
          </q-item-section>
          <q-item-section v-if="!miniDrawer">{{ userName }}</q-item-section>
        </q-item>

        <q-item to="/login" class="user" clickable v-ripple @click="logout">
          <q-item-section avatar>
            <q-icon name="exit_to_app" color="negative" />
          </q-item-section>
          <q-item-section class="text-negative" v-if="!miniDrawer">Sair</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Conteúdo principal -->
    <q-page-container :style="contentStyle">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const drawer = ref(true); // Controle de visibilidade do drawer
const miniDrawer = ref(false); // Controle do tamanho do drawer
const router = useRouter();
const route = useRoute();

// Recupera informações do usuário logado
const userName = ref(localStorage.getItem('loggedInUserName') || 'Usuário');
const userPermission = ref(localStorage.getItem('loggedInUserPermission') || '');

// Alterna entre mini e normal
const toggleDrawer = () => {
  miniDrawer.value = !miniDrawer.value;
};

// Fecha o drawer (não aplicável neste caso, pois queremos apenas miniatura)
const closeDrawer = () => {};

// Logout do usuário
const logout = () => {
  localStorage.removeItem('loggedInUserName');
  localStorage.removeItem('loggedInUserPermission');
  userName.value = 'Usuário';
  userPermission.value = '';
  router.push('/login');
};

// Atualiza o título do cabeçalho com base na rota atual
const pageTitle = ref('');
watch(
  () => route.path,
  (newPath) => {
    if (newPath.includes('dashboard')) pageTitle.value = 'Dashboard';
    else if (newPath.includes('pacientes')) pageTitle.value = 'Pacientes';
    else if (newPath.includes('medicos')) pageTitle.value = 'Médicos';
    else if (newPath.includes('usuarios')) pageTitle.value = 'Usuários';
    else pageTitle.value = '';
  },
  { immediate: true }
);

// Estilo do conteúdo principal para ajustar responsividade
const contentStyle = computed(() => ({
  marginLeft: miniDrawer.value ? '0px' : '170px', // Ajusta margem com base no estado do menu
  transition: 'margin-left 0.3s ease', // Animação suave
}));
</script>

<style scoped>
.custom-drawer {
  background-color: #285430;
  color: #ffffff;
  display: flex;
  flex-direction: column;
}

.user-banner {
  margin: auto;
  margin-top: 15px;
  width: 130px;
  height: auto;
}

.main-menu-content {
  flex: 1;
}

.user-menu-content {
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
