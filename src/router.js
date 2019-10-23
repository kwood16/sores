import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Intro from './views/Intro.vue'
import Stage from './views/Stage.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/intro',
            name: 'intro',
            component: Intro
        },
        {
            path: '/stage/:id',
            name: 'stage',
            component: Stage
        }
    ]
})