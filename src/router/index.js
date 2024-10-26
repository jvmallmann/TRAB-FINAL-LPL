// src/router/index.js
import { route } from 'quasar/wrappers';
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes'; // Importando as rotas definidas

export default route(function () {
  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createWebHistory(),
  });

  // Guarda de rota para proteger o acesso ao dashboard
  Router.beforeEach((to, from, next) => {
    // Verifica se a rota requer autenticação
    if (to.meta.requiresAuth) {
      // Redireciona para o dashboard sem autenticação real
      next('/dashboard');
    } else {
      next(); // Permite a navegação
    }
  });

  return Router;
});
