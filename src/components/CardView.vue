<template>
	<div class="card-view-area">
            {{cardviewData.card_name}}
            {{cardviewData.desc}}
            Komentarze
            <p v-for="comm in comments" :key="comm.id">{{comm.text}}</p>

    </div>   
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

  export default {
    data() {
      return {

        // newName: this.cardviewData.card_name,
        // newDesc: this.cardviewData.desc,
      }
    },
    computed: {
        // cardviewData() {
        //     return this.$store.state.cards[this.$route.params.listId][0]
        // }
            comments() {
                return this.$store.state.comments[this.cardviewData.id]
            }
    },
    methods: {
      ...mapActions([

    ]),
    back() {
        this.$router.go(-1)
    }
  },
  props: ['cardviewData']
  }
  </script>

<style scoped>
	.card-view-area {
		position: relative;
		background-color: #fff;
		margin: 8px;
		padding: 5px;
    border-radius: 2px;
    box-shadow: 0px 4px 5px #888888;
    
    white-space: normal;
    overflow-wrap: break-word;
    word-wrap: break-word;
	}
	
</style>