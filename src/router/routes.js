const routes = [
  {
    path: '/login',
    component: () => import('src/layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/login/LoginPage.vue') },
    ],
  },
  {
    path: '/',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/dashboard' },
      { path: 'dashboard', component: () => import('src/pages/DashboardPage.vue') },

      // Rotas de Pacientes
      { path: 'pacientes', component: () => import('src/pages/pacientes/PacientesPage.vue') },
      { path: 'pacientes/novo', component: () => import('src/pages/pacientes/NovoPacientePage.vue') },
      { path: 'pacientes/edit/:id', component: () => import('src/pages/pacientes/NovoPacientePage.vue'), props: true },

      // Rotas de Médicos
      { path: 'medicos', component: () => import('src/pages/medicos/MedicosPage.vue') },
      { path: 'medicos/novo', component: () => import('src/pages/medicos/NovoMedicoPage.vue') },
      { path: 'medicos/edit/:id', component: () => import('src/pages/medicos/NovoMedicoPage.vue'), props: true },

      // Rotas de Equipamentos
      { path: 'equipamentos', component: () => import('src/pages/equipamentos/EquipamentoPage.vue') },
      { path: 'equipamentos/novo', component: () => import('src/pages/equipamentos/NovoEquipamentoPage.vue') },
      { path: 'equipamentos/edit/:id', component: () => import('src/pages/equipamentos/NovoEquipamentoPage.vue'), props: true },

      // Rotas de Permissões
      {
        path: 'permissoes',
        component: () => import('src/pages/Permissions/PermissoesPage.vue'),
        beforeEnter: (to, from, next) => {
          const Permissao = localStorage.getItem('loggedInUserPermission');
          if (Permissao === 'adm') {
            next();
          } else {
            next('/access-denied'); // Redireciona para a página de acesso negado
          }
        },
      },

      // Rotas protegidas para Gerenciamento de Usuários
      {
        path: 'usuarios',
        component: () => import('src/pages/usuarios/GerenciarUsuariosPage.vue'),
        beforeEnter: (to, from, next) => {
          const Permissao = localStorage.getItem('loggedInUserPermission');
          if (Permissao === 'adm') {
            next();
          } else {
            next('/access-denied'); // Redireciona para a página de acesso negado
          }
        },
      },
      {
        path: 'usuarios/novo',
        component: () => import('src/pages/usuarios/NovoUsuarioPage.vue'),
        beforeEnter: (to, from, next) => {
          const Permissao = localStorage.getItem('loggedInUserPermission');
          if (Permissao === 'adm') {
            next();
          } else {
            next('/access-denied'); // Redireciona para a página de acesso negado
          }
        },
      },
      // Página de acesso negado
      {
        path: 'access-denied',
        component: () => import('src/pages/AcessoNegadoPage.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/ErrorNotFound.vue'), // Página de erro 404
  },
];

export default routes;
