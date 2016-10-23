<template>
	<!--<div class="col-md-8">-->
	<div class="home-area">
		<div>
			<button class="btn btn-primary" data-toggle="modal" data-target="#home-modal">Dodaj tablice</button>
      <br>
      <br>
			<!-- Nav tabs -->
			<ul class="nav nav-pills" role="tablist">

				<li role="presentation" v-for="(b,i) in comps" :key="b.id">
					<a :href="b.hash" :aria-controls="b.hash" role="tab" data-toggle="tab" v-on:click="setActiveBoard({board: b})"> {{b.board_name}} </a>
				</li>
			</ul>

			<div class="tab-content">
				<br>
				<!--<button class="btn btn-primary" v-on:click="addBoard()">Add board</button>-->

				<br>
				<div role="tabpanel" v-for="(b,i) in comps" class="tab-pane fade in" :id="b.param" :key="b.id">
					<board v-on:del="deleteBoard(i)" :board-data="b" :index="i">
					</board>
				</div>
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
        newBoardName: '',
        comp1: this.comp
      }
    },
    computed: {
      comps () {
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
        'addBoard'
      ]),
      
      add() {
        let formData = {
        "userId": auth.user.id,
        "board_name": this.newBoardName
        }
        this.addBoard({board: formData})
      },
      getComp() {
        console.log('id ' + auth.user.id)
        console.log('auth2' + auth.user.authenticated)

          this.$http.get('http://localhost:3000/boards?userId=' + auth.user.id).then((response) => {
          this.$store.commit('addBoards', response.body, { silent: true })
          }, (response) => {
          console.log(response)
          });
      }
    // deleteBoard(index) {
    //   console.log('delete board')
    //   this.$store.commit('deleteBoard', index)
    // }
  },
  mounted: function () {
  this.$nextTick(function () {
    this.getComp()
  })
  },
  route: {
    canActivate() {
      console.log('can activate')
      return auth.user.authenticated
    }
  }
  }
  </script>


  <style scoped>
    .nav-pills {
      font-size: 17px;
    }

    .nav-pills>li>a {
      background-color: rgba(217, 129, 112, 0.7);
      color: rgba(0,0,0,0.7);
    }

    .nav-pills>li.active>a {
      background-color: rgba(217, 129, 112, 1);
      box-shadow: 0px 10px 20px #999999;
      color: white;
    }

    .nav-pills>li>a:hover {
      background-color: rgba(217, 129, 112, 0.9);
    }

  </style>