<template>
    <v-container grid-list-xs>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card  class="elevation-10" v-if="!loading">
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
                        <app-edit-ad-modal :ad="myAd" v-if="logginedUser"></app-edit-ad-modal>
                        <app-buy-modal :ad="myAd"></app-buy-modal>
                    </v-card-actions>
                </v-card>
                <div v-else class="text-xs-center">
                    <v-progress-circular
                        :size="100"
                        :width="10"
                        color="purple"
                        indeterminate
                    ></v-progress-circular>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
/* eslint-disable */
import EditAdModal from './EditAdModal'

export default {
    props: ['id'],
    computed: {
        myAd () {
            const id = this.id
            return this.$store.getters.adById(id)
        },
        loading () {
            return this.$store.getters.loading
        },
        logginedUser () {           
            return this.myAd.ownerId === this.$store.getters.user.id
        }
    },
    components: {
        appEditAdModal: EditAdModal
    }
}
</script>

