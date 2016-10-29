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
	<button class="btn btn-primary" data-toggle="modal" :data-target="boardData.hash">Add list
        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
      </button>
	<button class="btn btn-primary" v-on:click="delBoard({board: boardData})">Remove board
        <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
      </button>


	<!--Modal-->
	<div class="modal fade" :id="boardData.param" tabindex="-1" role="dialog" aria-labelledby="board-modal-label" aria-hidden="true">
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
					<button type="button" class="btn btn-primary" v-on:click="saveList">Save changes</button>
				</div>
			</div>
		</div>
	</div>
	<div class="list-container" v-sortable="{onStart: onStart, onEnd: onEnd, onUpdate: onUpdate, forceFallback: true,  ghostClass: 'ghost'}">
		<list v-for="(list,k,i) in lists" 
			    v-show="!list.archived"
			    :list-data="list"
			    :key="list.id">
		</list>
    </div>

</div>
</template>

<script>
import { mapActions, mapMutation } from 'vuex'
export default {
	data() {
		return{
		lists: {},
		boardName: this.boardData.board_name,
		newListName: '',
		editing: false,
		}
	},
	computed: {
		newName: function () {
			return this.boardData.board_name = this.message
		},
		lists() {
			return this.$store.state.lists[this.boardData.id]
		}
	},

	methods: {  
		...mapActions([
			'getLists',
			'addList',
			'editList',
			'editBoard',
			'delBoard'
		]),

		edit() {
			this.editing = false;
			this.editBoard({ boardData: this.boardData, boardName })
		},

		saveList() {
			let newListData = {
				"boardId": this.boardData.id,
				"list_name": this.newListName,
				"favourite": false,
				"pos": this.lists.length,
				"archived": false
			}
			this.addList({ list: newListData })
			
		},
     	onUpdate: function (event) {
			this.lists.splice(event.newIndex, 0, this.lists.splice(event.oldIndex, 1)[0])
			for (let i = 0; i < this.lists.length; i++) {
				this.lists[i].pos = i
			}
			let oldList = this.lists[event.oldIndex]
			let newList = this.lists[event.newIndex]

			this.editList({ list: oldList, name: oldList.list_name, pos: oldList.pos })
			this.editList({ list: newList, name: newList.list_name, pos: newList.pos })

		},

    	onStart: function(event) {
			$(event.item.firstChild).css({
				"background-color": "rgba(100,141,196,1)",
				"transform": "rotate(360deg)",
				"transition-duration": "0.3s"
			});
		},
     	onEnd: function (event) {
			$(event.item.firstChild).css({
				"background-color": "rgba(185, 191, 194, 1)",
				"transform": "rotate(0deg)"
			});
		}
	},

	mounted: function () {
		this.$nextTick(function () {
			this.getLists({boardId: this.boardData.id})
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
    overflow: auto;   
    
    position: absolute; 
    top: 280px; 
    right: 0; 
    bottom: 0;
    left: 0; 
    
    white-space: nowrap;
    overflow-x: auto;
  	}
	.ghost {
	 opacity: 0;
	}

</style>