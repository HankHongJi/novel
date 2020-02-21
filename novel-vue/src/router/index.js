import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Read from '../views/Read.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta:{
            navs: true
        }
    },
    {
        path: '/read',
        name: 'read',
        component: () => import(/* webpackChunkName: "about" */ '../views/Read.vue'),
        meta:{
            navs: false
        }
    },
    {
        path: '/class',
        name: 'class',
        component: () => import(/* webpackChunkName: "about" */ '../views/BookClass.vue'),
        meta:{
            navs: true
        }
    },
    {
        path: '/list',
        name: 'list',
        component: () => import(/* webpackChunkName: "about" */ '../views/BookList.vue')
    },
    {
        path: '/classList',
        name: 'classList',
        component: () => import(/* webpackChunkName: "about" */ '../views/ClassList.vue'),
        meta:{
            navs: true
        }
    }
]

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
})

export default router
