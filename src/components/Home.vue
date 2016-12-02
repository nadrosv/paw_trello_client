<template>
	<!--<div class="col-md-8">-->
	<div class="home-area">
		<div>

	  <div class="search-container">
		<input class="input-search" v-model="searchPhrase" v-bind:placeholder="$t('search.placeholder')"></input>	
	  </div>

	  <div class="dropdown">
		<button class="dropbtn" v-on:click="showMenu">MENU</button>
		<div class="dropdown-content">
		  <p>{{ $t("menu.language") }}:</p>
		  <button class="btn btn-primary" type="button" aria-expanded="false" @click="changeLangToEng">{{ $t("board.langToEngBtn") }}</button> 
			<button class="btn btn-primary" type="button" aria-expanded="false" @click="changeLangToPl">{{ $t("board.langToPlBtn") }}</button>
		  <p>{{ $t("menu.wallpapers") }}:</p>
		  <div class='wallpapers-section'>
			<img src='/assets/backgrounds/background1.png' v-on:click="setWallpaper($event)">
			<img src='/assets/backgrounds/background2.png' v-on:click="setWallpaper($event)">
			<img src='/assets/backgrounds/wallpaper1_thumbnail.jpg' v-on:click="setWallpaper($event)">
			<img src='/assets/backgrounds/wallpaper2_thumbnail.jpg' v-on:click="setWallpaper($event)">
			<img src='/assets/backgrounds/wallpaper3_thumbnail.jpg' v-on:click="setWallpaper($event)">
			<img src='/assets/backgrounds/wallpaper4_thumbnail.jpg' v-on:click="setWallpaper($event)">
			<img src='/assets/backgrounds/wallpaper5_thumbnail.jpg' v-on:click="setWallpaper($event)">
			<img src='/assets/backgrounds/wallpaper6_thumbnail.jpg' v-on:click="setWallpaper($event)">
			<img src='/assets/backgrounds/wallpaper7_thumbnail.jpg' v-on:click="setWallpaper($event)">
			<img src='/assets/backgrounds/wallpaper8_thumbnail.jpg' v-on:click="setWallpaper($event)">
			<img src='/assets/backgrounds/wallpaper9_thumbnail.jpg' v-on:click="setWallpaper($event)">
			<img src='/assets/backgrounds/wallpaper10_thumbnail.jpg' v-on:click="setWallpaper($event)">
			<img src='/assets/backgrounds/wallpaper11_thumbnail.jpg' v-on:click="setWallpaper($event)"> 
			<img src='/assets/backgrounds/wallpaper12_thumbnail.jpg' v-on:click="setWallpaper($event)">
