<template>
	<!--<div class="col-md-8">-->
	<div class="home-area">
		<div>

      <div class="search-container">

        <input class="input-search" v-model="searchPhrase" placeholder="Search"></input>	
      </div>
      <div class="dropdown">
        <button class="dropbtn" v-on:click="showMenu">MENU</button>
        <div class="dropdown-content">
          <a href="#">Link 1</a>
          <a href="#">Link 2</a>
          <a href="#">Link 3</a>
        </div>
      </div>	
			<button class="btn btn-primary" data-toggle="modal" data-target="#home-modal">Dodaj tablice</button>
      <br>
      <br>
			<!-- Nav tabs -->
			<ul class="nav nav-pills" role="tablist">

				<li role="presentation" v-for="(b,i) in boards.filter(customFilter)">
        <router-link  :key="b.id"
 				:to="{ name: 'Board', params: { boardId: i }}"
         >{{b.board_name}}</router-link>
					<!--<a :href="b.hash" :aria-controls="b.hash" role="tab" data-toggle="tab" 
              v-on:click="setActiveBoard({board: b}, {silent: true})"> {{b.board_name}} </a>-->
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
						<h4 class="modal-title" id="home-modal-Label">Dodaj nowa tablice</h4>
					</div>
					<div class="modal-body">
						<p>
							Nazwa tablicy
							<input v-model="newBoardName">
						</p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
						<button type="button" class="btn btn-primary" v-on:click="add">Save changes</button>
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
          m.animate({height: '300px'}, "slow");
          m.css({"display":"block","z-index":"10"});        
        }
      }
  },
  mounted: function () {
  this.$nextTick(function () {
    // this.getBoards()
     if (auth.user.authenticated) {
       this.getComps()
     } else {
       this.$store.dispatch('getBoard', {id: this.$route.params.boardId})
     }
    
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
      background-color: #f9f9f9;
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  }

  /* Links inside the dropdown */
  .dropdown-content a {
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
  }

  /* Change color of dropdown links on hover */
  .dropdown-content a:hover {background-color: #f1f1f1}

  /* Change the background color of the dropdown button when the dropdown content is shown */
  .dropdown:hover .dropbtn {
      background-color: #3e8e41;
  }

</style>