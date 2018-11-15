<template>
    <div>
  <!--     -->
        <v-container fluid>
            <v-layout row wrap>
                <v-flex xs12>
                     <v-carousel>
                        <v-carousel-item
                          v-for="ad of ads"
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
                    v-for="(ad, index) of ads" :key="ad.id" 
                    >
                     <v-card>
                        <v-img
                        class="white--text"
                        height="200px"
                        :src='ad.imageSrc'
                        >
                        <v-container fill-height fluid>
                            <v-layout fill-height>
                            <v-flex xs12 align-end flexbox>
                                <span class="headline">{{ad.title}}</span>
                            </v-flex>
                            </v-layout>
                        </v-container>
                        </v-img>
                        <v-card-title>
                        <div>
                            <span class="grey--text">{{index + 1}}</span><br>
                            <span>{{ad.description}}</span>
                        </div>
                        </v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn flat :to="'/ad/' + ad.id">Open</v-btn>
                            <v-btn raised class="primary">Buy</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    data () {
        return {
            ads: [
                {
                    title: 'First ad', 
                    description: 'I\'m description', 
                    promo: false, 
                    imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg', 
                    id: '123'
                },
                {
                    title: 'Second ad', 
                    description: 'I\'m description', 
                    promo: true, 
                    imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg', 
                    id: '1234'
                },
                {
                    title: 'Third ad',
                    description: 'I\'m description', 
                    promo: true, 
                    imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg', 
                    id: '12345'
                }, 
                {
                    title: 'Fourth ad', 
                    description: 'I\'m description', 
                    promo: false, 
                    imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg', 
                    id: '1237'
                } 

            ]
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
</style>
