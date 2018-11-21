<template>
    <v-container grid-list-xs>
        <v-layout row wrap class="flex-center">
            <v-flex xs12 sm6>
                <h1 class="text--secondary mb-3">Create new ad</h1> 
                <v-form ref="form" v-model="valid" lazy-validation class="mb-3">
                  <v-text-field                         
                        name="title" 
                        label="Ad title" 
                        type="text"
                        :rules="[v => !!v || 'Title is required']"
                        v-model="title">
                  </v-text-field>              
                    <v-textarea
                        name="description"
                        label="Ad description"                       
                        hint="Заполните это поле"
                        v-model="description"
                        :rules="[v => !!v || 'Description is required']"
                    ></v-textarea>       
                </v-form>
                <v-layout row class="mb-3">
                    <v-flex xs-12>
                        <v-btn
                            class="warning mt-3"  
                            @click="triggerUpload"                         
                        >
                            Upload
                            <v-icon right dark>cloud_upload</v-icon>        
                        </v-btn>
                        <input ref="fileInput" 
                            type="file"
                            style="display: none;" 
                            accept="image/*"
                            @change="onFileChange"
                        >                   
                    </v-flex>     
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                             <v-img
                             :src='imageSrc'
                             height="300"
                             width="300"
                             v-if="imageSrc"
                             >
                            </v-img> 
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-switch
                            label="Add to promo"
                            v-model="promo"
                            color="primary"
                        ></v-switch>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                      <v-spacer></v-spacer>
                      <v-btn 
                      class="success" 
                      @click="createAd"
                      :loading="loading" 
                      :disabled="!valid || !image || loading "
                      >Create ad</v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>  
        </v-layout>
    </v-container>
</template>

<script>
/* eslint-disable */
export default {
    data () {
        return {
            title: '',
            description: '',
            promo: false,
            valid: false,
            image: null,
            imageSrc: ''
        }
    },
    methods: {
        createAd() {
            if (this.$refs.form.validate() && this.image) {
                const ad = {
                    title: this.title,
                    description: this.description,
                    promo: this.promo,
                    image: this.image
                }
                this.$store.dispatch('createAd', ad).
                then(() => {
                    this.$router.push('/list')
                })
                .catch(() => {
                    
                })
                
            }
        },
        triggerUpload () {
            this.$refs.fileInput.click()
        },
        // Работа с загрузкой файла
        onFileChange (event) {
            const file = event.target.files[0]
            const reader = new FileReader()
            reader.onload = event => {
                this.imageSrc = reader.result
            }
            reader.readAsDataURL(file)
            this.image = file
            // console.log(this.image)
        }
    },
    computed: {
        loading() {
            return this.$store.getters.loading
        }
    }
}
</script>


