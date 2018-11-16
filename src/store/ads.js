/* eslint-disable */
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
        createAd ({commit}, data) {
            data.id = 'eyeyeye'
            commit('createAd', data)
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