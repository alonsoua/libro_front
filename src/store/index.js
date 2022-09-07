import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import auth from './:auth'
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    app,
    appConfig,
    verticalMenu,
  },
  strict: process.env.DEV,
})
