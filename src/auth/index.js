import { router } from '../index.js'

const API_URL = 'http://localhost:3000/'
const LOGIN_URL = API_URL + 'users/'
const SIGNUP_URL = API_URL + 'users/'

export default {

    user: {
        authenticated: false,
        id: 0,
        username: localStorage.getItem('username'),
        sharedBoards: []
    },

    login(context, creds, redirect) {
        context.$http.get('http://localhost:3000/users?userName=' + creds.username + '&password=' + creds.password).then((response) => {
            console.log(response)
            if (response.body.length > 0) {
                this.user.authenticated = true
                this.user.id = response.body[0].id
                this.user.username = response.body[0].userName
                this.user.sharedBoards = response.body[0].sharedBoards
                localStorage.setItem('id_token', response.body[0].id)
                localStorage.setItem('username', response.body[0].userName)
                localStorage.setItem('sharedBoards', response.body[0].sharedBoards)
                router.push('/dashboard')

            } else {
                context.error = 'Brak takiego uzytkownika'
            }
        }, (response) => {
            console.log(response)
        });
    },

    signup(context, creds, redirect) {
        if (creds.userName === '' || creds.password === '') {
            context.error = 'Podaj nazwę użytkoniwa i haslo'
        } else {
            context.$http.post(SIGNUP_URL, creds).then((response) => {
                localStorage.setItem('id_token', response.id_token)

                if (redirect) {
                    router.push(redirect)
                }

            }, (response) => {
                context.error = response
                console.log(response)
            })
        }
    },

    logout() {
        localStorage.removeItem('id_token')
        this.user.authenticated = false
        router.push('/login')
    },

    checkAuth() {
        var jwt = localStorage.getItem('id_token')
        if (jwt) {
            this.user.authenticated = true
            this.user.id = jwt
        }
        else {
            this.user.authenticated = false
        }

    }
}