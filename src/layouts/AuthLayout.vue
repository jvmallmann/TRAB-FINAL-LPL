<!-- src/layouts/AuthLayout.vue -->
<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view /> <!-- Renderiza LoginPage.vue aqui -->
    </q-page-container>
  </q-layout>
</template>

<script setup>
// Não é necessário script específico aqui
</script>

<style scoped>
/* Estilos opcionais para o layout de autenticação */
.q-page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
