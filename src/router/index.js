// src/router/index.js
import { route } from 'quasar/wrappers';
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes'; // Importando as rotas definidas

export default route(function () {
  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createWebHistory() // Usando modo "history" para o Vue Router
  });

  // Adicionando uma guarda de rota para proteger o dashboard
  Router.beforeEach((to, from, next) => {
    const isAuthenticated = false; // Defina aqui como você quer gerenciar a autenticação (usando store ou localStorage)

    if (to.meta.requiresAuth && !isAuthenticated) {
      // Se a rota requer autenticação e o usuário não está autenticado
      next('/login');
    } else {
      next(); // Permite a navegação
    }
  });

  return Router;
});
