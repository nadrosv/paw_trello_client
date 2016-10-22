<template>
	<!--<div class="col-md-8">-->
		<div class="board-area board">
			{{$route.params.boardId}}
			<span v-if="editing">
            <input v-model="boardName">
            <button class="btn btn-primary" v-on:click="edit">OK</button>
            <!--<p>Message is: {{ message }}</p>-->
      </span>
			<span v-else>
          <button class="btn btn-primary" v-on:click="editing = true">Edit name
            <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
          </button>
      </span>
			<!--{{newName}}-->
			<button class="btn btn-primary" data-toggle="modal" :data-target="hashModal">Add list
        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
      </button>
			<button class="btn btn-primary" v-on:click="delBoard({board: boardData})">Remove board
        <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
      </button>

			<!--<button class="btn btn-primary" v-on:click="addList">Add list</button>-->
			
			<!--<list v-for="list in lists" :list-data="list"></list>-->

			<!--Modal-->
			<div class="modal fade" :id="modalParam" tabindex="-1" role="dialog" aria-labelledby="board-modal-label" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
							<h4 class="modal-title" id="board-modal-label">Dodaj nowa liste</h4>
						  </div>
						  <div class="modal-body">
                <p>
                  Tytul
                  <input v-model="newListName">
                </p>
						  </div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
							<button type="button" class="btn btn-primary" v-on:click="addList">Save changes</button>
						</div>
					</div>
				</div>
			</div>
    <div class="list-container">
				<list v-for="(list,i) in lists" :list-data="list" :index="i" :key="list.id"></list>
			</div>
  </div>

</template>

<script>
import { mapActions, mapMutation } from 'vuex'
  export default {
    data() {
      return {
        boardName: this.boardData.board_name,
        newListName: '',
        editing: false,
        hashModal: '#modal' + this.boardData.id,
        modalParam: 'modal' + this.boardData.id
      }
    },
    computed: {
    // a computed getter
    newName: function () {
      // `this` points to the vm instance
      return this.boardData.board_name = this.message
    },
    lists () {
      // console.log('lists ' + this.$store.state.lists[0].data[0])
      // return this.$store.state.lists[this.index]
      return this.$store.state.lists[this.boardData.id]
    }
  },
    
    methods: {  
    ...mapActions([
      'editBoard',
      'delBoard'
    ]),
      getList() {
        this.$http.get('http://localhost:3000/lists?boardId='+this.boardData.id).then((response) => {
          this.$store.commit('getLists', {boardId: this.boardData.id, lists: response.body}, { silent: true })
          // this.lists = response.body;
        }, (response) => {
         console.log(response)
        });
    },
    edit() {
      this.editing = false;
      let boardData = this.boardData
      let boardName = this.boardName
      this.$store.dispatch('editBoard', {boardData, boardName})

    },

     addList() {
       console.log(this.lists)
        let newListData = {
        "boardId": this.boardData.id,
        "list_name": this.newListName,
        "favourite": false
      }
      console.log(this.lists)
      // this.boardData.lists.push(newListData)
      // this.lists.push(newListData)
         this.$http.post('http://localhost:3000/lists', newListData).then((response) => {
        console.log('dodano board')
        console.log(response.body)
        this.lists.push(response.body)
        }, (response) => {
          console.log(response)
      });
     }
  }, 
  //created: function () {
    //  this.getList()
  //},
  mounted: function () {
  this.$nextTick(function () {
    this.getList()
   })
  },
  
  props: ['boardData', 'index']
  }

  </script>

<style scoped>
	.board-area {
		background-color: rgba(0,141,196,1);
		margin: 10px;
		padding: 10px;
		overflow: hidden;
	}

  .list-container {
    display: flex;
    flex: 1;
  }

</style>
