/* eslint-disable */
import * as firebase from 'firebase'

class Ad {
    constructor(title, description, ownerId, imageSrc='', promo = false, id = null){
        this.title = title,
        this.description = description,
        this.ownerId = ownerId,
        this.imageSrc = imageSrc,
        this.promo = promo,
        this.id = id
    }
}

export default {
    state: {
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
    },
    mutations: {
        createAd(state, payload) {
            state.ads.push(payload)
        }
    },
    actions: {
        //Можем передавать все геттеры вместе с коммитом в экшены
        async createAd ({commit, getters}, data) {
            // id в firebase идёт как uid
            // console.log(getters.user.uid)
            commit('clearError')
            commit('setLoading', true)
            console.log(getters.user) 

            try {
                const newAd = new Ad(
                    data.title,
                    data.description, 
                    getters.user.id,
                    data.imageSrc,
                    data.promo)
                //В параметре ref('Название пункта базы данных')
                const ad = await firebase.database().ref('ads').push(newAd)

                commit('setLoading', false)

                // добавляем id в созданного объявления из firebase
                commit('createAd', {
                    ...newAd,
                    id: ad.key
                } )
                console.log('==========', newAd)
            } catch (error) {
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }
        }
    },
    getters: {
        ads (state) {
            return state.ads
        },
        promoAds (state) {
            return state.ads.filter(data => {
            //    return data.promo === true //или
            return data.promo
            })
        },
        myAds(state) {
            return state.ads
        },
        adById (state) {
            return id => {
                return state.ads.find(data => {
                    return data.id === id
                })
            }
        }
    }
}