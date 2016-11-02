import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './components/App.vue'
import Home from './components/Home.vue'
import Board from './components/Board.vue'
import List from './components/List.vue'
import Card from './components/Card.vue'
import Signup from './components/Signup.vue'
import Login from './components/Login.vue'
import Activity from './components/Activity.vue'
import CardView from './components/CardView.vue'
import auth from './auth'
import store from './store'
import Sortable from '../vue-sortable-master/vue-sortable.js'
// import { sync } from 'vuex-router-sync'

auth.checkAuth()


Vue.use(Sortable)
Vue.use(VueResource)
Vue.use(VueRouter)


Vue.component('app1', App)
Vue.component('board', Board)
Vue.component('list', List)
Vue.component('card', Card)
Vue.component('activity', Activity)
Vue.component('cardview', CardView)
// Vue.component('home', Home)
// Vue.component('login', Login)
// var Board = Vue.extend({
//     component: Board
// })
// Vue.component('tabs', VueStrap.tabset)
// Vue.component('tabGroup', VueStrap.tabGroup)


const routes = [
    {
        path: '/dashboard', component: Home, name: 'App',
        children: [
            {
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                path: 'board/:boardId',
                component: Board,
                name: 'Board',
                children: [
                    {
                        path: 'list/:listId',
                        component: List,
                        name: 'List',
                    },
                    {
                        path: 'lists',
                        component: List,
                        name: 'Lists',
                    }
                ]
            },
            {
                path: 'board/:boardId/list/:listId/card/:cardId',
                components: {
                    a: CardView
                },
                name: 'CardView',
            }
        ]
    },
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
    // { path: 'dashboard/list/:id', component: List, name: 'List' },
    { path: '*', redirect: '/home' }
]

export var router = new VueRouter({
    routes
})
// sync(store, router)

// export const app = Vue.component('app')


// export const store = new Vuex.Store({
//   state: {
//     count: 0,
//     comp: []
//   },
//   mutations: {
//     increment (state) {
//       state.count++
//     },
//     addBoards(state, boards) {
//         var i
//         for (i = 0; i < boards.length; i++) { 
//           boards[i].hash = '#board' + boards[i].id;
//           boards[i].param = 'board' + boards[i].id;
//         }
//         state.comp = boards;
//     },
//     addBoard(state, board) {

//         board.hash = '#board' + board.id;
//         board.param = 'board' + board.id;

//         state.comp.push(board);
//     }
//   }
// })

export const app = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

// Board.$watch('lists', function(newVal, oldVal))



