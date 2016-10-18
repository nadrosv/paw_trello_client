<template>
	<!--<div class="col-md-8">-->
	<div class="home-area">
		<tabs>
			<tab header="one">
				...
			</tab>
			<tabs>
				<tab header="two">
					...
				</tab>
			</tabs>
			<button class="btn btn-primary" v-on:click="addBoard()">Add board</button>

			<!--<board v-for="(b, i) in boards" :board-data="b" v-on:del="deleteBoard(b)"></board> -->
			<board v-for="b in comp" :board-data="b"></board>
	</div>
	<!--</div>-->
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
        "id": 7,
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