<template>

	<div class="activity-container">
		<p>{{activityData.date}} {{activityData.log}}</p>
	</div>

</template>


<script>
	export default {
    data() {
      return {
		date: this.activityData.date,
		log: this.activityData.log
      }
    },
	methods: {

    },
	props: ['activityData']
	}
</script>

<style scoped>
	.activity-container{
		background: #fff;
	}
	.activity-container p{
		white-space: normal;
    	overflow-wrap: break-word;
	}

</style>