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
      { path: 'pacientes', component: () => import('src/pages/PacientesPage.vue') }, // Página de Pacientes
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/ErrorNotFound.vue'), // Página de erro 404
  },
];

export default routes;
