import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Homepage,
    },
  ],
})

export default router
