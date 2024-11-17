<template>
    <q-layout view="hHh Lpr lFf">
      <!-- Cabeçalho -->
      <q-header elevated class="bg-primary">
        <q-toolbar>
          <q-btn flat @click="toggleDrawer" round dense icon="menu" />
          <q-toolbar-title>Cadastro de Usuário</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <!-- Página -->
        <q-page>
          <q-card flat bordered class="register-card">
            <q-card-section class="text-center">
              <img src="/src/assets/LOGO.png" alt="Logo" class="logo" />
              <div class="text-h5">Cadastro de Usuário</div>
            </q-card-section>
  
            <q-card-section>
              <q-form @submit.prevent="handleRegister" class="q-gutter-md">
                <q-input v-model="user.username" label="Usuário" outlined dense />
                <q-input v-model="user.name" label="Nome" outlined dense />
                <q-input
                  v-model="user.password"
                  type="password"
                  label="Senha"
                  outlined
                  dense
                />
                <q-input
                  v-model="user.confirmPassword"
                  type="password"
                  label="Confirmar Senha"
                  outlined
                  dense
                />
                <q-btn type="submit" label="Cadastrar" class="register-btn" />
              </q-form>
            </q-card-section>
          </q-card>
        </q-page>
      </q-page-container>
    </q-layout>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { api } from "src/boot/axios"; // Certifique-se de que o Axios está configurado
  
  const router = useRouter();
  
  const user = ref({
    username: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  
  const handleRegister = async () => {
    try {
      if (user.value.password !== user.value.confirmPassword) {
        alert("As senhas não coincidem.");
        return;
      }
  
      const response = await api.post("/usuarios", {
        Username: user.value.username,
        Name: user.value.name,
        Senha: user.value.password,
      });
  
      if (response.status === 201) {
        alert("Cadastro realizado com sucesso!");
        router.push("/login"); // Redireciona para a tela de login
      }
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      alert("Erro ao realizar cadastro.");
    }
  };
  </script>
  
  <style scoped>
  .register-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #ffffff;
  }
  
  .register-card {
    width: 650px;
    padding: 10px;
    background-color: #285430;
    border-radius: 35px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  }
  
  .logo {
    width: 120px;
    margin-bottom: 20px;
  }
  
  .input-styled {
    width: 100%;
    background-color: #f0f0f0;
    border-radius: 8px;
  }
  
  .register-btn {
    margin-top: 20px;
    width: 100%;
    background-color: #285430;
    color: #ffffff;
  }
  </style>
  