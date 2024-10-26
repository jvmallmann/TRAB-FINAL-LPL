<!-- src/pages/LoginPage.vue -->
<template>
  <q-page class="login-page">
    <q-card flat bordered class="login-card">
      <!-- Logo e Título -->
      <q-card-section class="text-center">
        <img src="/src/assets/LOGO.png" alt="Logo" class="logo" />
        <div class="text-h5">Login</div>
      </q-card-section>

      <!-- Formulário de Login -->
      <q-card-section>
        <q-form @submit.prevent="handleLogin" class="q-gutter-md">
          <q-input
            v-model="username"
            label="Usuário"
            outlined
            dense
            class="input-styled"
          />
          <q-input
            v-model="password"
            type="password"
            label="Senha"
            outlined
            dense
            class="input-styled"
            style="margin-top: 10px;"
          />
          <q-btn type="submit" label="Login" color="primary" class="login-btn full-width" style="  display: flex; ;align-items: center;" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = () => {
  // Redireciona o usuário para a página de dashboard sem autenticação real
  router.push('/dashboard');
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #285430;
}

.login-card {
  width: 700px;
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
}

.logo {
  width: 100px;
  margin-bottom: 20px;
}

.input-styled {
  width: 100%;
  background-color: #f0f0f0;
  border-radius: 8px;
}

.login-btn {
  margin-top: 20px;
}
</style>
