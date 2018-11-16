<template>
    <v-container grid-list-xs>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card  class="elevation-10">
                    <v-img
                        :src="myAd.imageSrc"
                        height="400" 
                        >
                    </v-img>
                    <v-card-text class="px-5">
                        <h1 class="text--primary">{{myAd.title}}</h1>
                        <p>{{myAd.description}}</p>
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
    props: ['id'],
    computed: {
        myAd () {
            const id = this.id
            return this.$store.getters.adById(id)
        }
    }
}
</script>

