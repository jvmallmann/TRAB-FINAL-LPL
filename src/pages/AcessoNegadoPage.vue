<template>
  <q-page class="access-denied-page">
    <q-card class="access-denied-card">
      <q-card-section>
        <div class="text-center text-h5 text-negative">Acesso Negado</div>
        <div class="text-center">Você não tem permissão para acessar esta página.</div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn color="primary" label="Voltar" @click="goBack" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.access-denied-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.access-denied-card {
  padding: 20px;
  width: 400px;
  text-align: center;
}
</style>
