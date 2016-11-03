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
	.activity-container {
		
	}
	.activity-container p {
		white-space: normal;
    	overflow-wrap: break-word;
		margin: 1px;

	}
</style>