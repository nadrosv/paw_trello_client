<template>
	<!--<div class="col-md-8">-->
		<div class="col-md-4 list-area">
			
      <span v-if="listEditable">
            <input v-model="listName">
            <button class="btn btn-default" v-on:click="saveList">
              <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
            </button>
            <!--<p>Message is: {{ message }}</p>-->
        </span>
			<span v-else>
        {{listData.list_name}} 
        <div class="btn-group" role="group" aria-label="listButtons">
            <button class="btn btn-default" v-on:click="addCard">
              <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
            </button>
            <button class="btn btn-default" v-on:click="editList">
              <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
            </button>
            <button class="btn btn-default" v-on:click="delList">
              <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
            </button>  
        </div>    
        <span>
			<div>
				<card v-for="card in cards" :card-data="card"></card>
			</div>
		</div>
</template>

<script>
  export default {
    data() {
      return {
        cards: [],
        listEditable: false,
        listName: ''

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
      
    },
    delList() {
        this.$el.remove();
       //this.$emit('del')
    },
    editList() {
        console.log('edit')
        this.listEditable = true
    },
    saveList() {
        console.log('saving')
        this.listData.list_name = this.listName
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
</style>