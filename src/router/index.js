import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Password from '../views/Password.vue'
import Storage from "@/views/Storage";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/storage',
        name: 'Storage',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Storage
    },
    {
        path: '/password',
        name: 'Password',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Password
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
