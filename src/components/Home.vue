<template>
    <div v-if="!loading">  
        <v-container fluid>
            <v-layout row wrap>
                <v-flex xs12>
                     <v-carousel>
                        <v-carousel-item
                          v-for="ad of promoAds"
                          :key='ad.id'
                          :src='ad.imageSrc'
                        >
                         <div class="carousel-link">
                            <v-btn class="error" :to="'/ad/' + ad.id">{{ad.title}}</v-btn>
                        </div>
                        </v-carousel-item>                       
                    </v-carousel> 
                </v-flex>
            </v-layout>
        </v-container>
        <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex 
                    xs12
                    sm6
                    md3
                    v-for="(ad) of ads" :key="ad.id"
                    >
                     <v-card>
                         <div class="headline center">{{ad.title}}</div>
                         <!-- <hr /> -->
                        <v-img
                        class="white--text"
                        height="200px"
                        :src='ad.imageSrc'
                        >
                        <v-container fill-height fluid>
                            <v-layout fill-height>
                            <v-flex xs12 align-end flexbox>
                                
                            </v-flex>
                            </v-layout>
                        </v-container>
                        </v-img>
                        <v-card-title>
                            <div class="description-wrapper">
                                <!-- <span class="grey--text">{{index + 1}}</span><br> -->
                                <hr>
                                <p class="description">{{ad.description}}</p>
                            </div>
                        </v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn flat :to="'/ad/' + ad.id" right>Open</v-btn>
                            <app-buy-modal :ad="ad"></app-buy-modal>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
    <div v-else>
        <v-container>
            <v-layout row>
                <v-flex xs12 class="text-xs-center pt-5">
                    <v-progress-circular
                    :size="100"
                    :width="10"
                    color="purple"
                    indeterminate
                    ></v-progress-circular>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
/* eslint-disable */
export default {
   computed: {
       promoAds() {
           return this.$store.getters.promoAds
       },
       ads () {
           return this.$store.getters.ads
       },
       loading() {
           return this.$store.getters.loading
       }
   }
}
</script>

<style scoped>
    .carousel-link {
        position: absolute;        
        bottom: 50px;
        left: 50%;
        background-color: rgba(0, 0, 0, .5);
        transform: translate(-50%, 0);
        padding: 5px 15px;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;        
    }
    .center {
        text-align: center;
        padding-top: 15px;
    }
    .description-wrapper {
        width: 100%
    }
    .description {
        margin-top: 10px;
    }
</style>
