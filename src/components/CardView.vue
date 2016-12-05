<template>
	<div class="card-view-area">
	<div class="container-fluid">
	<div class="row">
		<p class="card-title">{{cardviewData.card_name}}</p>
		
		<!--LEFT COLUMN-->
		<div class="col-md-9 col-xs-8">
			<p v-if="cardviewData.desc" class="card-description-label">
				{{ $t("cardView.description") }}:
			</p>
			<p class="card-description">
				{{cardviewData.desc}}
			</p>
			
			<span v-if="labelsCount">
				{{ $t("cardView.labels") }}:
			</span>
			<div class="card-label-container">
				<div v-for="label in labels" class="card-label" :style="{ 'background-color': label.color }" v-on:click="delLabel({ label })"></div>
			</div>
			
			<div v-if="!isNaN(dueDateLabel)">
				{{ $t("cardView.dueDate") }}:<br>
				<span class="label label-default">
					{{dueDateLabel}}
				</span>
			</div>

			<p class="add-comment-label">
				{{ $t("cardView.addComment") }}
			</p>
			<input v-model="commText">
			<button class="btn btn-default" v-on:click="saveComment()">
				{{ $t("cardView.saveBtn") }}
			</button>
													
			<div class="collapse" :id="modalParam">
				<div class="well">
					<button v-for="label in globalLabels" class="btn btn-secondary btn-block"
							v-on:click="saveLabel({newLabel: label})" :style="{ 'background-color': label.color }" >                              
					</button>
				</div>
			</div>

			<div class="collapse" :id="modalParam.concat('date')">
				<div class="well">    
					<div class='input-group date' :id="modalParam.concat('datea')"  >
						<input type='text' class="form-control" v-model="dueDateValue" />
						<span class="input-group-addon">
							<span class="glyphicon glyphicon-calendar"></span>
						</span>
						
					</div>
					<button type="button" class="btn btn-default btn-block" v-on:click="saveDueDate">
							{{ $t("cardView.saveBtn") }}
					</button> 
				</div>
			</div>

			<div class="collapse" :id="modalFiles">
				<div class="well">
					<form action="http://localhost:3000/upload" v-on:submit.prevent="onSubmit" enctype="multipart/form-data" method="post">
						<input name="cardId" type="hidden" :value="cardviewData.id" />
						<br><br>
						<input  name="upload" type="file" />
						<br><br>
						<input type="submit" value="Upload" />
					</form>
				</div>
			</div>
			
			<p class="card-comments-label">{{ $t("cardView.activity") }}</p>
			<p v-for="comm in comments" :key="comm.id">{{comm.text}}</p>  
			

		</div>
		
		<!--RIGHT COLUMN-->
		<div class="col-md-3 col-xs-4">
			<p class="text-left lead">
				{{ $t("cardView.add") }}
			</p>               
			<button type="button" class="btn btn-block btn-default" data-toggle="collapse" :data-target="hashModal" aria-expanded="false">
				{{ $t("cardView.labelsBtn") }}
			</button>
			<button type="button" class="btn btn-block btn-default" data-toggle="collapse" :data-target="hashModal.concat('date')" aria-expanded="false" v-on:click="forDate">
				{{ $t("cardView.dueDateBtn") }}
			</button>                    
			<button type="button" class="btn btn-default btn-block" data-toggle="collapse" :data-target="filesModal" aria-expanded="false">
				{{ $t("cardView.attachmentBtn") }}
			</button>
			<p class="lead text-left" style="margin-top:15px;">
				{{ $t("cardView.actions") }}
			</p> 
			<button type="button" class="btn btn-default btn-block">
				{{ $t("cardView.archiveBtn") }}
			</button>
			<button type="button" class="btn btn-default btn-block" v-bind:class="{ 'btn-success': subbed }" @click="subCard({card: cardviewData})">
				{{ $t("cardView.subbedBtn") }}
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
          filesModal: '#modal-cardview-files' + this.cardviewData.id,
          modalFiles: 'modal-cardview-files' + this.cardviewData.id,
          dateModal: '#modal-cardview-date' + this.cardviewData.id,
          modalDate: 'modal-cardview-date' + this.cardviewData.id,
          dueDateValue: ''
     }
    },
    computed: {

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
        },
        subbed() {
            return this.$store.state.user.subs.indexOf(Number(this.cardviewData.id)) != -1
        },
        dueDateLabel() {
            return new Date(this.cardviewData.dueDate);
        }
    },
    methods: {
      ...mapActions([
          'addComment',
          'editCard',
          'addLabel',
          'addFile',
          'delLabel',
          'subCard'
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
    },
    onSubmit: function(e) {
        let processedPath = "http://localhost:8080/Faker/uploads/" + e.target[1].value.replace(/.*[\/\\]/, '')
        let newFile = {
            cardId: e.target[0].value,
            path: processedPath 
        }

        this.addFile({file : newFile})
        e.target.submit()
    },
    forDate() {   
        $(this.hashModal.concat('datea')).datetimepicker({
            locale: 'pl'
        });
        
    },
    saveDueDate() {
        var myDate = new Date($(this.hashModal.concat('datea')).data("DateTimePicker").date()._d);
        var myDateMillis = myDate.getTime();
        var currentMillisTime = (new Date).getTime();
        this.editCard({card: this.cardviewData, card_name: this.cardviewData.card_name, pos: this.cardviewData.pos, desc: this.cardviewData.desc, dueDate: myDateMillis, lastChanged: currentMillisTime })
       
    }
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