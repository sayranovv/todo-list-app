import { createRouter, createWebHistory } from 'vue-router'
import { account } from './appwrite.js'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('@/pages/MainPage.vue') },
    { path: '/login', component: () => import('@/pages/LoginPage.vue') },
  ],
})

router.beforeEach(async (to, from, next) => {
  try {
    const user = await account.get()
    if (to.path !== '/login' && !user) {
      next('/login')
    } else {
      next()
    }
  } catch (error) {
    if (to.path !== '/login') {
      next('/login')
    } else {
      next()
    }
  }
})
