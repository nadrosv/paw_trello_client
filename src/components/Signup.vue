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
          v-model="credentials.username"
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
          username: '',
          password: ''
        },
        error: ''
      }
    },
    methods: {
      submit() {
        var credentials = {
          username: this.credentials.username,
          password: this.credentials.password
        }
        // We need to pass the component's this context
        // to properly make use of http in the auth service

        auth.signup(this, credentials, '/home')
      }
    }

  }
  </script>