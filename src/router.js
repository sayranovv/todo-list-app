import { createRouter, createWebHistory } from 'vue-router'
import { account } from './appwrite.js'
import LoginPage from '@/components/LoginPage.vue'
import TodoList from "@/components/TodoList.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: TodoList },
        { path: '/login', component: LoginPage },
    ]
})

router.beforeEach( async(to, from, next) => {
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