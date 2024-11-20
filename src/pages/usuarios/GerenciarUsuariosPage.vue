<template>
  <q-page>
    <q-card class="usuarios-card">
      <q-card-section class="header-section">
        <div class="header-title">Gerenciar Usuários</div>
        <div class="header-buttons">
          <q-btn
            label="Novo Usuário"
            icon="add"
            color="primary"
            @click="showUserModal = true"
          />
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
        >
          <template v-slot:body-cell-actions="props">
            <q-td align="center">
              <q-btn
                icon="edit"
                color="primary"
                dense
                flat
                @click="openEditModal(props.row)"
              />
              <q-btn
                icon="delete"
                color="negative"
                dense
                flat
                @click="deleteUsuario(props.row.id)"
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <!-- Modal para criar novo usuário -->
    <q-dialog v-model="showUserModal" persistent>
      <q-card style="width: 500px; max-width: 90%; height: auto;">
        <q-card-section>
          <div class="text-h6 text-center">Cadastrar Novo Usuário</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="submitUserForm" class="q-gutter-md">
            <q-input v-model="newUser.name" label="Nome" outlined dense required />
            <q-input v-model="newUser.username" label="Usuário" outlined dense required />
            <q-input v-model="newUser.password" label="Senha" type="password" outlined dense required />
            <q-select
              v-model="newUser.permissao"
              :options="['adm', 'medico', 'enfermeiro']"
              label="Permissão"
              outlined
              dense
              required
            />
            <div class="button-container">
              <q-btn label="Salvar" color="primary" type="submit" />
              <q-btn label="Cancelar" flat color="negative" @click="closeUserModal" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Modal para criar uma nova permissão -->
    <q-dialog v-model="showPermissionModal" persistent>
      <q-card style="width: 400px; max-width: 90%;">
        <q-card-section>
          <div class="text-h6 text-center">Criar Nova Permissão</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="createPermission" class="q-gutter-md">
            <q-input
              v-model="newPermission"
              label="Nome da Permissão"
              outlined
              dense
              required
            />
            <div class="button-container">
              <q-btn label="Salvar" color="primary" type="submit" />
              <q-btn
                label="Cancelar"
                flat
                color="negative"
                @click="closePermissionModal"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Modal para editar usuário -->
    <q-dialog v-model="showEditModal" persistent>
      <q-card style="width: 500px; max-width: 90%; height: auto;">
        <q-card-section>
          <div class="text-h6 text-center">Editar Usuário</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="updateUsuario" class="q-gutter-md">
            <q-input
              v-model="editUser.name"
              label="Nome"
              outlined
              dense
              required
            />
            <q-input
              v-model="editUser.username"
              label="Usuário"
              outlined
              dense
              required
            />
            <q-input
              v-model="editUser.password"
              label="Senha"
              type="password"
              outlined
              dense
              required
            />
            <div class="button-container">
              <q-btn label="Salvar" color="primary" type="submit" />
              <q-btn
                label="Cancelar"
                flat
                color="negative"
                @click="closeEditModal"
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
import axios from 'axios';

const usuarios = ref([]);
const columns = [
  { name: 'Name', label: 'Nome', align: 'left', field: 'Name' },
  { name: 'Username', label: 'Usuário', align: 'left', field: 'Username' },
  { name: 'Permissao', label: 'Permissão', align: 'left', field: 'Permissao' },
  { name: 'actions', label: 'Ações', align: 'center' },
];

// Modal de Novo Usuário
const showUserModal = ref(false);
const newUser = ref({ name: '', username: '', password: '', permissao: '' });

const submitUserForm = async () => {
  try {
    await axios.post('http://localhost:3000/usuarios', newUser.value);
    alert('Usuário cadastrado com sucesso!');
    closeUserModal();
    fetchUsuarios();
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
  }
};

const closeUserModal = () => {
  showUserModal.value = false;
  newUser.value = { name: '', username: '', password: '', permissao: '' };
};

// Modal para criar nova permissão
const showPermissionModal = ref(false);
const newPermission = ref('');
const createPermission = async () => {
  if (!newPermission.value.trim()) {
    alert('Por favor, insira o nome da permissão.');
    return;
  }
  try {
    alert(`Permissão "${newPermission.value}" criada com sucesso!`);
    closePermissionModal();
  } catch (error) {
    console.error('Erro ao criar permissão:', error);
  }
};
const closePermissionModal = () => {
  showPermissionModal.value = false;
  newPermission.value = '';
};

// Modal para editar usuário
const showEditModal = ref(false);
const editUser = ref({ id: null, name: '', username: '', password: '' });

const openEditModal = (user) => {
  editUser.value = { ...user };
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
};

const updateUsuario = async () => {
  try {
    await axios.put(`http://localhost:3000/usuarios/${editUser.value.id}`, editUser.value);
    alert('Usuário atualizado com sucesso!');
    closeEditModal();
    fetchUsuarios();
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
  }
};

const deleteUsuario = async (id) => {
  try {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      await axios.delete(`http://localhost:3000/usuarios/${id}`);
      alert('Usuário excluído com sucesso!');
      fetchUsuarios();
    }
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
  }
};

const fetchUsuarios = async () => {
  try {
    const response = await axios.get('http://localhost:3000/usuarios');
    usuarios.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
  }
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
  padding: 10px;
}

.header-title {
  font-size: 1.50rem;
  margin-top: 5px;
}

.header-buttons {
  display: flex;
  gap: 10px;
}

.usuarios-table {
  margin-top: 20px;
}

.button-container {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.q-dialog {
  border-radius: 8px;
}

.q-btn {
  font-size: 0.9rem;
}
</style>
