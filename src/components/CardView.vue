<template>
	<div class="card-view-area">
        {{cardviewData.card_name}}
        {{cardviewData.desc}}
        Komentarze
        <p v-for="comm in comments" :key="comm.id">{{comm.text}}</p>
        Dodaj Komentarz
        <input v-model="commText">
        <button class="btn btn-default" v-on:click="saveComment()">Zapisz</button>
        <button class="btn btn-primary" type="button" data-toggle="collapse" :data-target="hashModal" aria-expanded="false">
            Add labels
        </button>
        <div class="collapse" :id="modalParam">
            <div class="well">
                <button v-for="label in globalLabels" class="btn btn-secondary"
                        v-on:click="addLabel(label)" :style="{ 'background-color': label.color }">
                        {{label.name}}
                </button>
            </div>
        </div>
    </div>   
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

  export default {
    data() {
      return {
          commText: '',
          hashModal: '#modal-cardview' + this.cardviewData.id,
          modalParam: 'modal-cardview' + this.cardviewData.id,

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
            },
            globalLabels() {
                return this.$store.state.globalLabels

            }
    },
    methods: {
      ...mapActions([
          'addComment',
          'editCard'
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
    },
    addLabel(label) {
        this.editCard({card: this.cardviewData, name: this.cardviewData.card_name, desc: this.cardviewData.desc, label: label.id})
        console.log(label.color)
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
        height: 500px;
        white-space: normal;
        overflow-wrap: break-word;
        word-wrap: break-word;
	}
    .card-global-label {
		width: 50px;
		height: 10px;
		margin: 5px;
	}
	
</style>