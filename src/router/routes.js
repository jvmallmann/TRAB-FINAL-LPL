const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "", // Página inicial
        component: () => import("pages/DashboardPage.vue"),
      },
      {
        path: "login", // Rota de login
        component: () => import("pages/LoginPage.vue"),
      },
      {
        path: "register", // Rota de registro
        component: () => import("pages/RegisterPage.vue"),
      },
    ],
  },

  // Rota para páginas não encontradas
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;