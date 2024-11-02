// src/router/routes.js
const routes = [
  {
    path: '/login',
    component: () => import('src/layouts/AuthLayout.vue'), // Layout sem cabeçalho e menu
    children: [
      { path: '', component: () => import('src/pages/LoginPage.vue') }, // Página de Login
    ],
  },
  {
    path: '/',
    component: () => import('src/layouts/MainLayout.vue'), // Layout com cabeçalho e menu
    children: [
      { path: '', redirect: '/dashboard' }, // Redireciona para o dashboard
      { path: 'dashboard', component: () => import('src/pages/DashboardPage.vue') }, // Página de Dashboard

      // Rotas de Pacientes
      { path: 'pacientes', component: () => import('src/pages/pacientes/PacientesPage.vue') }, // Lista de Pacientes
      { path: 'pacientes/novo', component: () => import('src/pages/pacientes/NovoPacientePage.vue') }, // Formulário para Novo Paciente
      { path: 'pacientes/edit/:id', component: () => import('src/pages/pacientes/NovoPacientePage.vue'), props: true }, // Edição de Paciente

      // Rotas de Médicos
      { path: 'medicos', component: () => import('src/pages/medicos/MedicosPage.vue') }, // Lista de Médicos
      { path: 'medicos/novo', component: () => import('src/pages/medicos/NovoMedicoPage.vue') }, // Formulário para Novo Médico
      { path: 'medicos/edit/:id', component: () => import('src/pages/medicos/NovoMedicoPage.vue'), props: true }, // Edição de Médico
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/ErrorNotFound.vue'), // Página de erro 404
  },
];

export default routes;
