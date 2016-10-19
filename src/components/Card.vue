<template>
	<!--<div class="col-md-8">-->
	<div class="card-area">
		<!--ID: {{cardData.id}}-->
		<span>
      {{cardData.card_name}}
    </span>
      <div class="btn-group" role="group" aria-label="listButtons">
    <button class="btn btn-default" data-toggle="modal" data-target="#cardModal">
      <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
    </button>
    <button class="btn btn-default" v-on:click="delCard">
      <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
    </button>  
        </div>   

         <!--Modal-->
			<div class="modal fade" id="cardModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
								<input v-model="cardData.card_name">
                Opis
								<input v-model="cardData.desc">

							</p>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
							<button type="button" class="btn btn-primary" v-on:click="editCard">Save changes</button>
						</div>
					</div>
				</div>
	</div>
</template>

<script>
  export default {
    data() {
      return {
        "editedCard": {}
      }
    },
    methods: {
    editCard() {
      this.$http.put('http://localhost:3000/cards/' + this.cardData.id, this.cardData ).then((response) => {
        console.log(response.body)
        }, (response) => {
         console.log(response)
        });
    },
    delCard() {
      this.$el.remove();
      this.$http.delete('http://localhost:3000/cards/' + this.cardData.id).then((response) => {
        console.log(response.body)
        }, (response) => {
         console.log(response)
        });
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
	}
	
	.delete-card {
		margin-right: 10em;
		position: absolute;
		cursor: pointer;
	}
</style>