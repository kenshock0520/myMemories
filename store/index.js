import Vuex from 'vuex'
import { auth, GoogleProvider } from '@/plugins/firebase.js'
import AuthModule from './AuthModule'
import ChatModule from './ChatModule'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      auth: AuthModule,
      chat: ChatModule
    },
    state: {
      user: null,
      userEmail: '',
      userDisplayName: '',
      userPhotoURL: ''
    },
    getters: {
      activeUser: (state, getters) => {
        return state.user
      }
    },
    mutations: {
      setUser (state, payload) {
        state.user = payload
        if (payload != null) {
          state.userDisplayName = state.user.displayName
          state.userEmail = state.user.email
          state.userPhotoURL = state.user.photoURL
        }
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
