<template>
	<div class="card-view-area">
        <div class="container-fluid">
            <div class="row">
                <p class="card-title">{{cardviewData.card_name}}</p>
                
                <!--LEFT COLUMN-->
                <div class="col-md-9 col-xs-8">
                    <p v-if="cardviewData.desc" class="card-description-label">
                        Description:
                    </p>
                    <p class="card-description">
                        {{cardviewData.desc}}
                    </p>
                    
                    <span v-if="labelsCount">
                        Labels:
                    </span>
                    <div class="card-label-container">
                        <div v-for="label in labels" class="card-label" :style="{ 'background-color': label.color }"></div>
                    </div>

                    <p class="add-comment-label">
                        Add comment
                    </p>
                    <input v-model="commText">
                    <button class="btn btn-default" v-on:click="saveComment()">
                        Save
                    </button>
                                                          
                    <div class="collapse" :id="modalParam">
                        <div class="well">
                            <button v-for="label in globalLabels" class="btn btn-secondary btn-block"
                                    v-on:click="saveLabel({newLabel: label})" :style="{ 'background-color': label.color }" >                              
                            </button>
                        </div>
                    </div>
                    
                    <p class="card-comments-label">Activity</p>
                    <p v-for="comm in comments" :key="comm.id">{{comm.text}}</p>  

                </div>
                
                <!--RIGHT COLUMN-->
                <div class="col-md-3 col-xs-4">
                    <p class="text-left lead">
                        Add
                    </p> 
                    <button type="button" class="btn btn-default btn-block">
                        Members
                    </button> 
                    <button type="button" class="btn btn-block btn-default" data-toggle="collapse" :data-target="hashModal" aria-expanded="false">
                        Labels
                    </button>
                    <button type="button" class="btn btn-default btn-block">
                        Attachment
                    </button>
                    <p class="lead text-left" style="margin-top:15px;">
                        Actions
                    </p> 
                    <button type="button" class="btn btn-default btn-block">
                        Move
                    </button> 
                    <button type="button" class="btn btn-default btn-block">
                        Archive
                    </button>
                </div>
                
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
        labels() {
            return this.$store.state.labels[this.cardviewData.id]
        },
        labelsCount () {
            if (this.$store.state.labels[this.cardviewData.id]) {
                return this.$store.state.labels[this.cardviewData.id].length
            } else {
                return
            }
        },
        globalLabels() {
            return this.$store.state.globalLabels
        }
    },
    methods: {
      ...mapActions([
          'addComment',
          'editCard',
          'addLabel'
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
    saveLabel({newLabel}) {
        console.log(newLabel.color)
        let savedLabel = {
            cardId: this.cardviewData.id,
            name: "",
            color: newLabel.color
        }
        this.addLabel({label: savedLabel})
    }
    // ,
    // addLabel(label) {
    //     this.editCard({card: this.cardviewData, name: this.cardviewData.card_name, desc: this.cardviewData.desc, label: label.id})
    //     console.log(label.color)
    // }
  },
  props: ['cardviewData']
  }
  </script>

<style scoped>
	.card-view-area {
		position: relative;
		background-color: #edeff0;
		margin: 8px;
		padding: 5px;
        border-radius: 4px;
        box-shadow: 0px 0px 5px #888888;
        white-space: normal;
        overflow-wrap: break-word;
        word-wrap: break-word;
	}
    
    .card-global-label {
		width: 50px;
		height: 10px;
		margin: 5px;
	}

    .card-title {
        font-size: 22px;
        font-weight: 600;
    }

    .card-description-label {
        font-size: 14px;
        color: #292929;
        margin-bottom: 1px;
    }

    .card-description {
        font-size: 16px;
    }

    .add-comment-label {
        font-size: 18px;
        font-weight: 600;
        margin-top: 22px;
    }

    .card-comments-label {
        font-size: 16px;
        font-weight: 600;
        margin-top: 22px;
    }

    .card-label {
		width: 30px;
		height: 30px;
		margin: 1px;
        float: left;
		border-radius: 3px;
	}

    .card-label-container {
		overflow: auto;
		margin-bottom: 6px;
	}

    .well .btn {
        height: 25px;
    }

    .well .btn:hover {
        border: 2px dotted #ffffff;
    }
	
</style>