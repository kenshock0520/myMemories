import Vuex from 'vuex'
import { auth, GoogleProvider } from '@/plugins/firebase.js'

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null
    },
    getters: {
      activeUser: (state, getters) => {
        return state.user
      }
    },
    mutations: {
      setUser (state, payload) {
        state.user = payload
      }
    },
    actions: {
      autoSignIn ({ commit }, payload) {
        commit('setUser', payload)
      },

      signInWithGoogle ({ commit }) {
        return new Promise((resolve, reject) => {
          auth.signInWithRedirect(GoogleProvider)
          resolve()
        })
      },

      signOut ({ commit }) {
        auth.signOut().then(() => {
          commit('setUser', null)
          this.$router.go({ name: 'login' })
        }).catch(err => console.log(err))
      },
      setUser ({ commit }, payload) {
        commit('setUser', payload)
      }
    }
  })
}

export default createStore
