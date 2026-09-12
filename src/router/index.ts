import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
    { path: '/simulator', name: 'simulator', component: () => import('../views/SimulatorView.vue') },
    { path: '/circuit/:id', name: 'circuit-detail', component: () => import('../views/CircuitDetailView.vue') },
    { path: '/three-phase', name: 'three-phase', component: () => import('../views/ThreePhaseView.vue') },
    { path: '/plc', name: 'plc', component: () => import('../views/PLCView.vue') },
    { path: '/oscilloscope', name: 'oscilloscope', component: () => import('../views/OscilloscopeView.vue') },
    { path: '/repository', name: 'repository', component: () => import('../views/RepositoryView.vue') },
    { path: '/documents', name: 'documents', component: () => import('../views/DocumentView.vue') },
    { path: '/document/:id', name: 'document-detail', component: () => import('../views/DocumentDetailView.vue') },
    { path: '/submission', name: 'submission', component: () => import('../views/SubmissionView.vue') },
    { path: '/editor', name: 'editor', component: () => import('../views/EditorView.vue') },
    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue') }
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;