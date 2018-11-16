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
        registrUser ({commit}, {email, password}) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(data => {
                // uid
                commit('setUser', new User(data.user.uid))
            })
        }
    },
    getters: {
        user (state) {
            return this.user
        }
    }
    
}