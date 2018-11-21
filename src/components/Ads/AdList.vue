<template>
    <v-container grid-list-xs>
        <v-layout row wrap class='flex-center' v-if="!loading && myAds.length !== 0">
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">My ads</h1> 
                <v-card
                    class="elevation-10 mb-5" v-for="ad of myAds" :key="ad.id">
                    <v-layout row>
                        <v-flex xs4>                     
                            <!-- <img :src="ad.imageSrc" alt=""> -->

                            <!-- <div class="card-image" :style="   {backgroundImage:ad.imageSrc}" height="150"></div> -->
                            <v-img
                                :src="ad.imageSrc"
                                height="200"
                                width="200">
                            </v-img>
                        </v-flex>                  
                        <v-flex xs8>
                            <v-card-text>
                                <h2 class="text--primary">{{ad.title}}</h2>
                                <p>{{ad.description}}</p>
                            </v-card-text>
                            <v-card-actions class="actions">
                                <v-spacer></v-spacer>
                                <v-btn class="info" :to="'/ad/' +  ad.id">Open</v-btn>
                            </v-card-actions>
                        </v-flex> 
                    </v-layout>
                </v-card>
            </v-flex>    
        </v-layout>
        <v-layout v-else-if="!loading && myAds.length === 0">
            <v-flex xs12 class="text-xs-center">
                <h1 class="text--primary">You have not ads</h1>
            </v-flex>
        </v-layout>
        <v-layout v-else>
            <v-progress-circular
                :size="100"
                :width="10"
                color="purple"
                indeterminate
            ></v-progress-circular>
        </v-layout>
    </v-container>
</template>

<script>
/* eslint-disable */
export default {
    computed: {
        myAds () {
            return this.$store.getters.myAds
        },
        loading () {
            return this.$store.getters.loading
        }
    }
}
</script>

<style scoped>  
    .actions{
        margin: auto;
    }
</style>

