<template>
	<!--<div class="col-md-8">-->
	<div class="home-area">

		<div>
    <input v-model="searchPhrase"></input>
			<button class="btn btn-primary" data-toggle="modal" data-target="#home-modal">Dodaj tablice</button>
      <br>
      <br>
			<!-- Nav tabs -->
			<ul class="nav nav-pills" role="tablist">

				<li role="presentation" v-for="b in comp.filter(customFilter)" :key="b.id" >
					<a :href="b.hash" :aria-controls="b.hash" role="tab" data-toggle="tab" > {{b.board_name}} </a>
				</li>
			</ul>

			<div class="tab-content">
				<br>
				<!--<button class="btn btn-primary" v-on:click="addBoard()">Add board</button>-->

				<br>
				<div role="tabpanel" v-for="b in comp.filter(customFilter)" class="tab-pane fade in" :id="b.param" :key="b.id">
					<board v-on:del="deleteBoard(b)" :board-data="b">
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
						<button type="button" class="btn btn-primary" v-on:click="addBoard">Save changes</button>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
import user from './App.vue'
import auth from '../auth'


  export default {
    data() {
      return {
        searchPhrase: '',
        boards: [],
        comp: [],
        newBoardName: '',
        comp1: this.comp
      }
    },
    methods: {
      customFilter: function(board) {
          return board.board_name.indexOf(this.searchPhrase) != -1
      },
      addBoard() {
        let formData = {
        "userId": auth.user.id,
        "board_name": this.newBoardName
      }
         this.$http.post('http://localhost:3000/boards', formData).then((response) => {
        console.log('dodano board')
        response.body.hash = '#board' + response.body.id
        response.body.param = 'board' + response.body.id;
        // this.$set(this.comp, this.comp.length, response.body)
        this.comp.push(response.body)
        // this.getComp()
        }, (response) => {
          console.log(response)
      });

      console.log(this.boards)
      
      },
    getComp() {
      console.log(user.data())
      console.log('id ' + auth.user.id)
      console.log('auth2' + auth.user.authenticated)
        this.$http.get('http://localhost:3000/boards?userId=' + auth.user.id).then((response) => {
        console.log(response.body)
        this.comp = response.body;
        var i
        for (i = 0; i < this.comp.length; i++) { 
          this.comp[i].hash = '#board' + this.comp[i].id;
          this.comp[i].param = 'board' + this.comp[i].id;
        }
        
        console.log(this.comp[0].lists)
        }, (response) => {
         console.log(response)
        });
    },
    deleteBoard(board) {
      console.log('delete board')
      var index = this.comp.indexOf(board)
      this.comp.splice(index, 1)
      
    }
  },
  // created: function () { 
  //   this.getQuote()
  // },
  mounted: function () {
  this.$nextTick(function () {
    // this.getQuote()
    this.getComp()
  })
  },
  route: {
    canActivate() {
      console.log('can activate')
      return auth.user.authenticated
    }
  }
  
  //Rejestruje komponent jako lokalny tylko dla rodzica
  //components: {
  //// <my-component> will only be available in parent's template
  //  'board': Board
  //}
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