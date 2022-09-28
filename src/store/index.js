import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

// Modules
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'

// Modules SYS
import auth from './:auth'
import libros from './libros'

// Mantenedores
import calendarios from './mantenedores/calendarios'
import establecimientos from './mantenedores/establecimientos'
import periodos from './mantenedores/periodos'
import cursos from './mantenedores/cursos'

// PIE
// EQUIPO DE AULA
import I_2_reuniones from './pie/I equipo/2 reuniones'

// PLANIFICACION DEL PROCESO EDUCATIVO
import II_1_a_panorama from './pie/II planificacion educativa/1 estrategias diversificadas/a panorama'
import II_1_b_estrategias from './pie/II planificacion educativa/1 estrategias diversificadas/b estrategias'
import II_2_a_acciones from './pie/II planificacion educativa/2 trabajo colaborativo/a acciones'
import II_2_b_apoyos from './pie/II planificacion educativa/2 trabajo colaborativo/b apoyos'
import II_3_c_evaluacion from './pie/II planificacion educativa/3 diversidad y adecuacion/c evaluacion'
import II_5_b_estrategias_trabajo from './pie/II planificacion educativa/5 estrategias de trabajo'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
})

export default new Vuex.Store({
  modules: {
    // vuexy
    app,
    appConfig,
    verticalMenu,


    // Mantenedores
    establecimientos,
    periodos,
    cursos,
    calendarios,

    // SYS
    auth,
    libros,


    // PIE
    // EQUIPO DE AULA
    I_2_reuniones,

    // PLANIFICACION DEL PROCESO EDUCATIVO
    II_1_a_panorama,
    II_1_b_estrategias,
    II_2_a_acciones,
    II_2_b_apoyos,
    II_3_c_evaluacion,
    II_5_b_estrategias_trabajo,
  },
  strict: process.env.DEV,
  plugins: [vuexLocal.plugin],
})
