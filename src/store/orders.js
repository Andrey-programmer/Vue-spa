/* eslint-disable */
import * as firebase from 'firebase'

class Order {
    constructor (name, phone, adId, done = false, id = null) {
        this.name = name,
        this.phone = phone,
        this.adId = adId,
        this.done = done,
        this.id = id
    }
}

export default {
    state: {
        orders: []
    },
    mutations: {
        loadOrders (state, data) {
            state.orders = data
        }
    },
    actions: {
        async createOrder ({commit}, {name, phone, adId, ownerId}) {
            commit('clearError')

            const order = new Order(name, phone, adId)

            try {
                await firebase.database().ref(`/users/${ownerId}/orders`).push(order)

            } catch (error) {
                commit('setError', error.message)
                throw error
            }
        },
        async getOrders({commit, getters}) {
            commit('clearError')
            commit('setLoading', true)

            const resultOrders = []

            try {
                // Достаём Данные по адресу
                const fbValue = await firebase.database().ref(`/users/${getters.user.id}/orders`).once('value')

                //Преобразуем данный в читаемый вид
                const orders = fbValue.val() || {}

                // достаём все ключи внутри данных и закидываем их в массив 
                Object.keys(orders).forEach(key => {
                    const order = orders[key]
                    resultOrders.push(new Order(order.name, order.phone, order.adId, order.done, key))
                });

                commit('loadOrders', resultOrders)
                commit('setLoading', false)
            } catch (error) {
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }
        },

        async markOrderDone ({commit, getters}, order) {
            commit('clearError')

            order.done = !order.done
            try {
                await firebase.database().ref(`/users/${getters.user.id}/orders`).child(order.id).update({
                    done: order.done
                })


                commit('setLoading', false)
            } catch (error) {
                commit('setError', error.message)                
                throw error
            }
        }
    },
    getters: {
        doneOrders (state) {
            return state.orders.filter((order) => {
                return order.done
            })
        },
        undoneOrders (state) {
            return state.orders.filter((order) => {
                return !order.done
            })
        },
        orders (state, getters) {
            return getters.undoneOrders.concat(getters.doneOrders)
        }
    }
}