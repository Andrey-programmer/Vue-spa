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
        async createOrder ({commit}, {name, phone, adId, done, ownerId}) {
            commit('clearError')

            const order = new Order(name, phone, adId)

            try {
                await firebase.database().ref(`/users/${ownerId}/orders`).push(order)

            } catch (error) {
                commit('setError', error.message)
                throw error
            }
        }
    },
    getters: {

    }
}