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
        const response = await axios({
          method: 'POST',
          url: 'login',
          data: {
            rut: credenciales.rut,
            password: credenciales.password,
          },
        })

        // Enviamos el token a la actions attempt
        return dispatch('attempt', response.data)
      } catch (e) {
        return e.response.data
      }
    },
    async attempt({ commit, state }, data) {
      if (typeof data === 'string' && data !== null) {
        data = JSON.parse(data);
      }

      if (data !== null && data.access_token) {
        commit('SET_TOKEN', data.access_token)
      }
      commit('SET_ERROR', null)
      if (!state.token) {
        return
      }
      try {
        // const response = await axios.get('auth/me')
        // almacena los datos del usuario autenticado en los getters
        // const dataUser = {
        //   data,
        //   'avility': data.permisos,
        // }
        commit('SET_USER', data)
      } catch (e) {
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
        commit('SET_ERROR', e.response.data)
      }
    },
    signOut({ commit }) {
      return axios.post('logout').then(() => {
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
      })
    },
  },
}
