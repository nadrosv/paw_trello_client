<template>
	<!--<div class="col-md-8">-->
		<div class="col-md-4 list-area">
			<span>
             ID: {{listData.id}} 
            </span>
			<span class="delete-list" v-on:click="del">X</span>
			<div>
				<card v-for="card in cards" :card-data="card"></card>
			</div>
		</div>
</template>

<script>
  export default {
    data() {
      return {
          
        cards: []
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
    del() {
        this.$el.remove();
       //this.$emit('del')
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
</style>