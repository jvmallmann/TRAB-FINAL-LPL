<template>
    <q-page>
      <q-card class="usuarios-card">
        <q-card-section class="header-section">
          <div class="header-title">Gerenciar Usuários</div>
          <div class="header-buttons">
            <!-- Botão para adicionar um novo usuário -->
            <q-btn
              label="Novo Usuário"
              icon="add"
              color="primary"
              @click="goToNovoUsuario"
            />
            <!-- Botão para criar uma nova permissão -->
            <q-btn
              label="Nova Permissão"
              icon="lock"
              color="secondary"
              @click="showPermissionModal = true"
            />
          </div>
        </q-card-section>
  
        <q-card-section>
          <q-table
            :rows="usuarios"
            :columns="columns"
            row-key="id"
            flat
            dense
            class="usuarios-table"
          />
        </q-card-section>
      </q-card>
  
      <!-- Modal para criar uma nova permissão -->
      <q-dialog v-model="showPermissionModal" persistent>
  <q-card style="width: 400px; max-width: 90%; height: auto;">
    <q-card-section>
      <div class="text-h6 text-center">Criar Nova Permissão</div>
    </q-card-section>
    <q-card-section>
      <q-form @submit.prevent="createPermission" class="q-gutter-md text-center">
        <q-input
          v-model="newPermission"
          label="Nome da Permissão"
          outlined
          dense
          required
          class="small-input"
        />
        <div class="button-container">
          <q-btn 
            label="Salvar"
            color="primary"
            type="submit"
            class="small-btn"
          />
          <q-btn style="float: right;"
            label="Cancelar"
            flat
            color="negative"
            class="small-btn"
            @click="closePermissionModal"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</q-dialog>

    </q-page>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  const usuarios = ref([]);
  const columns = [
    { name: 'Name', label: 'Nome', align: 'left', field: 'Name' },
    { name: 'Username', label: 'Usuário', align: 'left', field: 'Username' },
    { name: 'Permissao', label: 'Permissão', align: 'left', field: 'Permissao' },
  ];
  const router = useRouter();
  
  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:3000/usuarios');
      usuarios.value = response.data;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };
  
  const goToNovoUsuario = () => {
    router.push('/usuarios/novo');
  };
  
  // Variáveis para o modal e o campo de nova permissão
  const showPermissionModal = ref(false);
  const newPermission = ref('');
  
  const createPermission = async () => {
    if (!newPermission.value.trim()) {
      alert('Por favor, insira o nome da permissão.');
      return;
    }
  
    try {
      console.log('Permissão criada:', newPermission.value);
      alert(`Permissão "${newPermission.value}" criada com sucesso!`);
      closeModal();
    } catch (error) {
      console.error('Erro ao criar permissão:', error);
    }
  };
  
// Método para fechar o modal
const closePermissionModal = () => {
  showPermissionModal.value = false;
  newPermission.value = ''; // Limpa o input para o próximo uso
};
  
  onMounted(() => {
    fetchUsuarios();
  });
  </script>
  
  <style scoped>
  .usuarios-card {
    max-width: 1400px;
    margin: auto;
    margin-top: 20px;
    border-top: 5px solid #285430;
  }

  .header-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: -15px;
    padding: 10px;
  }
  
  .header-title {
    font-size: 1.25rem;
    font-weight: bold;
  }
  
  .header-buttons {
    display: flex;
    gap: 10px; /* Espaçamento entre os botões */
  }
  
  .usuarios-table {
    margin-top: 20px;
  }

  .custom-dialog .q-card {
  width: 600px; /* Largura do modal */
  max-width: 90%;
  height: auto; /* Altura ajustável */
  border-radius: 8px; /* Bordas arredondadas */
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2); /* Sombra personalizada */
}

.custom-dialog .q-card-section {
  padding: 20px;
}

.button-container {
  display: flex;
  justify-content: center; /* Centraliza os botões horizontalmente */
  gap: 10px; /* Espaçamento entre os botões */
}

.custom-dialog .q-btn {
  font-size: 1rem; /* Tamanho do texto dos botões */
}
  
  .full-width {
    width: 100%;
  }
  </style>
  