<template>
	<!--<div class="col-md-8">-->
	<!--<div class="col-md-4 list-area">-->

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
			<div class="btn-group" role="group" aria-label="listButtons">
				<button class="btn btn-default" data-toggle="modal" :data-target="listModal">
              <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
            </button>
				<button class="btn btn-default" v-on:click="editList">
              <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
            </button>
				<button class="btn btn-default" v-on:click="delList">
              <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
            </button>
			</div>
			</span>
			<div>
				<card v-for="card in cards" :card-data="card"></card>
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
							<button type="button" class="btn btn-primary" v-on:click="addCard">Save changes</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	
</template>

<script>
  export default {
    data() {
      return {
        cards: [],
        listEditable: false,
        listName: '',
        newCard: {
          "listId": this.listData.id,
          "card_name": '',
          "desc": ''
        },
        newCardName: '',
        listModal: '#modal-list' + this.listData.id,
        listParam: 'modal-list' + this.listData.id

      }
    },
    methods: {
      getCard() {
        this.$http.get('http://localhost:3000/cards?listId='+this.listData.id).then((response) => {
          this.cards = response.body;
        }, (response) => {
         console.log(response)
        });
    },
    addCard() {
       console.log(this.newCard)
         this.$http.post('http://localhost:3000/cards', this.newCard).then((response) => {
        console.log('dodano karte')
        this.cards.push(response.body)
        console.log(response.body)
        }, (response) => {
          console.log(response)
      });
    },
    delList() {
        this.$http.delete('http://localhost:3000/lists/' + this.listData.id).then((response) => {
        console.log(response.body)
        }, (response) => {
         console.log(response)
        });
        this.$emit('delList')
        this.$el.remove();
    },
    editList() {
        console.log('edit')
        this.listEditable = true
    },
    saveList() {
        console.log('saving')
        // this.listData.list_name = this.listName
        this.listEditable = false
        this.$http.put('http://localhost:3000/lists/' + this.listData.id, this.listData ).then((response) => {
        console.log(response.body)
        }, (response) => {
         console.log(response)
        });
    }
     
  },
   //created: function () {
     //   this.getCard();
  //},
  mounted: function () {
  this.$nextTick(function () {
 this.getCard();
   })
  },
  props: ['listData']
  }
  </script>


<style scoped>
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
		width: 360px;
	}

</style>
