<template>
    <div class="col-sm-4 col-sm-offset-4">
      <h2>{{ $t("login.title") }}</h2>
      <p>{{ $t("login.message") }}</p>
      <div class="alert alert-danger" v-if="error">
        <p>{{ error }}</p>
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          v-bind:placeholder="$t('login.loginPlaceholder')"
          v-model="credentials.username"
        >
      </div>
      <div class="form-group">
        <input
			type="password"
			class="form-control"
			v-bind:placeholder="$t('login.passwordPlaceholder')"
			v-model="credentials.password"
			v-on:keyup.enter="submit()">
      </div>
      <button class="btn btn-primary" v-on:click="submit()">Login</button>
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

        auth.login(this, credentials, '/home')
      }
    }
  }
  </script>