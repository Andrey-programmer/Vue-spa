/* eslint-disable */
import * as firebase from 'firebase'

class User {
    constructor(id) {
        this.id = id
    }
}

export default {
    state: {
        user: null
    }, 
    mutations: {
        setUser (state, payload) {
            state.user = payload
        }
    },
    actions: {
        async registrUser ({commit}, {email, password}) {
            commit('clearError')
            commit('setLoading', true)

            try{
                const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
                commit('setUser', new User(user.uid))
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false),
                commit('setError', error.message)
                throw error
            }
            // const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
            // commit('setUser', new User(user.uid))
            // commit('setLoading', false)
           /*  .then(data => {
                // uid
                commit('setUser', new User(data.user.uid))
                commit('setLoading', false)
            })
            .catch(error => {
                commit('setLoading', false),
                commit('setError', error.message)                
            }) */
        }
    },
    getters: {
        user (state) {
            return this.user
        }
    }
    
}