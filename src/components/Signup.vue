<template>
    <div class="col-sm-4 col-sm-offset-4">
      <h2>Sign up</h2>
      <p>Sign up to the best Trello clone</p>
      <div class="alert alert-danger" v-if="error">
        <p>{{ error }}</p>
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="Enter your username"
          v-model="credentials.userName"
        >
      </div>
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          placeholder="Enter your password"
          v-model="credentials.password"
        >
      </div>
      <button class="btn btn-primary" v-on:click="submit()">Signup</button>
    </div>
  </template>

  <script>
  import auth from '../auth'
  export default {
    data() {
      return {
        credentials: {
          userName: '',
          password: ''
        },
        error: ''
      }
    },
    methods: {
      submit() {
        var credentials = {
          userName: this.credentials.userName,
          password: this.credentials.password
        }
        auth.signup(this, credentials, '/home')
      }
    }
  }
  </script>