import { router } from '../index.js'

const API_URL = 'http://localhost:3000/'
const LOGIN_URL = API_URL + 'users/'
const SIGNUP_URL = API_URL + 'users/'

export default {

    user: {
        authenticated: false
    },

    login(context, creds, redirect) {
        context.$http.get('http://localhost:3000/users?userName=' + creds.username + '&password=' + creds.password).then((response) => {
            console.log(response)
            if (response.body.length) {
                this.user.authenticated = true
                localStorage.setItem('id_token', response.body[0].id)
                
                // if (redirect) {
                    router.go(redirect)
                // }
            } else {
                context.error = 'Brak takiego uzytkownika'
            }
        }, (response) => {
            console.log(response)
        });
    },

    signup(context, creds, redirect) {
        context.$http.post(SIGNUP_URL, creds, (data) => {
            localStorage.setItem('id_token', data.id_token)

            this.user.authenticated = true

            if (redirect) {
                router.go(redirect)
            }

        }).error((err) => {
            context.error = err
        })
    },

    logout() {
        localStorage.removeItem('id_token')
        this.user.authenticated = false
    },

    checkAuth() {
        var jwt = localStorage.getItem('id_token')
        if (jwt) {
            this.user.authenticated = true
        }
        else {
            this.user.authenticated = false
        }

    }
}