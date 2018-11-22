<template>
    <v-container grid-list-xs>
        <v-layout row wrap>
            <v-flex xs12 class="text-xs-center pt-5" v-if="loading">
                <v-progress-circular
                    :size="100"
                    :width="10"
                    color="purple"
                    indeterminate
                ></v-progress-circular>
            </v-flex>
            <v-flex
             xs12
             sm6
             offset-sm3
             v-else-if="!loading && orders.length !== 0">    
             <h1 class="text--secondery mb-3 pl-3">Orders</h1>

                <v-list class="two-line subheader">
                    <v-list-tile 
                    v-for="order of orders" 
                    :key="order.id"
                    >
                        <v-list-tile-action>
                            <v-checkbox 
                            @change="markDone(order)"
                            :input-value="order.done"
                            color="success">
                            </v-checkbox>
                        </v-list-tile-action>

                        <v-list-tile-content>
                        <v-list-tile-title>{{order.name}}</v-list-tile-title>
                        <v-list-tile-sub-title>{{order.phone}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-btn class="primary" :to="'/ad/' + order.adId">Open</v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-flex>
            <v-flex xs12 class="text-xs-center pt-5" v-else>
                <h1 class="text--secondary">You have not orders</h1>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
/* eslint-disable */
export default {
  /*   data () {
        return {
            orders: [
                {
                    id: 'n3j2',
                    name: 'Andrey-programmer',
                    phone: '+7-977-4638113',
                    adId: '123',
                    down: false
                }
            ]
        } 
    }, */
    computed: {    
        orders () {
            return this.$store.getters.orders
        },
        loading () {
            return this.$store.getters.loading
        }
    },
    methods: {
        markDone (order) {
            this.$store.dispatch('markOrderDone', order)
            .then(() => {
                // order.done = !order.done
            })
            .catch(() => {
                
            })
        }
    },
    created () {
         this.$store.dispatch('getOrders') 
    }
}
</script>


<style lang="scss" scoped>
    $color: #FFD;
    .two-line {
        background-color: $color;
    }
</style>

