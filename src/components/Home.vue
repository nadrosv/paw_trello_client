<template>
	<!--<div class="col-md-8">-->
	<div class="home-area">
		<div>

			<!-- Nav tabs -->
			<ul class="nav nav-tabs" role="tablist">

				<li role="presentation" v-for="b in comp">
					<a :href="b.hash" :aria-controls="b.id" role="tab" data-toggle="tab"> {{b.board_name}} </a>
				</li>
			</ul>

			<div class="tab-content">
				<br>
				<button class="btn btn-primary" v-on:click="addBoard()">Add board</button>
        <br>
				<div role="tabpanel" v-for="b in comp" class="tab-pane fade in" :id="b.id">
					<board :board-data="b">
					</board>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
import auth from '../auth'


  export default {
    data() {
      return {
        boards: [],
        comp: []
      }
    },
    //components: {
     // Board
    //},
    
    methods: {
      
      addBoard() {
        let formData = {
        "id": 74,
        "userId": 1,
        "board_name": "board1235"
      }
         this.$http.post('http://localhost:3000/boards', formData).then((response) => {
        console.log('dodano board')
        this.getComp()
        }, (response) => {
          console.log(response)
      });

      //   this.boards.push({
      //   "id": 4,
      //   "userId": 1,
      //   "board_name": "board123"
      // })
      console.log(this.boards)
      
      },
      getQuote() {
        this.$http.get('http://localhost:3000/users/1/boards').then((response) => {
          this.boards = response.body;

        }, (response) => {
         console.log(response)
        });
    },
    getComp() {
        this.$http.get('http://localhost:3000/all').then((response) => {
        console.log(response.body)
        this.comp = response.body;
        var i
        for (i = 0; i < this.comp.length; i++) { 
          this.comp[i].hash = '#' + this.comp[i].id;
        }
        
        console.log(this.comp[0].lists)
        }, (response) => {
         console.log(response)
        });
    },
    deleteBoard(board) {
      this.$el.remove()

      //  this.boards.splice(this.boards.indexOf(board),1);
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