<template>
    <q-page>
      <q-card class="usuarios-card">
        <q-card-section>
          <div class="text-h6">Cadastrar Novo Usuário</div>
        </q-card-section>
  
        <q-form @submit.prevent="submitForm">
          <q-input v-model="name" label="Nome" outlined dense />
          <q-input v-model="username" label="Usuário" outlined dense />
          <q-input v-model="password" type="password" label="Senha" outlined dense />
          <q-select
            v-model="permissao"
            :options="['adm', 'medico', 'enfermeiro']"
            label="Permissão"
            outlined
            dense
          />
  
          <q-btn
            type="submit"
            label="Salvar"
            color="primary"
            class="q-mt-md"
          />
        </q-form>
      </q-card>
    </q-page>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  const name = ref('');
  const username = ref('');
  const password = ref('');
  const permissao = ref('');
  const router = useRouter();
  
  const submitForm = async () => {
    try {
      await axios.post('http://localhost:3000/usuarios', {
        Name: name.value,
        Username: username.value,
        Senha: password.value,
        Permissao: permissao.value,
      });
  
      alert('Usuário cadastrado com sucesso!');
      router.push('/usuarios');
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      alert('Erro ao cadastrar usuário. Tente novamente mais tarde.');
    }
  };
  </script>
  
  <style scoped>
  .usuarios-card {
    max-width: 600px;
    margin: auto;
    margin-top: 20px;
    border-top: 5px solid #285430;
  }
  </style>
  