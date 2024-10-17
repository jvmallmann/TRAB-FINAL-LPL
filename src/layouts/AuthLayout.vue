<!-- src/layouts/AuthLayout.vue -->
<template>
    <q-layout view="hHh lpR fFf">
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </template>
  
  <script>
  export default {
    name: 'AuthLayout'
  };
  </script>
  
  <style scoped>
  /* Adicione qualquer estilo que precisar aqui */
  </style>
  