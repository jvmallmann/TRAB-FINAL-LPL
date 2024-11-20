<template>
  
  <q-layout view="hHh Lpr lFf" >
    <!-- Menu lateral -->
    <q-drawer
      v-model="drawer"
      :mini="miniDrawer"
      show-if-above 
      :width="260"
      mini-to-overlay
      style="background-color: #285430; display: flex; flex-direction: column;"
      class="custom-drawer"
    >
      <q-btn
        @click="toggleDrawer"
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
          <q-item-section v-if="!miniDrawer">Gestão de Pacientes</q-item-section>
        </q-item>

        <q-item clickable v-ripple tag="router-link" to="/medicos" @click="closeDrawer">
          <q-item-section avatar>
            <q-icon name="local_hospital" />
          </q-item-section>
          <q-item-section v-if="!miniDrawer">Gestão de Médicos</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="hotel" />
          </q-item-section>
          <q-item-section v-if="!miniDrawer">Gestão de Enfermarias</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="group" />
          </q-item-section>
          <q-item-section v-if="!miniDrawer">Gestão de Enfermeiros</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/equipamentos" @click="closeDrawer">
          <q-item-section avatar>
            <q-icon name="build" />
          </q-item-section>
          <q-item-section v-if="!miniDrawer">Gestão de Equipamentos</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="healing" />
          </q-item-section>
          <q-item-section v-if="!miniDrawer">Gestão de Internações</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="description" />
          </q-item-section>
          <q-item-section v-if="!miniDrawer">Relatórios</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section v-if="!miniDrawer">Configurações</q-item-section>
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
     <q-list padding class="user-menu-content" style="color: aliceblue;margin-top: auto;">
        <q-item class="user" v-if="userName" clickable v-ripple @click="showProfileModal = true">
          <q-item-section avatar>
            <q-icon name="account_circle" />
          </q-item-section>
          <q-item-section v-if="!miniDrawer">{{ userName }}</q-item-section>
        </q-item>

        <q-item to="/login" class="user" clickable v-ripple @click="logout">
          <q-item-section avatar>
            <q-icon name="exit_to_app" />
          </q-item-section>
          <q-item-section class="text" v-if="!miniDrawer">Sair</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-dialog v-model="showProfileModal">
  <q-card style="width: 400px; max-width: 90%; height: auto;">
    <q-card-section>
      <div class="text-h6 text-center">Perfil do Usuário</div>
    </q-card-section>
    <q-card-section class="q-gutter-md">
      <q-input v-model="userName" label="Nome" dense readonly />
      <q-input v-model="userEmail" label="Email" dense readonly />
      <q-input v-model="newPassword" label="Nova Senha" type="password" outlined dense />
    </q-card-section>
    <q-card-actions class="actions-container">
  <q-btn flat label="Salvar" color="primary" class="bg-primary text-white" @click="changePassword" />
  <q-btn flat label="Cancelar" color="white" class="bg-negative text-white" @click="closeProfileModal" />
</q-card-actions>
  </q-card>
</q-dialog>

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
const showProfileModal = ref(false); // Controle do modal de perfil
const newPassword = ref(''); // Campo para a nova senha

const router = useRouter();
const route = useRoute();

// Recupera informações do usuário logado
const userName = ref(localStorage.getItem('loggedInUserName') || 'Usuário');
const userEmail = ref(localStorage.getItem('loggedInUserEmail') || 'Não informado');
const userPermission = ref(localStorage.getItem('loggedInUserPermission') || '');

// Alterna entre mini e normal
const toggleDrawer = () => {
  miniDrawer.value = !miniDrawer.value;
};

// Fecha o modal de perfil
const closeProfileModal = () => {
  showProfileModal.value = false;
  newPassword.value = ''; // Limpa o campo de senha
};

// Troca a senha do usuário
const changePassword = () => {
  if (newPassword.value.trim()) {
    console.log('Senha alterada para:', newPassword.value);
    alert('Senha alterada com sucesso!');
    closeProfileModal();
  } else {
    alert('Por favor, insira uma nova senha.');
  }
};

// Logout do usuário
const logout = () => {
  localStorage.removeItem('loggedInUserName');
  localStorage.removeItem('loggedInUserSex');
  localStorage.removeItem('loggedInUserPermission');
  userName.value = 'Usuário';
  userSex.value = 'Não informado';
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
    else pageTitle.value = '';
  },
  { immediate: true }
);

// Estilo do conteúdo principal para ajustar responsividade
const contentStyle = computed(() => ({
  marginLeft: miniDrawer.value ? '0px' : '210px', // Ajusta margem com base no estado do menu
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
  width: 160px;
  height: auto;
}

.main-menu-content {
  flex: 1;
}
.actions-container {
  display: flex; /* Alinha os itens em um layout flexível */
  justify-content: space-between; /* Posiciona os botões em extremidades opostas */
}

.bg-primary {
  background-color: #007bff; /* Cor de fundo para "Salvar" */
  color: white;
  border-radius: 4px;
}

.bg-negative {
  background-color: #ff5252; /* Cor de fundo para "Cancelar" */
  color: white;
  border-radius: 4px;
}

.user-menu-content {
  border-top: 2px solid #ffffff;
}

.q-drawer a {
  color: #ffffff;
  margin-right: 8px;
  border-radius: 0px 15px 15px 0px;
}

.q-drawer .q-item {
  color: #ffffff;
  margin-right: 8px;
  border-radius: 0px 15px 15px 0px;
}

.q-drawer .q-item:hover {
  color: #FFBB56;
  background-color: black;
  border-radius: 0px 15px 15px 0px;
  transition: background-color 0.5s ease;
  transition: color 0.5s ease;
}

.q-item-section {
  color: #FFBB56;
}

.q-item-section:hover {
  color: #ab1717;
}
</style>