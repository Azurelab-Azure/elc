import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { title: '首页' }
    },
    {
      path: '/teaching',
      name: 'teaching',
      component: () => import('../views/TeachingView.vue'),
      meta: { title: '电路教学' }
    },
    {
      path: '/simulation',
      name: 'simulation',
      component: () => import('../views/SimulationView.vue'),
      meta: { title: '电路仿真' }
    },
    {
      path: '/circuit',
      name: 'circuit',
      component: () => import('../views/CircuitView.vue'),
      meta: { title: '电路图' }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { title: '关于' }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

router.afterEach((to) => {
  const title = to.meta?.title as string | undefined;
  document.title = title ? `${title} · 电路仿真实验室` : '电路仿真实验室';
});

export default router;