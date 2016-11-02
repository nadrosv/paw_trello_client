<template>
	<div class="card-view-area">
            {{cardviewData.card_name}}
            {{cardviewData.desc}}
            Komentarze
            <p v-for="comm in comments" :key="comm.id">{{comm.text}}</p>
            Dodaj Komentarz
            <input v-model="commText">
            <button class="btn btn-default" v-on:click="saveComment()">Zapisz</button>



    </div>   
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

  export default {
    data() {
      return {
          commText: ''

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
          'addComment'
    ]),
    back() {
        this.$router.go(-1)
    },
    saveComment() {
        let comm = {
            cardId: this.cardviewData.id,
            text: this.commText
        }
        this.addComment({comment: comm})
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