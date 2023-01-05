import axios from 'axios'

export default {
  namespaced: true,
  state: {
    token: null,
    user: null,
    authErrorMessage: null,
  },
  getters: {
    // Permite leer la info del state
    authenticated(state) {
      return state.token && state.user
    },
    user(state) {
      return state.user
    },
    authErrorMessage(state) {
      return state.authErrorMessage
    },
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER(state, data) {
      state.user = data
    },
    SET_ERROR(state, data) {
      state.authErrorMessage = data
    },
  },
  actions: {
    async signIn({ dispatch }, credenciales) {
      // Post a la api para singin
      try {
        const { data } = await axios({
          method: 'POST',
          url: 'login',
          data: {
            rut: credenciales.rut,
            password: credenciales.password,
          },
        })
        // Enviamos el token a la actions attempt
        return dispatch('attempt', data.access_token)
      } catch (e) {
        return e.response.data
      }
    },
    async attempt({ commit, state }, token) {
      if (token) {
        commit('SET_TOKEN', token)
      }
      commit('SET_ERROR', null)
      if (!state.token) {
        return
      }
      try {
        const { data } = await axios.get('me')

        // almacena los datos del usuario autenticado en los getters
        commit('SET_USER', data[0])
      } catch (e) {
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
        commit('SET_ERROR', e.response.data)
      }
    },
    signOut({ commit }) {
      return axios.post('logout')
      .then((response) => {
        // Remove userData from localStorage
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
      }).catch((e) => {
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
      })
    },
  },
}
