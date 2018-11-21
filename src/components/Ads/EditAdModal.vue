<template>
    <v-dialog
    width="400px"
    v-model="modal"
    >
        <v-btn class="warning" flat slot="activator" right>Edit</v-btn>
        <v-card>
            <v-container>
                <v-layout row>
                    <v-flex xs12>
                        <v-card-title>
                            <h1 class="text--primary">Edit ad</h1>
                        </v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row>
                    <v-flex xs12>
                        <v-card-text>
                            <v-text-field 
                                name="title" 
                                label="Title" 
                                type="text"
                                v-model="editTitle">
                            </v-text-field>                         
                            <v-textarea
                                name="description"
                                label="Description"                       
                                hint="Заполните это поле"
                                v-model="editDescription"
                            ></v-textarea>   
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn flat @click="onCancel">Cancel</v-btn>
                            <v-btn class="success" @click="onSave">Save</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
/* eslint-disable */
    export default  {
        props: ['ad'],
        data() {
            return {
                modal: false,
                editDescription: this.ad.description,
                editTitle: this.ad.title
            }
        },
        methods: {
            onCancel () {
                this.modal = false
                this.editDescription = this.ad.description
                this.editTitle = this.ad.title
            },
            onSave () {
                if (this.editDescription !== '' && this.editTitle !== '')
                {
                    this.modal = false
                    this.$store.dispatch('updateAd',
                    {
                        title: this.editTitle,
                        description: this.editDescription,
                        id: this.ad.id
                    })                   
                }                
            }
        }
    }
    
</script>