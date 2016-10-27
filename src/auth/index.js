import { router } from '../index.js'

const API_URL = 'http://localhost:3000/'
const LOGIN_URL = API_URL + 'users/'
const SIGNUP_URL = API_URL + 'users/'

export default {

    user: {
        authenticated: false,
        id: 0
    },

    login(context, creds, redirect) {
        context.$http.get('http://localhost:3000/users?userName=' + creds.username + '&password=' + creds.password).then((response) => {
            console.log(response)
            if (response.body.length > 0) {
                this.user.authenticated = true
                console.log(response.body[0].id)
                this.user.id = response.body[0].id
                localStorage.setItem('id_token', response.body[0].id)
                router.push('/dashboard')
                // if (redirect) {
                    // router.go(redirect)
                // }
            } else {
                context.error = 'Brak takiego uzytkownika'
            }
        }, (response) => {
            console.log(response)
        });
    },

    signup(context, creds, redirect) {
        context.$http.post(SIGNUP_URL, creds).then((response) => {
            localStorage.setItem('id_token', response.id_token)

            // this.user.authenticated = true

            if (redirect) {
                router.push(redirect)
            }

        }, (response) => {
            console.log(response)
        })
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