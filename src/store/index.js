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

import notas from './notas'
import evaluaciones from './evaluaciones'
import asistencias from './asistencias'
import bloques from './bloques'


// Mantenedores
import horarios from './mantenedores/horarios'
import personas from './mantenedores/personas'
import usuarios from './mantenedores/usuarios'

import asignaturas from './mantenedores/asignaturas'
import calendarios from './mantenedores/calendarios'
import establecimientos from './mantenedores/establecimientos'
import periodos from './mantenedores/periodos'
import cursos from './mantenedores/cursos'
import roles from './mantenedores/roles'

// PIE
  // EQUIPO DE AULA
  import I_2_reuniones from './pie/I equipo/2 reuniones'

  // PLANIFICACION EDUCATIVA
  import II_1_a_panorama from './pie/II planificacion educativa/1 estrategias diversificadas/a panorama'
  import II_1_b_estrategias from './pie/II planificacion educativa/1 estrategias diversificadas/b estrategias'

  import II_2_a_acciones from './pie/II planificacion educativa/2 trabajo colaborativo/a acciones'
  import II_2_b_apoyos from './pie/II planificacion educativa/2 trabajo colaborativo/b apoyos'

  import II_3_a_diversidad from './pie/II planificacion educativa/3 diversidad y adecuacion/a diversidad'
  import II_3_b_adecuacion from './pie/II planificacion educativa/3 diversidad y adecuacion/b adecuacion'
  import II_3_c_evaluacion from './pie/II planificacion educativa/3 diversidad y adecuacion/c evaluacion'

  import II_4_plan_apoyo from './pie/II planificacion educativa/4 plan de apoyo individual'

  import II_5_b_estrategias_trabajo from './pie/II planificacion educativa/5 estrategias de trabajo'

  // IMPLEMENTACION Y EVALUACION EDUCATIVA
  import III_1_a_acciones_de_aplicacion from './pie/III implementacion y evaluacion educativa/1 aplicacion y evaluacion/a acciones de aplicacion'
  import III_1_b_acciones_realizadas from './pie/III implementacion y evaluacion educativa/1 aplicacion y evaluacion/b acciones realizadas'
  import III_3_logros from './pie/III implementacion y evaluacion educativa/3 logros de aprendizaje'

  // REGISTRO DE ACTIVIDADES
  import IV_actividades from './pie/IV registro de actividades'

  // ACTA DE REUNIONES
  import V_reuniones from './pie/V reuniones'

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
    horarios,
    personas,
    usuarios,

    asignaturas,
    establecimientos,
    periodos,
    cursos,
    roles,
    calendarios,


    // SYS
    auth,
    libros,
    notas,
    evaluaciones,

    asistencias,
    bloques,


    // PIE
    // EQUIPO DE AULA
    I_2_reuniones,

    // PLANIFICACION EDUCATIVA
    II_1_a_panorama,
    II_1_b_estrategias,

    II_2_a_acciones,
    II_2_b_apoyos,

    II_3_a_diversidad,
    II_3_b_adecuacion,
    II_3_c_evaluacion,

    II_4_plan_apoyo,
    II_5_b_estrategias_trabajo,

    // IMPLEMENTACION Y EVALUACION EDUCATIVA
    III_1_a_acciones_de_aplicacion,
    III_1_b_acciones_realizadas,
    III_3_logros,

    // REGISTRO DE ACTIVIDADES
    IV_actividades,

    // ACTA DE REUNIONES
    V_reuniones
  },
  strict: process.env.DEV,
  plugins: [vuexLocal.plugin],
})
