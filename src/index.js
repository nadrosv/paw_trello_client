import Vue from 'vue'
import App from './components/App.vue'
import Home from './components/Home.vue'
import Board from './components/Board.vue'
import List from './components/List.vue'
import Card from './components/Card.vue'
import Signup from './components/Signup.vue'
import Login from './components/Login.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import auth from './auth'
auth.checkAuth()


Vue.use(VueResource)
Vue.use(VueRouter)

Vue.component('app1', App)
Vue.component('board', Board)
Vue.component('list', List)
Vue.component('card', Card)
// Vue.component('home', Home)
// Vue.component('login', Login)
// var Board = Vue.extend({
//     component: Board
// })
// Vue.component('tabs', VueStrap.tabset)
// Vue.component('tabGroup', VueStrap.tabGroup)


const routes = [
    { path: '/dashboard', component: Home, name: 'App' },
    {
        path: '/home', component: Home, name: 'Home',
        beforeEnter: (to, from, next) => {
            console.log('user: ' + auth.user.authenticated)
            console.log(to)
            if (!auth.user.authenticated) {
                next('/login')
            } else {
                next('/dashboard')
            }

        }
    },
    // { path: '/home/:boardId', component: Board},
    { path: '/login', component: Login, name: 'Login' },
    { path: '/signup', component: Signup, name: 'Singup' },
    { path: '*', redirect: '/home' }
]

export var router = new VueRouter({
    routes
})

// export const app = Vue.component('app')
export const app = new Vue({
    router
}).$mount('#app')



// Board.$watch('lists', function(newVal, oldVal))



