<template>
	
<div class="column-wrapper">

	<div class="col-fixed-size list-area">

		<span v-if="listEditable">
              <input v-model="listData.list_name">
              <button class="btn btn-default" v-on:click="saveList">
                <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
		</button>
		<!--<p>Message is: {{ message }}</p>-->
		</span>
		<span v-else>
          <span class="list-name">{{listData.list_name}}</span>
		<span style="cursor: pointer;" aria-hidden="true" @click="toggleFavList({list: listData})" :class="[listData.favourite ? 'glyphicon glyphicon-star' : 'glyphicon glyphicon-star-empty']">
            </span>

		<div class="btn-group" role="group" aria-label="listButtons">
			<button class="btn btn-default" data-toggle="modal" :data-target="listModal">
                <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
              </button>
			<button class="btn btn-default" v-on:click="listEditable = true">
                <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
              </button>
			<button class="btn btn-default" v-on:click="delList({list: listData})" v-show="listData.archived">
                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
              </button>
			<button class="btn btn-default" v-on:click="archiveList({list: listData})">
                <span class="glyphicon glyphicon-folder-close" aria-hidden="true"></span>
              </button>
		</div>
		</span>
		<div>
			<card v-for="card in cards" :card-data="card" :key="card.id"></card>
		</div>


		<!--Modal-->
		<div class="modal fade" :id="listParam" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
						<h4 class="modal-title" id="myModalLabel">Dodaj nowa karte</h4>
					</div>
					<div class="modal-body">
						<p>
							Nazwa
							<input v-model="newCard.card_name"> Opis
							<input v-model="newCard.desc">
						</p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
						<button type="button" class="btn btn-primary" v-on:click="save">Save changes</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

	
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

  export default {
    data() {
      return {
        listEditable: false,
        listName: '',
        newCard: {
          "listId": 'this.listData.id',
          "card_name": '',
          "desc": ''
        },
        listModal: '#modal-list',
        listParam: 'modal-list'

      }
    },

    computed: {
      cards () {
        return this.$store.state.cards[this.listData.id]
      }
	//   ,
	//   listData() {
	// 	//   if (this.$store.state.route.params.boardId === this.$store.state.activeBoard.id) {
	// 	//   console.log('listparam ' + this.$store.state.activeBoard.id)
	// 		// console.log(this.$store.state.lists[this.$route.params.listId])
	// 		return this.$store.state.lists[this.$store.state.route.params.boardId]
	// 	// }
	//   }
    },
    methods: {
      ...mapActions([
	  'getCards',
      'editList',
      'toggleFavList',
      'archiveList',
	  'addCard',
	  'delList'
    ]),

    save() {
		this.addCard({card: this.newCard})
    },
    saveList() {
        this.listEditable = false
        this.editList({list: this.listData, name: this.listData.list_name, pos: this.listData.pos})
    }
  },
  mounted: function () {
  this.$nextTick(function () {
	 // this.getCards({listId: this.listData.id})
   })
  },
  props: ['listData', 'index']
//   props:{
//   listData: {
//       type: Object,
//       required: true
// 	}, 
// 	index: Number
// 	}
//   }
  }
  </script>


<style scoped>
    .column-wrapper {
        margin: 0;
        box-sizing: border-box;
        display: inline-block;
        vertical-align: top;
        white-space: nowrap;
    }
  
	.list-area {
		background-color: rgba(185, 191, 194, 1);
		margin: 10px;
		padding: 10px;
		position: relative;
		border-radius: 7px;
		box-shadow: 0px 0px 8px #444c5c;
	}
	
	.delete-list {
		margin-right: 10em;
		position: absolute;
		cursor: pointer;
	}
	
	.btn-group {
		float: right;
		margin-top: -5px;
	}
	
	.list-name {
		font-size: 20px;
		font-weight: bold;
	}
	
	.col-fixed-size {
		width: 340px;
	}
</style>