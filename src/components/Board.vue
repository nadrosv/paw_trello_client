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
	<div class="list-container" v-sortable="{ onUpdate: onUpdate, onEnd: onEnd}">
		<div v-for="(list,k,i) in lists">
			<list :list-data="list" :index="i" :key="list.id" :id="i">
			</list>
			<p>{{ i }}. {{ k }},, {{list.pos}} : {{ list }} </p>
		</div>
	</div>

	<div>
		<p> ARCHIVED </p>
		<div v-for="(lArchiv,k,i) in archived">
			<list :list-data="lArchiv" :index="i" :key="lArchiv.id" :id="i">
			</list>
			<p>{{ i }}. {{ k }},, {{lArchiv.pos}} : {{ lArchiv }} </p>
		</div>
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

      if (this.$store.state.lists[this.boardData.id] !== undefined) {
        console.log(this.$store.state.lists[this.boardData.id])
       return this.$store.state.lists[this.boardData.id].sort(function(a, b){
        if(a.pos < b.pos) return -1;
        if(a.pos > b.pos) return 1;
        return 0;
       }).filter(a => !a.archived)
      //  return filtered
      } 
      // return this.$store.state.lists[this.boardData.id]
      // let board = this.boardData
      // this.$store.dispatch('getBoardLists', {board})
    },
    archived() {
      if (this.$store.state.lists[this.boardData.id] !== undefined) {
       return this.$store.state.lists[this.boardData.id].sort(function(a, b){
        if(a.pos < b.pos) return -1;
        if(a.pos > b.pos) return 1;
        return 0;
       }).filter(a => a.archived)
    }
    }
  },
    
    methods: {  
    ...mapActions([
      'editBoard',
      'delBoard',
      'editList'
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
        "favourite": false,
        "pos": this.lists.length
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
     },
     dragstart() {
       console.log('start')
     },
     dragend() {
       console.log('end')

     },
     dragover() {
       console.log('over')

     },
     dragenter() {
       console.log('enter')

     },
     drop() {
       console.log()
       console.log('drop')

     },
     onUpdate: function (event) {
      //  console.log('old ' + event.oldIndex)
      //  console.log('new ' + event.newIndex)
       console.log('old ' + event.oldIndex)
       console.log('new ' + event.newIndex)
      // let list = this.lists[event.oldIndex]
      //  console.log('list pos: ' + list.pos)
      // let name = list.list_name
      // // let pos = list.pos
      // let pos = event.newIndex

      
      // let list1 = this.lists[event.newIndex]
      // let name1 = list1.list_name
      // let pos1 = event.oldIndex

      // this.editList({list, name, pos})
      // this.editList({list: list1, name: name1, pos: pos1})

      // this.lists.splice(event.newIndex, 0, this.lists.splice(event.oldIndex, 1)[0])
      let old = this.lists[event.oldIndex]
      let new1 = this.lists[event.newIndex]
      // new1.pos = event.oldIndex
      // old.pos = event.newIndex
      console.log(old)
      console.log(new1)

      // let p1 = old.pos
      // old.pos = new1.pos
      // new1.pos = p1
      // this.$set(this.$store.state.lists[this.boardData.id], event.newIndex, old)
      // this.$set(this.$store.state.lists[this.boardData.id], event.oldIndex, new1)
      // this.$set(new1, pos, event.oldIndex)
      this.$set(this.lists, event.oldIndex, new1)
      this.$set(this.lists, event.newIndex, old)

      // old.pos = event.newIndex
      // this.lists[event.newIndex].pos2 = 'aaa'
      // this.lists.splice(event.newIndex, 0, this.lists.splice(event.oldIndex, 1)[0])
    },
     onEnd: function (event) {
        console.log('old end ' + event.oldIndex)
       console.log('new end' + event.newIndex)
             this.lists[event.oldIndex].pos = event.newIndex
      this.lists[event.newIndex].pos = event.oldIndex

    }
  }, 
  //created: function () {
    //  this.getList()
  //},
  mounted: function () {
  this.$nextTick(function () {
    // this.getList()
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

  .q div {
  width: 200px;
  height: 50px;
  border: solid 1px #ccc;
  box-shadow: 0 1px 2px 0px #888;
  background-color: #f8f8f8;
  margin: 5px;
  display: inline-block;
  position: absolute;
  transition: top 400ms;
}
.q div#placeholder {
  opacity: 0.2;
}


</style>
