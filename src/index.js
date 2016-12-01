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

var VueI18n = require('vue-i18n')
// import { sync } from 'vuex-router-sync'

auth.checkAuth()


Vue.use(Sortable)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueI18n)
Vue.config.lang = 'en'



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
            },
            {
                path: 'share/board/:boardId',
                component: Board,
                name: 'ShareBoard',
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

var locales = {
    en: {
        message: {
            hello: 'hello world'
        },
        app: {
            home: 'Home',
            login: 'Login',
            logout: 'Logout',
            signingUp: 'Sign up'
        },
        login: {
            title: 'Log In',
            message: 'Log in to your account',
            loginPlaceholder: 'Your login',
            passwordPlaceholder: 'Your password'
        },
        search: {
            placeholder: 'search'
        },
        menu: {
            language: 'Set language',
            wallpapers: 'Set background'
        },
        home: {
            addBoard: 'Add board',
            addBoardModal_title: 'Add new board',
            addBoardModal_boardName: 'Board name',
            addBoardModal_closeBtn: 'Close',
            addBoardModal_saveBtn: 'Save'
        },
        list: {
            addCardModal_title: 'Add new card',
            addCardModal_cardName: 'Name',
            addCardModal_cardDescription: 'Description'
        },
        board: {
            editNameBtn: 'Edit name',
            addListBtn: 'Add list',
            removeBoardBtn: 'Remove board',
            addMemberBtn: 'Add member',
            teamsBtn: 'Teams',
            shareBtn: 'Share',
            archivedBtn: 'Archived',
            addListModal_title: 'Add new list',
            addListModal_listName: 'Title',
            showLogsBtn: 'Show logs',
            langToEngBtn: 'English',
            langToPlBtn: 'Polish'
        },
        card: {
            editCardModal_title: 'Edit title and description',
            editCardModal_cardName: 'Title',
            editCardModal_description: 'Description'
        },
        cardView: {
            description: 'Description',
            labels: 'Labels',
            dueDate: 'Due date',
            addComment: 'Add comment',
            saveBtn: 'Save',
            activity: 'Activity',
            add: 'Add',
            labelsBtn: 'Labels',
            dueDateBtn: 'Due date',
            attachmentBtn: 'Attachment',
            actions: 'Actions',
            subscribeBtn: 'Subscribe',
            archiveBtn: 'Archive',
            subbedBtn: 'Subbed'
        }
    },
    pl: {
        message: {
            hello: 'witaj świecie'
        },
        app: {
            home: 'Strona główna',
            login: 'Zaloguj',
            logout: 'Wyloguj',
            signingUp: 'Zarejestruj się'
        },
        login: {
            title: 'Zaloguj się',
            message: 'Zaloguj się do swojego konta',
            loginPlaceholder: 'Twój login',
            passwordPlaceholder: 'Twoje hasło'
        },
        search: {
            placeholder: 'szukaj'
        },
        menu: {
            language: 'Ustaw język',
            wallpapers: 'Ustaw tło'
        },
        home: {
            addBoard: 'Dodaj tablicę',
            addBoardModal_title: 'Dodaj nową tablicę',
            addBoardModal_boardName: 'Nazwa tablicy',
            addBoardModal_closeBtn: 'Zamknij',
            addBoardModal_saveBtn: 'Zapisz'
        },
        list: {
            addCardModal_title: 'Dodaj nową kartę',
            addCardModal_cardName: 'Nazwa',
            addCardModal_cardDescription: 'Opis'
        },
        board: {
            editNameBtn: 'Zmień nazwę',
            addListBtn: 'Dodaj listę',
            removeBoardBtn: 'Usuń tablicę',
            addMemberBtn: 'Dodaj członka',
            teamsBtn: 'Zespoły',
            shareBtn: 'Udostępnij',
            archivedBtn: 'Zarchiwizowane',
            addListModal_title: 'Dodaj nową listę',
            addListModal_listName: 'Tytuł',
            showLogsBtn: 'Pokaż logi',
            langToEngBtn: 'Angielski',
            langToPlBtn: 'Polski'
        },
        card: {
            editCardModal_title: 'Zmień nazwę i opis',
            editCardModal_cardName: 'Nazwa',
            editCardModal_description: 'Opis'
        },
        cardView: {
            description: 'Opis',
            labels: 'Oznaczenia',
            dueDate: 'Do dnia',
            addComment: 'Dodaj komentarz',
            saveBtn: 'Zapisz',
            activity: 'Aktywność',
            add: 'Dodaj',
            labelsBtn: 'Oznaczenia',
            dueDateBtn: 'Terminacz',
            attachmentBtn: 'Załącznik',
            actions: 'Akcje',
            subscribeBtn: 'Subskrybuj',
            archiveBtn: 'Archiwizuj',
            subbedBtn: 'Subsrybcja'
        }
    }
}

Object.keys(locales).forEach(function (lang) {
    Vue.locale(lang, locales[lang])
})


export const app = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

// Board.$watch('lists', function(newVal, oldVal))



