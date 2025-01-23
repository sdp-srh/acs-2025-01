import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/HomePage.vue')
  },
  {
    path: '/matches',
    name: 'Matches',
    component: () => import('@/views/MatchesPage.vue')
  },
  {
    path: '/teams',
    name: 'Teams',
    component: () => import('@/views/TeamsPage.vue')
  },  
  {
    path: '/tipps',
    name: 'Tipps',
    component: () => import('@/views/TippsPage.vue')
  },   
  {
    path: '/:pathMatch(.*)*', // or '/:catchAll(.*)' for Vue Router 3
    name: 'NotFound',
    component: () => import('@/views/NotFoundPage.vue'),
  }  
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
