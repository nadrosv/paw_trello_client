<template>

<div class="board-area board">
    {{$route.params.boardId}}
    <span v-if="edit">
		<input v-model="boardName">
		<button class="btn btn-primary" v-on:click="saveName">OK</button>
    </span>
    <span v-else>
		<button class="btn btn-primary" v-on:click="editBoard">Edit name
			<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
    	</button>
    </span>

    <button class="btn btn-primary" 
			data-toggle="modal" 
			:data-target="hashModal">Add list
		<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
	</button>
    <button class="btn btn-primary" v-on:click="del">Remove board
		<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
	</button>

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
    <div class="list-container" v-sortable="{ onUpdate: onUpdate, onStart: onStart, onEnd: onEnd}">
		<list v-for="(list,k,i) in lists" 
			:list-data="list"
			v-on:delList="del" 
			:key="list.id" 
			v-show="!list.archived">
		</list>
    </div>
</div>		

</template>

<script>
  export default {
    data() {
      return {
        lists: [],
        listsArchived: [],
        listsArchivedNot: [],
        boardName: this.boardData.board_name,
        newListName: '',
        edit: false,
        hashModal: '#modal' + this.boardData.id,
        modalParam: 'modal' + this.boardData.id
      }
    },
    computed: {
    // a computed getter
    newName: function () {
      // `this` points to the vm instance
      return this.boardData.board_name = this.message
    }
  },
    
    methods: {

      getList() {
        this.$http.get('http://localhost:3000/lists?boardId='+this.boardData.id).then((response) => {
          this.lists = response.body.sort(function(a, b){
            if(a.pos < b.pos) return -1;
            if(a.pos > b.pos) return 1;
            return 0;
          })
        }, (response) => {
         console.log(response)
        });
    },
    del() {
      this.$http.delete('http://localhost:3000/boards/' + this.boardData.id).then((response) => {
        console.log(response.body)
        }, (response) => {
         console.log(response)
        });
       this.$emit('del')
      this.$el.remove();

    },
     editBoard() {
        console.log('edit')
        this.edit = true
    },
    saveName() {
        console.log('saving')
        this.boardData.board_name = this.boardName
        this.edit = false
        this.$http.put('http://localhost:3000/boards/' + this.boardData.id, this.boardData ).then((response) => {
        console.log(response.body)
        }, (response) => {
         console.log(response)
        });
    },
    remove() {
      this.$parent.boards.splice(this.$parent.boards.indexOf(this.boardData),1);
    },
     addList() {
       console.log(this.lists)
       let newPos = this.lists.length
        let newListData = {
        "boardId": this.boardData.id,
        "list_name": this.newListName,
        "archived": false,
        "pos": newPos
      }
     
        this.$http.post('http://localhost:3000/lists', newListData).then((response) => {
        console.log('dodano board')
        console.log(response.body)
        this.lists.push(response.body)
        }, (response) => {
          console.log(response)
      });
     },
     onUpdate: function (event) {
      this.lists.splice(event.newIndex, 0, this.lists.splice(event.oldIndex, 1)[0])
      for (let i=0; i < this.lists.length; i++) {
        this.lists[i].pos = i
      }
      this.$http.put('http://localhost:3000/lists/' + this.lists[event.oldIndex].id, this.lists[event.oldIndex] ).then((response) => {
        console.log(response.body)
        }, (response) => {
         console.log(response)
        })
        this.$http.put('http://localhost:3000/lists/' + this.lists[event.newIndex].id, this.lists[event.newIndex] ).then((response) => {
        console.log(response.body)
        }, (response) => {
         console.log(response)
        })
       
    },
    onStart: function(event) {
      console.log(this.listsArchivedNot)
    },
     onEnd: function (event) {
    }
  }, 

  mounted: function () {
  this.$nextTick(function () {
    this.getList()
   })
  },
  
  props: ['boardData']
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
    overflow: auto;   
    
    position: absolute; 
    top: 280px; 
    right: 0; 
    bottom: 0;
    left: 0; 
    
    white-space: nowrap;
    overflow-x: auto;
  }

</style>
