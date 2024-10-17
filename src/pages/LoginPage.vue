<!-- src/pages/LoginPage.vue -->
<template>
    <q-page class="flex flex-center">
      <q-card>
        <q-card-section>
          <div class="text-h6">Login</div>
        </q-card-section>
  
        <q-card-section>
          <q-input v-model="username" label="Usuário" filled />
          <q-input v-model="password" label="Senha" type="password" filled />
        </q-card-section>
  
        <q-card-actions align="right">
          <q-btn label="Entrar" color="primary" @click="login" />
        </q-card-actions>
      </q-card>
    </q-page>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      login() {
        // Simulação de login (substitua pela lógica real)
        if (this.username === 'admin' && this.password === '123456') {
          this.$router.push('/dashboard'); // Redireciona para o dashboard
        } else {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'Usuário ou senha incorretos!',
            icon: 'warning'
          });
        }
      }
    }
  };
  </script>
  