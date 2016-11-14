<template>
	<!--<div class="col-md-8">-->
	<div class="card-area" v-on:click.self="showwmodal({ card: cardData })">
		<!--ID: {{cardData.id}}-->
		
		<div class="card-label-container">
			<span v-for="label in labels" class="card-label" :style="{ 'background-color': label.color }"></span>
		</div>

		<span>
			{{cardData.card_name}}
		</span>		

		<div class="btn-group" role="group" aria-label="listButtons">
			<button class="btn btn-default" data-toggle="modal" :data-target="hashModal">
				<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
			</button>
			<button class="btn btn-default" v-on:click="delCard({ card: cardData })" v-show="cardData.archived">
				<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
			</button>
			<button class="btn btn-default" v-on:click="archiveCard({card: cardData})">
				<span class="glyphicon glyphicon-folder-close" aria-hidden="true"></span>
			</button>
			<!--<button class="btn btn-default" data-toggle="modal" :data-target="hashModal1">
				<span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span>
			</button>-->
		</div>

		<div v-if="cardData.files !== undefined">
			<img v-for="image in cardData.files" :src="image" alt="Picture" height="64" width="64">
		</div>
		
		<!--Modal - edit tile & description-->
		<div class="modal fade" :id="modalParam" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<h4 class="modal-title" id="myModalLabel">Edit title and description</h4>
					</div>
					<div class="modal-body">
						<p>
							Title
							<input v-model="newName"> 
							Description
							<input v-model="newDesc">
						</p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
						<button type="button" class="btn btn-primary" v-on:click="save">Save changes</button>
					</div>
				</div>
			</div>
		</div>
		
		<!--Modal - advanced edit card's options -->
		<div class="modal fade" :id="modalParam1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<!--<div class="modal-content">-->
					<!--<div class="modal-header">-->
						<div class="modal-body">
							<cardview :cardview-data="cardViewData"></cardview>
						</div>
					<!--</div>-->
				<!--</div>-->
			</div>
		</div>

	</div> <!--card-area-->
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

  export default {
    data() {
      return {
        // editedCard: {Object.assign({},this.cardData),
        // editedCard: {...this.cardData},
        newName: this.cardData.card_name,
        newDesc: this.cardData.desc,
        hashModal: '#modal-card' + this.cardData.id,  // edit title and description
        modalParam: 'modal-card' + this.cardData.id,
        hashModal1: '#modal-card-1' + this.cardData.id,  // advanced card edit
        modalParam1: 'modal-card-1' + this.cardData.id,
				labels: {}
      }
    },
		computed: {
			labels() {
					// let cardLabelsText = this.cardData.labels.toString(); //"12"
					// let cardLabels = []
					// for (let i = 0; i < cardLabelsText.length; i++) {
					// 	let n = cardLabelsText.charAt(i)
					// 	cardLabels.push(this.$store.state.globalLabels[n])
					// }
					// //console.log(cardLabels)
					// return cardLabels
					return this.$store.state.labels[this.cardData.id]

				},

			cardViewData() {
				let a = this.cardData;
				// a.newLabels = this.labels;
				this.$set(a, 'newLabels', this.labels)  // for dynamic change in all places
				return a;
			}

		},
    methods: {
      ...mapActions([
	      'editCard',
        'delCard',
        'archiveCard'
    ]),
    save() {
      this.editCard({card: this.cardData, name: this.newName, pos: this.cardData.pos, desc: this.newDesc})
      // this.editCard({card: this.cardData, editedCard: this.editedCard })
    },
    viewCard() {
      this.$router.push({ name: 'CardView', params: {boardId: this.$route.params.boardId, cardId: this.cardData.id }})
    },
		showwmodal(e) {
			$(this.hashModal1).modal('show');
		}
  },
  props: ['cardData']
  }
  </script>

<style scoped>
	.card-area {
		position: relative;
		background-color: #fff;
		margin: 8px;
		padding: 5px;
    border-radius: 2px;
    box-shadow: 0px 4px 5px #888888;
    
    white-space: normal;
    overflow-wrap: break-word;
    word-wrap: break-word;

		cursor: pointer;
		user-select: none;
	}

	.card-area:hover {
    background-color: #ddd;
  }
	
	.delete-card {
		margin-right: 10em;
		position: absolute;
		cursor: pointer;
	}

	.card-label {
		width: 50px;
		height: 9px;
		margin: 1px;
		float: left;	
		border-radius: 3px;		
	}

	.card-label-container {
		overflow: auto;
		margin-bottom: 6px;
	}
	
</style>