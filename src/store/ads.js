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
        ]
    },
    mutations: {
        createAd(state, payload) {
            state.ads.push(payload)
        },
        loadAds(state, data) {
            state.ads = data
        }
    },
    actions: {
        //Можем передавать все геттеры вместе с коммитом в экшены
        async createAd ({commit, getters}, data) {
            // id в firebase идёт как uid
            // console.log(getters.user.uid)
            commit('clearError')
            commit('setLoading', true)
            // console.log(getters.user) 
            const image = data.image

            try {
                const newAd = new Ad(
                    data.title,
                    data.description, 
                    getters.user.id,
                    '',
                    data.promo)
                //В параметре ref('Название пункта базы данных')
                const ad = await firebase.database().ref('ads').push(newAd)

                //Достаём расширение картинки
                const imageExt = image.name.slice(image.name.lastIndexOf('.'))
                console.log(imageExt)

                // Обращаемся к хранилищу и создаём адрес из ключа и расширения картинки
                const fileData = await firebase.storage().ref(`ads/${ad.key}${imageExt}`).put(image)

                //Второй запрос тоже асинхронный поэтому код похожий но придётся писать               

                //Получаем Url картинки из firebase
                const imageSrc = await firebase.storage().ref(`ads/${ad.key}${imageExt}`).getDownloadURL()
                // console.log(fileData)
                // console.log(imageSrc)


                // Добавляем полученный URL в базу данных
                await firebase.database().ref('ads').child(ad.key).update({
                    imageSrc
                })

                commit('setLoading', false)

                // добавляем id в созданного объявления из firebase
                commit('createAd', {
                    ...newAd,
                    id: ad.key,
                    imageSrc
                } )
                // console.log('==========', newAd)
            } catch (error) {
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }
        },
        async getDatabaseAds({commit}) {
            commit('clearError')
            commit('setLoading', true)

            const resultAds = []

            try {
                const fbVal = await firebase.database().ref('ads').once('value')
                // console.log(fbVal)

                // для получения базы данных в читаемом виде вызываем у firebase метод val()
                const ads = fbVal.val()
                // console.log(ads)

                Object.keys(ads).forEach(key => {
                    const ad = ads[key]
                    resultAds.push(
                        new Ad(
                            ad.title,
                            ad.description,
                            ad.ownerId,
                            ad.imageSrc,
                            ad.promo,
                            key
                        )
                    )
                })

                commit('loadAds', resultAds)
                commit('setLoading', false)
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