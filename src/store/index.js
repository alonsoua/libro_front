import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'

// Modules SYS
import auth from './:auth'
import establecimientos from './establecimientos'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    auth,
    establecimientos,
  },
  strict: process.env.DEV,
})
