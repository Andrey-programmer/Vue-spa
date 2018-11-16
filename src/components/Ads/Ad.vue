<template>
    <v-container grid-list-xs>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card  class="elevation-10" v-for="ad of ads" :key="ad.id">
                    <v-img
                        :src="ad.imageSrc"
                        height="400"
                        >
                    </v-img>
                    <v-card-text class="px-5">
                        <h1 class="text--primary">{{ad.title}}</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, nisi numquam. Exercitationem eligendi et enim.</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="warning" flat>Edit</v-btn>
                        <v-btn class="success">Buy</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
/* eslint-disable */
export default {
    data() {
        return {
            ads: [
                {
                    title: 'First ad', 
                    description: 'I\'m description', 
                    promo: false, 
                    imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg', 
                    id: '123'
                }
            ]
        }
    }
}
</script>

