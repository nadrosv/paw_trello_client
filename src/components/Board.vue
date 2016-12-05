<template>
	<div class="board-area board">
	
	<span v-if="editing">
            <input v-model="boardName" v-on:keyup.enter="edit">
            <button class="btn btn-primary" v-on:click="edit">OK</button>

    </span>
	<span v-else>
          <button class="btn btn-primary" v-on:click="editing = true"> {{ $t("board.editNameBtn") }}
            <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
	</button>
	</span>

	<button class="btn btn-primary" data-toggle="modal" :data-target="boardData.hash">{{ $t("board.addListBtn") }}
        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
      </button>
	<button class="btn btn-primary" v-on:click="delBoard({board: boardData})">{{ $t("board.removeBoardBtn") }}
        <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
	</button>
	<button class="btn btn-primary" v-on:click="favBoard({board: boardData})">
		<span style="cursor: pointer;" aria-hidden="true" 
			:class="[boardData.favourite ? 'glyphicon glyphicon-star' : 'glyphicon glyphicon-star-empty']">
		</span>
  	</button>
	<button class="btn btn-primary" type="button" data-toggle="collapse" :data-target="hashModal.concat('label')" aria-expanded="false">{{ $t("board.addMemberBtn") }}</button>  
	<button class="btn btn-primary" type="button" data-toggle="collapse" :data-target="hashModal.concat('team')" aria-expanded="false">{{ $t("board.teamsBtn") }}</button>  
	<button class="btn btn-primary" type="button" data-toggle="collapse" :data-target="hashModal.concat('share')" aria-expanded="false">{{ $t("board.shareBtn") }}</button>  
	

	  <!-- Archived button -->
	<div class="btn-group">
		<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			{{ $t("board.archivedBtn") }} <span class="caret"></span>
		</button>
		<ul class="dropdown-menu">
			<li>
				<router-link v-for="(list,i) in lists" v-show="list.archived"
 				:to="{ name: 'List', params: {boardId: $route.params.boardId, listId: i }}">{{list.list_name}}</router-link>
			</li>
		</ul>
	</div>
	<router-view :list-data="selectedList"></router-view>
	
	<!--Modal-->
	<div class="modal fade" :id="boardData.param" tabindex="-1" role="dialog" aria-labelledby="board-modal-label" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
					<h4 class="modal-title" id="board-modal-label">{{ $t("board.addListModal_title") }}</h4>
				</div>
				<div class="modal-body">
					<p>
						{{ $t("board.addListModal_listName") }}
						<input v-model="newListName" v-on:keyup.enter="saveList">
					</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">{{ $t("home.addBoardModal_closeBtn") }}</button>
					<button type="button" class="btn btn-primary" v-on:click="saveList">{{ $t("home.addBoardModal_saveBtn") }}</button>
				</div>
			</div>
		</div>
	</div>

	<div class="collapse" :id="modalParam.concat('label')">
            <div class="well">
                <button v-for="user in users" class="btn btn-secondary"
                        v-on:click="onShare(user)">
                        {{user.userName}}
                </button>
            </div>
	</div>

	<div class="collapse" :id="modalParam.concat('share')">
            <div class="well">
                http://localhost:8080/#/dashboard/share/board/{{boardData.id}}
            </div>
	</div>

	<div class="collapse" :id="modalParam.concat('team')">
		<div class="well">
			<button v-for="(team, index) in teams" class="btn btn-secondary" type="button" data-toggle="collapse" 
					:data-target="hashModal.concat('team-board')" aria-expanded="false"
					@click="selectedTeamBoard = index"> {{team.name}} </button>  
			
			<div v-if="teams[selectedTeamBoard]" class="collapse" :id="modalParam.concat('team-board')">
				<button class="btn btn-secondary" v-for="board in teams[selectedTeamBoard].boards">
					<router-link :to="{ name: 'Board', params: { boardId: board }}"> {{board}} </router-link>
				</button>
			</div>
		</div>
	</div>
	

	<div v-show="this.$route.params.listId === undefined" class="list-container" 
		 v-sortable="{delay: 20, onStart: onStart, onEnd: onEnd, onUpdate: onUpdate, forceFallback: true,  ghostClass: 'ghost', handle: '.list-name'}">
		<list v-for="(list,k,i) in lists" 
			v-show="!list.archived"
			:list-data="list"
			:key="list.id">
		</list>
    </div>

	<button type="button" class="btn btn-info btn-logs" @click="logsVisible=!logsVisible">{{ $t("board.showLogsBtn") }}</button>
	<div class="super-activity-container" v-show="logsVisible">
		<activity v-for="activity in activities" :activity-data="activity" :key="activity.id"></activity>
	</div>


</div>
</template>

<script>
import { mapActions, mapMutation } from 'vuex'
import auth from '../auth'
import Vue from 'vue'

export default {
	data() {
		return {
			lists: {},
			boardName: this.boardData.board_name,
			newListName: '',
			editing: false,
			hashModal: '#modal' + this.boardData.id,
			modalParam: 'modal' + this.boardData.id,
			selectedList: {},
			logsVisible: false,
			users: {},
			teams: {},
			selectedTeamBoard: -1,
		}
	},
	computed: {
		newName: function () {
			return this.boardData.board_name = this.message
		},
		lists() {
			return this.$store.state.lists[this.boardData.id]
		},
		activities() {
			return this.$store.state.activities[this.boardData.id]
		}		
	},

	methods: {  
		...mapActions([
			'getLists',
			'addList',
			'editList',
			'editBoard',
			'delBoard',
			'favBoard',
			'shareBoard'
		]),

		edit() {
			this.editing = false;
			this.editBoard({ boardData: this.boardData, boardName: this.boardName })
		},

		saveList() {
			let len = this.lists === undefined ? 0 : this.lists.length

			let newListData = {
				"boardId": this.boardData.id,
				"list_name": this.newListName,
				"favourite": false,
				"pos": len,
				"archived": false
			}
			this.addList({ list: newListData })

			$('.modal').modal('hide')
			
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
		},
     	onEnd: function(event) {
		},
		onShare: function(user) {
			this.shareBoard({board: this.boardData, user})
		}
	},

	created: function () {
		this.$nextTick(function () {
			this.$store.dispatch('getUsers').then((users) => {
				this.users = users
				
			})
			console.log(auth.user.authenticated)
			if (auth.user.authenticated) {

			this.$store.dispatch('getUserTeams').then((teamsUser) => {
				this.$store.dispatch('getTeams', {teams: teamsUser}).then((teams) => {
				this.teams = teams[0]
				this.$store.commit('GET_TEAMS', teams[0])
				})
			})
			}
		})
	},

	props: ['boardData', 'index'],

 	watch: {
		'$route' (to, from) {
			if(to.params.listId !== undefined) {
			this.selectedList = (this.$store.state.lists[this.$store.state.activeBoard.id])[to.params.listId]
			}			
		}
  	}
}

</script>

<style scoped>

	.board-area {
		margin: 10px;
		padding: 10px;
		overflow: hidden;
	}

	.list-container {
		top: 280px; 
		right: 0; 
		bottom: 0;
		left: 0; 
		display: flex;
		flex: 1;
		overflow: auto;   			
		white-space: nowrap;
		overflow-x: auto;
  	}

	.ghost {
		opacity: 0;
	}

	.super-activity-container {
		background-color: rgba(0,121,186,0.9);
		padding: 5px;
		border-radius: 5px;
		color: rgba(245, 235, 238, 0.9);
	}
	
</style>