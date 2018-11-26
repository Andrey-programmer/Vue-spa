/* eslint-disable */
import  firebase from 'firebase/app'



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
        },
        async loginUser({commit}, {email, password}) {
            commit('clearError')
            commit('setLoading', true)

            try{
                const Data = await firebase.auth().signInWithEmailAndPassword(email, password)

                localStorage.setItem('spa-user', Data.user)
                
                commit('setUser', new User(Data.user.uid))
                commit('setLoading', false)
                console.log(Data.user.uid)
            } catch (error) {
                commit('setLoading', false),
                commit('setError', error.message)
                throw error
            }
        },
        autoLoginUser({commit}, data) {
            commit('setUser', new User(data.uid))
        },
        logoutUser({commit}) {
            firebase.auth().signOut()
            commit('setUser', null)        
        }
    },
    getters: {
        user (state) {
            return state.user
        },
        isUserLoggedIn (state) {
            return state.user !== null
        }
    }
    
}