/* eslint-disable */
export default {
    state: {
        orders: []
    },
    mutations: {
        createOrder (state, data) {
           state.orders.push(data) 
        }
    },
    actions: {
        async createOrder ({commit}, data) {
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve()
                }, 4000)
            })
        }
    },
    getters: {

    }
}