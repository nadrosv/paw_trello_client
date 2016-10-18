<template>
	<!--<div class="col-md-8">-->
	<div class="card-area">
		<!--ID: {{cardData.id}}-->
		<span>
            Desc: {{cardData.desc}}
            </span>
		<span class="delete-card" v-on:click="del">X</span>
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
	}
	
	.delete-card {
		margin-right: 10em;
		position: absolute;
		cursor: pointer;
	}
</style>