<img src='/assets/backgrounds/wallpaper13_thumbnail.jpg' v-on:click="setWallpaper($event)">
		  </div>
		</div>
	  </div>	

			<button class="btn btn-primary" data-toggle="modal" data-target="#home-modal">{{ $t("home.addBoard") }}</button>
	  <br>
	  <br>
			<!-- Nav tabs -->
			<ul class="nav nav-pills" role="tablist">

				<li role="presentation" v-for="(b,i) in boards.filter(customFilter)">
		<router-link  :key="b.id"
 				:to="{ name: 'Board', params: { boardId: i }}"
				 >{{b.board_name}}</router-link>
		 </li>
			</ul>
	  <router-view :board-data="activeBoard"></router-view>

			<div class="tab-content">
				<br>
				<!--<button class="btn btn-primary" v-on:click="addBoard()">Add board</button>-->

				<br>
				<!--<div role="tabpanel" v-for="(b,i) in boards.filter(customFilter)" class="tab-pane fade in" :id="b.param" :key="b.id">
					<board :board-data="b" :index="i">
					</board>
				</div>
		-->
			</div>
		</div>

		<div class="modal fade" id="home-modal" tabindex="-1" role="dialog" aria-labelledby="home-modal-Label" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
		  <span aria-hidden="true">&times;</span>
		</button>
						<h4 class="modal-title" id="home-modal-Label">{{ $t("home.addBoardModal_title") }}</h4>
					</div>
					<div class="modal-body">
						<p>
							{{ $t("home.addBoardModal_boardName") }}
							<input v-model="newBoardName">
						</p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">{{ $t("home.addBoardModal_closeBtn") }}</button>
						<button type="button" class="btn btn-primary" v-on:click="add">{{ $t("home.addBoardModal_saveBtn") }}</button>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
  import user from './App.vue'
  import auth from '../auth'
  import {store} from '../store/index.js'
  import { mapActions, mapMutations } from 'vuex'
  import Vue from 'vue'

  export default {
	data() {
	  return {
		searchPhrase: '',
		newBoardName: '',
		comp1: this.comp
	  }
	},
	computed: {
	  boards () {
		return this.$store.state.comp
	  },
	  activeBoard () {
		return this.$store.getters.activeBoard
	  }
	},
	methods: {
	   ...mapMutations([
	  'setActiveBoard' 
	  ]),
	  ...mapActions([
		'addBoard',
		'getBoards',
		'getComps'
	  ]),
	  
	  changeLangToEng() {
		Vue.config.lang = 'en';
		document.cookie = "lang=en";
	  },

	  changeLangToPl() {
		Vue.config.lang = 'pl';
		document.cookie = "lang=pl";
	  },

	  customFilter: function(board) {
		if (board.board_name !== undefined)
		  return board.board_name.indexOf(this.searchPhrase) != -1
	  },
	  
	  add() {
		let formData = {
		"userId": auth.user.id,
		"board_name": this.newBoardName
		}
		this.addBoard({board: formData})
	  },

	  showMenu () {
		var m = $('.dropdown-content');
		if (m.is(":visible") == true) {
		  m.animate({height: '0px'}, "slow");
		  m.css({"display":"none"});
		}
		else {
		  m.animate({height: '500px'}, "slow");
		  m.css({"display":"block","z-index":"10"});        
		}
	  },

	  setWallpaper: function(e) {
		var imgURL = e.path[0].src;
		var imgURL2 = imgURL.split("_")[0]+".jpg";
		// console.log(imgURL);
		//console.log('url("' + imgURL + '")');

		if ( imgURL.split("backgrounds")[1] == "/background1.png" ) {
		  $("body").css("background","rgba(0,141,196,1)");
		  var a = '"background"'+","+'"rgba(0,141,196,1)"';
		  console.log(a);
		  document.cookie = "wallpaper=" + a;
		}
		else if ( imgURL.split("backgrounds")[1] == "/background2.png" ) {
		  $("body").css("background","rgb(255, 109, 0)");
		  var b = '"background"'+","+'"rgb(255, 109, 0)"';
		  document.cookie = "wallpaper=" + b;
		}
		else {
		  $("body").css("background-image",'url("' + imgURL2 + '")');
		  var c = '"background-image",'+"'"+'url("'+ imgURL2 + '")'+"'";
		  console.log(c);
		  document.cookie = "wallpaper=" + c;
		}
	  }
  },
  mounted: function () {
	this.$nextTick(function () {
	  if (auth.user.authenticated) {
		this.getComps()
	  } else {
		this.$store.dispatch('getBoard', {id: this.$route.params.boardId})
	  }

	  document.cookie = document.cookie;
	  var match = document.cookie.match(new RegExp('lang' + '=([^;]+)'));
	  if (match) {
		console.log( match[1] );
		Vue.config.lang = match[1]
	  }
	  
	  var match = document.cookie.match(new RegExp('wallpaper' + '=([^;]+)'));
	  if (match) {
		console.log( match[1] );
		$("body").css( String(match[1]) );
	  }
	  $("body").css( String(match[1]) );
	  
	})
  },
  route: {
	canActivate() {
	  console.log('can activate')
	  return auth.user.authenticated
	}
  },
  watch: {
	'$route' (to, from) {
	  console.log(to)
	  if (auth.user.authenticated) {
		this.setActiveBoard({board: this.$store.state.comp[to.params.boardId]})
	  } else {
		this.setActiveBoard({board: this.$store.state.board})
	  }
	}
  }
  }
  </script>


<style scoped>
  .nav-pills {
	font-size: 17px;
  }

  .nav-pills>li>a {
	background-color: rgba(212, 111, 92, 0.8);
	color: rgba(0,0,0,0.7);
  }
  
  li>a.router-link-active {
	background-color: rgba(194, 95, 95, 1);
	box-shadow: 0px 11px 20px #999999;
	color: white;
  }

  .nav-pills>li>a:hover {
	background-color: rgba(217, 129, 112, 0.9);
  }

  .btn-search {
	margin: 7px 0px 7px 0px;
  }

  .search-container {
	width: 100%;
	text-align: center;
  }

  .input-search {
	height: 30px;
	border-radius: 5px;
	text-align: center;
  }

  .dropbtn {
	background-color: #4CAF50;
	color: white;
	padding: 16px;
	font-size: 16px;
	border: none;
	cursor: pointer;
}

  /* The container <div> - needed to position the dropdown content */
  .dropdown {
	  position: relative;
	  display: inline-block;
  }

  /* Dropdown Content (Hidden by Default) */
  .dropdown-content {
	  display: none;
	  position: absolute;
	  padding: 10px;
	  background-color: #f9f9f9;
	  min-width: 270px;
	  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  }

  /* Links inside the dropdown */
  .dropdown-content a{
	  color: black;
	  padding: 10px 16px;
	  text-decoration: none;
	  display: block;
  }

  /* Change color of dropdown links on hover */
  .dropdown-content a:hover {
	background-color: #f1f1f1
  }

  .dropdown-content p {
	margin-top: 12px;
  }

  /* Change the background color of the dropdown button when the dropdown content is shown */
  .dropdown:hover .dropbtn {
	  background-color: #3e8e41;
  }

  .wallpapers-section img {
	width: 80px;
	padding: 2px;
  }

  .wallpapers-section img:hover {
	border: 2px black solid;
  }

</style>