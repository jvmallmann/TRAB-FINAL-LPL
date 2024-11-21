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
          v-model:pagination="pagination"
        
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
            <q-input v-model="newUser.email" label="Email" type="email" outlined dense required />
            <q-input v-model="newUser.username" label="Usuário" outlined dense required />
            <q-input v-model="newUser.password" label="Senha" type="password" outlined dense required />
            <q-select v-model="newUser.permissao" :options="permissions" option-label="name"
              option-value="name" label="Permissão" outlined dense required/>
            <div class="button-container">
              <q-btn label="Salvar" color="primary" type="submit" />
              <q-btn label="Cancelar" flat color="negative" @click="closeUserModal" />
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
            <q-input v-model="editUser.Name" label="Nome" outlined dense required />
            <q-input v-model="editUser.Email" label="Email" type="email" outlined dense required />
            <q-input v-model="editUser.Username" label="Usuário" outlined dense required />
            <q-select
              v-model="editUser.Permissao"
              :options="permissions"
              option-label="name"
              option-value="name"
              label="Permissão"
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
            />
            <div class="button-container">
              <q-btn label="Salvar" color="primary" type="submit" />
              <q-btn label="Cancelar" flat color="negative" @click="closeEditModal" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useUsuariosStore } from "src/stores/usuarioStore";
import { usePermissionsStore } from "src/stores/permissionsStore";

const usuariosStore = useUsuariosStore();
const permissionsStore = usePermissionsStore();

// Computed properties para obter os dados do store
const usuarios = computed(() => usuariosStore.usuarios);
const permissions = computed(() => permissionsStore.permissions);

const showUserModal = ref(false);
const newUser = ref({
  name: "",
  email: "",
  username: "",
  permissao: "",
});

const closeUserModal = () => {
  showUserModal.value = false;
  newUser.value = { name: "", email: "", username: "", password: "", permissao: "" };
};

const submitUserForm = async () => {
  try {
    await usuariosStore.addUsuario({
      Name: newUser.value.name,
      Email: newUser.value.email,
      Username: newUser.value.username,
      Senha: newUser.value.password,
      Permissao: newUser.value.permissao, // Aqui já será o valor do campo `name`
    });
    alert("Usuário cadastrado com sucesso!");
    closeUserModal();
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
  }
};

const updateUsuario = async () => {
  try {
    await usuariosStore.updateUsuario(editUser.value.id, {
      Name: editUser.value.Name,
      Email: editUser.value.Email,
      Username: editUser.value.Username,
      Senha: editUser.value.password,
      Permissao: editUser.value.Permissao, // Apenas a string
    });
    alert("Usuário atualizado com sucesso!");
    closeEditModal();
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
  }
};




const openEditModal = (user) => {
  console.log("Abrindo modal para edição:", user); // Confirma o usuário selecionado
  editUser.value = { ...user }; // Preenche os dados para edição
  showEditModal.value = true; // Ativa o modal de edição
  console.log("Estado do modal:", showEditModal.value); // Verifica o estado
};

const closeEditModal = () => {
  showEditModal.value = false; // Fecha o modal de edição
};

// Confirma que showEditModal foi inicializado
const showEditModal = ref(false);

// Declaração inicial de editUser
const editUser = ref({
  id: null,
  Name: "",
  Email: "",
  Username: "",
  Permissao: "",
});

// Chamada aos métodos dos stores no onMounted
onMounted(() => {
  usuariosStore.fetchUsuarios();
  permissionsStore.fetchPermissions(); // Obtém as permissões usando o permissionsStore
});

const columns = [
  { name: "Name", label: "Nome", align: "left", field: "Name" },
  { name: "Email", label: "Email", align: "left", field: "Email" },
  { name: "Username", label: "Usuário", align: "left", field: "Username" },
  { 
    name: "Permissao", 
    label: "Permissão", 
    align: "left", 
    field: (row) => row.Permissao?.name || "Sem Permissão" // Acessa o campo `name` ou exibe "Sem Permissão"
  },
  {
    name: "actions",
    label: "Ações",
    align: "center",
    field: "actions",
    sortable: false,
  },
];

const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
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
