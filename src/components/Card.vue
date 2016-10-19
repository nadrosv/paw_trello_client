<template>
	<!--<div class="col-md-8">-->
	<div class="card-area">
		<!--ID: {{cardData.id}}-->
		<span>
      cardData.card_name
    </span>
      <div class="btn-group" role="group" aria-label="listButtons">
    <button class="btn btn-default" v-on:click="editList">
      <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
    </button>
    <button class="btn btn-default" v-on:click="delList">
      <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
    </button>  
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
        del() {
        this.$el.remove();
       //this.$emit('del')
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