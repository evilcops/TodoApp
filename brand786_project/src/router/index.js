import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/userDashboard.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/userLogin.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/signUp.vue'),
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('../components/todoList/todoList.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/add',
    name: 'add',
    component: () => import('../components/todoList/todoAdd.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/update',
    name: 'update',
    component: () => import('../components/todoList/todoUpdate.vue'),
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user');
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!loggedIn) {
      next('/login');
    } else {
      next(); 
    }
  } else {
    next(); 
  }
})

export default router;
