<template>
  <q-page>
    <q-card class="equipamentos-card">
      <q-card-section>
        <div class="text-h6">{{ pageTitle }}</div>
      </q-card-section>

      <!-- Formulário de Equipamento -->
      <q-form @submit.prevent="submitForm" class="q-gutter-md">
        <div class="q-gutter-sm row">
          <!-- Descrição e Fabricante lado a lado -->
          <q-input
            v-model="equipamento.Descricao"
            label="Descrição"
            outlined
            dense
            required
            class="col-5"
          />
          <q-input
            v-model="equipamento.Fabricante"
            label="Fabricante"
            outlined
            dense
            required
            class="col-5"
          />
        </div>
        <div class="q-gutter-sm row">
          <!-- Data de Compra, Número de Série e Status -->
          <q-input
            v-model="equipamento.DataCompra"
            label="Data de Compra"
            type="date"
            outlined
            dense
            required
            class="col-4"
          />
          <q-input
            v-model="equipamento.NumeroSerie"
            label="Número de Série"
            outlined
            dense
            required
            class="col-4"
          />
          <q-select
            v-model="equipamento.StatusEquipamento"
            :options="statusOptions"
            label="Status do Equipamento"
            outlined
            dense
            required
            class="col-3"
          />
        </div>
        <div class="q-gutter-sm row">
          <!-- Campo para upload de foto -->
          <q-file
            v-model="equipamento.FotoEquipamento"
            label="Foto do Equipamento"
            outlined
            dense
            accept="image/*"
            class="col-3"
          />
        </div>

        <!-- Botões -->
        <div class="button-container">
          <q-btn type="submit" label="Salvar" color="primary" />
          <q-btn to="/equipamentos" label="Cancelar" class="bg-negative text-white" flat color="negative"
          />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEquipamentosStore } from 'src/stores/equipamentosStore';

const route = useRoute();
const router = useRouter();
const EquipamentosStore = useEquipamentosStore();

const isEditMode = computed(() => route.path !== '/equipamentos/novo');
const equipamento = ref({
  Descricao: '',
  Fabricante: '',
  DataCompra: '',
  NumeroSerie: '',
  StatusEquipamento: '',
  FotoEquipamento: null // Adicionando a foto do equipamento
});

const statusOptions = ['Funcionando', 'Em manutenção', 'Desativado'];

const pageTitle = computed(() =>
  isEditMode.value
    ? `Editar Equipamento - ${equipamento.value.Descricao || ''}`
    : 'Novo Equipamento'
);

onMounted(async () => {
  if (isEditMode.value) {
    const equipamentoId = route.params.id;
    try {
      const existingEquipamento = await EquipamentosStore.fetchEquipamentoById(equipamentoId);
      if (existingEquipamento) {
        equipamento.value = { ...existingEquipamento };
      }
    } catch (error) {
      console.error('Erro ao carregar os dados do equipamento:', error);
    }
  }
});

const submitForm = async () => {
  try {
    if (isEditMode.value) {
      await EquipamentosStore.updateEquipamento(route.params.id, equipamento.value);
    } else {
      await EquipamentosStore.addEquipamento(equipamento.value);
    }
    router.push('/equipamentos');
  } catch (error) {
    console.error('Erro ao salvar equipamento:', error);
  }
};
</script>

<style scoped>
.equipamentos-card {
  max-width: 1300px;
  margin: auto;
  margin-top: 20px;
  border-top: 5px solid #285430;
}

.q-form {
  padding: 10px;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.row {
  margin-bottom: 15px;
}
</style>
