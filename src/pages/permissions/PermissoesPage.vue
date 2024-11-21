<template>
  <q-page class="permissions-page">
    <q-card class="usuarios-card">
      <q-card-section class="header-section">
        <div class="header-title">Gestão de Permissões</div>
        <div class="header-buttons">
          <q-btn
            label="Nova Permissão"
            icon="add"
            color="primary"
            @click="showPermissionModal = true"
          />
        </div>
      </q-card-section>

      <q-card-section>
        <q-table
          :rows="permissions"
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
                @click="editPermission(props.row)"
              />
              <q-btn
                icon="delete"
                color="negative"
                dense
                flat
                @click="deletePermission(props.row.id)"
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <!-- Modal de Permissão -->
    <q-dialog v-model="showPermissionModal">
      <q-card style="width: 500px; max-width: 90%; height: auto;">
        <q-card-section>
          <div class="text-h6 text-center">
            {{ isEditing ? "Editar" : "Nova" }} Permissão
          </div>
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="savePermission" class="q-gutter-md">
            <q-input
              v-model="permission.name"
              label="Nome"
              dense
              outlined
              required
            />
            <q-input
              v-model="permission.description"
              label="Descrição"
              dense
              outlined
              required
            />
            <div class="button-container">
              <q-btn label="Salvar" color="primary" type="submit" />
              <q-btn
                label="Cancelar"
                flat
                color="negative"
                @click="closeModal"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { usePermissionsStore } from "src/stores/permissionsStore";

const store = usePermissionsStore();
const showPermissionModal = ref(false);
const isEditing = ref(false);
const permission = ref({
  id: null,
  name: "",
  description: "",
  createdAt: new Date().toISOString().split("T")[0],
  status: "Ativo"
});

const columns = [
  { name: "name", label: "Nome", align: "left", field: "name" },
  { name: "description", label: "Descrição", align: "left", field: "description" },
  { name: "createdAt", label: "Criado Em", align: "left", field: "createdAt" },
  { name: "status", label: "Status", align: "left", field: "status" },
  { name: "actions", label: "Ações", align: "center" }
];

const permissions = computed(() => store.permissions);

onMounted(() => {
  store.fetchPermissions();
});

const closeModal = () => {
  showPermissionModal.value = false;
  isEditing.value = false;
  permission.value = {
    id: null,
    name: "",
    description: "",
    createdAt: new Date().toISOString().split("T")[0],
    status: "Ativo"
  };
};

const savePermission = () => {
  if (isEditing.value) {
    store.updatePermission(permission.value.id, permission.value);
  } else {
    store.addPermission(permission.value);
  }
  closeModal();
};

const editPermission = (perm) => {
  permission.value = { ...perm };
  isEditing.value = true;
  showPermissionModal.value = true;
};

const deletePermission = (id) => {
  store.deletePermission(id);
};

const pagination = ref({
  page: 1,         // Página inicial
  rowsPerPage: 10, // Quantidade de registros por página
  rowsNumber: 0,   // Quantidade total de registros (atualizado automaticamente)
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
