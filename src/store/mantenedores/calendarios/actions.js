import axios from 'axios'
import { LCircle } from 'vue2-leaflet'

export default async function calendarios() {
  return 0
}

export async function fetchCalendarios({ commit }) {
  try {
    const { data } = await axios.get('calendario')
    commit('setCalendarios', data)
  } catch (e) {
    commit('calendarioError', e.response.data)
  }
}

export async function addCalendario({ commit }, calendario) {
  try {
    commit('calendarioErrorNull')

    // const response = await axios({
    //   method: 'POST',
    //   url: 'calendario',
    //   data: {
    //     // insignia: calendario.insignia,
    //     rbd: calendario.rbd,
    //     nombre: calendario.nombre,
    //     abreviatura: calendario.abreviatura,
    //     nombre_calle: calendario.nombre_calle,
    //     numero_calle: calendario.numero_calle,
    //     celular: calendario.celular,
    //     correo: calendario.correo,
    //     // estado: 'Activo',
    //   },
    // })
  } catch (e) {
    console.log('e.response.data :', e.response.data)
    commit('calendarioError', e.response.data)
  }
}

export async function updateCalendario({ commit }, calendario) {
  try {
    commit('calendarioErrorNull')
    console.log('calendario :', calendario)
    const response = await axios({
      method: 'PUT',
      url: `calendario/${calendario.id}`,
      data: {
        rbd: calendario.rbd,
        nombre: calendario.nombre,
        abreviatura: calendario.abreviatura,
        nombre_calle: calendario.nombre_calle,
        numero_calle: calendario.numero_calle,
        celular: calendario.celular,
        correo: calendario.correo,
      },
    })
    console.log('response :', response)
  } catch (e) {
    commit('calendarioError', e.response.data)
  }
}

export async function updateCalendarioPeriodo({ commit }, calendario) {
  try {
    commit('calendarioErrorNull')
    const fecha = new Date()
    const dia = fecha.getDate()
    const mes = (fecha.getMonth() + 1)
    const year = fecha.getFullYear()
    const fechaInicioPeriodoActivo = `${year}-${mes}-${dia}`
    await axios({
      method: 'PUT',
      url: `/calendarios/periodoActivo/${calendario.id}`,
      data: {
        idPeriodoActivo: calendario.idPeriodoActivo,
        fechaInicioPeriodoActivo,
      },
    })
  } catch (e) {
    commit('calendarioError', e.response.data)
  }
}

export async function updateCalendarioEstado({ commit, dispatch }, calendario) {
  let est = ''
  try {
    commit('calendarioErrorNull')
    if (calendario.estado === 'Inactivo') {
      est = 'Activo'
    } else if (calendario.estado === 'Activo') {
      est = 'Inactivo'
    }
    await axios({
      method: 'PUT',
      url: `/calendarios/${calendario.id}`,
      data: {
        nombre: calendario.nombre,
        estado: est,
      },
    })
    // actualizamos lista de calendarios
    dispatch('fetchCalendarios')
    dispatch('fetchCalendariosActivas')
  } catch (e) {
    commit('calendarioError', e.response.data)
  }
}

export async function removeCalendarios({ commit, dispatch }, id) {
  try {
    await axios({
      method: 'DELETE',
      url: `/calendarios/${id}`,
    })
    // actualizamos lista de calendarios
    dispatch('fetchCalendarios')
  } catch (e) {
    commit('calendarioError', e.response.data)
  }
}
