/* eslint-disable */
export default {
    state: {
        loading: false,
        error: null
    },
    mutations: {
        setLoading(state, loading) {
            state.loading = loading
        },
        setError(state, error) {
            state.error = error
        },
        clearError(state) {
           state.error = null 
        }
    },
    actions: {
        setLoading({commit}, loading) {
            commit('setLoading', loading)
        },
        setError({commit}, error) {
            commit('setError', error)
        },
        clearError({commit}) {
            commit('clearError')
        }
    },
    getters: {
        loading(state) {
            return state.loading
        },
        error(state) {
            return state.error
        }
    }
}