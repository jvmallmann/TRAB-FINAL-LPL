<template>
  <q-page class="login-page">
    <q-card bordered class="login-card">
      <!-- Logo e Título -->
      <q-card-section class="text-center">
        <img src="/src/assets/LOGO.png" alt="Logo" class="logo" />
      </q-card-section>

      <!-- Formulário de Login -->
      <q-card-section>
        <q-form @submit.prevent="handleLogin" class="q-gutter-md">
          <q-input
            v-model="username"
            label="Usuário"
            dense
            class="input-styled"
          />
          <q-input
            v-model="password"
            type="password"
            label="Senha"
            dense
            class="input-styled"
            style="margin-top: 10px;"
          />
          <div class="button-container">
            <q-btn
              type="submit"
              label="Login"
              class="login-btn"
            />
          </div>
        </q-form>
        <div
  class="help-container"
  :style="errorMessage ? 'margin-top: 20px;' : 'margin-top: 47px;'"
>
  <span class="help-text" @click="openHelpModal">Ajuda?</span>
</div>
      </q-card-section>
    </q-card>

    <!-- Modal de Ajuda -->
    <q-dialog v-model="isHelpModalOpen">
  <q-card class="help-modal">
    <q-card-section>
      <h5>Precisa de ajuda?</h5>
      <p>Entre em contato:</p>
      <p><strong>Email:</strong> louis@kroc.com</p>
      <p><strong>Número:</strong> (11) 99999-9999</p>
    </q-card-section>
    <q-card-actions align="center">
      <q-btn flat label="Fechar" color="primary" @click="isHelpModalOpen = false" />
    </q-card-actions>
  </q-card>
</q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const isHelpModalOpen = ref(false); // Controla o estado do modal
const router = useRouter();

const handleLogin = async () => {
  try {
    // Faz a chamada para o JSON Server para buscar todos os usuários
    const response = await axios.get('http://localhost:3000/usuarios');
    const users = response.data;

    // Verifica se o usuário e a senha coincidem com algum registro
    const user = users.find(
      (u) => u.Username === username.value && u.Senha === password.value
    );

    if (user) {
      // Salva o nome, e-mail e permissão no localStorage
      localStorage.setItem('loggedInUserName', user.Name);
      localStorage.setItem('loggedInUserEmail', user.Email); // Adiciona o e-mail
      localStorage.setItem('loggedInUserPermission', user.Permissao.name);

      console.log('E-mail salvo:', user.Email); // Debug para verificar
      console.log('Permissão salva:', user.Permissao);

      // Redireciona para o dashboard
      router.push('/dashboard');
    } else {
      // Exibe uma mensagem de erro se os dados não coincidirem
      errorMessage.value = 'Usuário ou senha incorretos.';
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    errorMessage.value = 'Erro ao fazer login. Tente novamente mais tarde.';
  }
};

const openHelpModal = () => {
  isHelpModalOpen.value = true; // Abre o modal
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;
}

.login-card {
  width: 650px;
  height: 470px;
  padding: 10px;
  background-color: #285430;
  border-radius: 35px;
  box-shadow: 12px 12px 8px rgba(0, 0, 0, 0.3); /* Sombra */
}

.q-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 0px;
  width: 100%;
}

.logo {
  width: 260px;
  margin-bottom: 20px;
  margin-top: 20px;
}

.input-styled {
  width: 57%;
  padding-left: 5px;
  background-color: #ffffff;
  border: 1px solid #285430;
  border-radius: 3px;
  color: #ffffff;
  box-shadow: 12px 12px 8px rgba(0, 0, 0, 0.3); /* Sombra */

}

.error-message {
  color: #ff5252;
  margin-top: 10px;
  text-align: center;
  min-height: 20px; /* Adiciona altura fixa para evitar movimento */
}

.button-container {
  display: flex;
  justify-content: center;
  width: 60%;
}

.login-btn {
  width: 50%;
  padding: 8px;
  background-color: #f0f0f0;
  color: #285430;
  border-radius: 3px;
  text-align: center;
  box-shadow: 12px 12px 8px rgba(0, 0, 0, 0.3); /* Sombra */

}

.help-container {
  text-align: center;
}

.help-text {
  color: #ffffff;
  text-decoration: underline;
  cursor: pointer;
  font-size: 14px;
  font-style: italic; 
}

.help-modal {
  max-width: 400px;
  padding: 20px;
  text-align: center;
}
</style>
