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
          <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const handleLogin = async () => {
  try {
    // Faz uma chamada para o JSON Server para buscar todos os usuários
    const response = await axios.get('http://localhost:3000/usuarios');
    const users = response.data;

    // Verifica se o usuário e a senha coincidem com algum registro
    const user = users.find(
      (u) => u.Username === username.value && u.Senha === password.value
    );

    if (user) {
      // Armazena o nome do usuário logado para exibir no menu lateral
      localStorage.setItem('loggedInUserName', user.Name);

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
  width: 250px;
  margin-bottom: 20px;
  margin-top: 20px;
}

.input-styled {
  width: 57%;
  padding-left: 5px;
  background-color: #285430;
  border: 1px solid #ffffff;
  border-radius: 3px;
  color: #ffffff;
}

.input-styled:hover,
.input-styled:focus-within {
  background-color: #ffffff;
  color: #285430;
}

.error-message {
  color: #ff5252;
  margin-top: 10px;
  text-align: center;
}

.button-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.login-btn {
  width: 50%;
  padding: 8px;
  background-color: #f0f0f0;
  color: #285430;
  border-radius: 3px;
  text-align: center;
}
</style>
