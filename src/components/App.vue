<template>
	<div>
		<nav class="navbar navbar-default">
			<div class="container1">
				<ul class="nav navbar-nav">
					<li><router-link to="/home">{{ $t("app.home") }}</router-link></li>
					<li><router-link to="login" v-if="!user.authenticated">{{ $t("app.login") }}</router-link></li>
					<li><router-link to="signup" v-if="!user.authenticated">{{ $t("app.signingUp") }}</router-link></li>
					<li><router-link to="/dashboard" v-if="user.authenticated" v-on:click.native="logout">{{ $t("app.logout") }}</router-link></li>
				</ul>		
				<div class="logo">
					<img src='/assets/logo/morello_logo.png' alt='Morello logo'> 
				</div>	
			</div>
			
		</nav>
		<div class="container">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
  import auth from '../auth'

  export default {
    data() {
      return {
        user: auth.user
      }
    },

    methods: {
      logout() {
		  	console.log('logout')
		  	auth.logout()
      }
    }

  }
</script>

<style scoped>

	.container {
		width: 100%;
	}

	.navbar .navbar-nav {
    display: inline-block;
    float: none;
	}

	.navbar .navbar-collapse {
    text-align: center;
	}

	.logo img {
		height: 85px;
	}

	.logo {
		text-align: center;
		margin-top: -60px;
		
	}

</style>