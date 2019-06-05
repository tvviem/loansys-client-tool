// import firebase from 'firebase/app'
// import 'firebase/auth'
import router from '@/router'
import http from '@/api/http-axios';

export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setRoles (state, payload) {
      state.roles = payload
    }
  },
  actions: {
    userSignIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      let data = {
        username: payload.username,
        password: payload.password
      }
      // LOGIN VOI THONG TIN USER
      http.post('/user/signin', data)
        .then(response => {
          commit('setLoading', false)
          if(response.status==="OK") { // thong tin dang nhap hop le
            const userAuthenticated = { 
              username: response.data.username,
              token: response.data.token // thẻ bài được cấp sau khi chứng thực
            };
            commit('setUser', userAuthenticated)
            console.log(this.user)
          } else {
            commit('setError', 'Thông tin không hợp lệ')
          }
        })
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    userSignOut ({commit}) {
      //firebase.auth().signOut()
      // remove token at client
      commit('setUser', null)
      router.push('/')
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {
        id: payload.uid,
        fbKeys: {}
      })
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}