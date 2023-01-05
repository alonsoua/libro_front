import axios from 'axios'

export default async function estrategias() {
  return 0
}

export async function fetchEstrategias({ commit }, idCurso) {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `estrategiadetalle/${idCurso}`,
    })
    commit('setEstrategias', data)
  } catch (e) {
    commit('estrategiaError', e.response.data)
  }
}

export async function fetchEstrategiasDisponibles({ commit }, idCurso) {
  try {
    // * Obtiene las estrategias que aún pueden ser trabajadas en
    // * Modulo > III_1_A Acciones de aplicación
    const { data } = await axios({
      method: 'GET',
      url: `estrategiadetalleregistro/${idCurso}`,
    })
    commit('setEstrategiasDisponibles', data)
  } catch (e) {
    commit('estrategiaError', e.response.data)
  }
}



export async function addEstrategia({ commit }, estrategia) {
  try {
    commit('estrategiaErrorNull')
    const { data } = await axios({
      method: 'POST',
      url: 'estrategiadetalle',
      data: {
        // insignia: estrategia.insignia,
        id_asignatura: estrategia.id_asignatura,
        estrategia: estrategia.estrategia,
        criterios: estrategia.criterios,
        id_periodo: estrategia.id_periodo,
      },
    })
    commit('setResponse', data)
  } catch (e) {
    commit('estrategiaError', e.response.data)
  }
}

export async function updateEstrategia({ commit }, estrategia) {
  try {
    commit('estrategiaErrorNull')
    const {data} = await axios({
      method: 'PUT',
      url: `estrategiadetalle/${estrategia.id}`,
      data: {
        id_asignatura: estrategia.id_asignatura,
        estrategia: estrategia.estrategia,
        criterios: estrategia.criterios,
        id_periodo: estrategia.id_periodo,
      },
    })
    commit('setResponse', data)
  } catch (e) {
    commit('estrategiaError', e.response.data)
  }
}

export async function removeEstrategia({ commit, dispatch }, estrategia) {
  try {
    const {data} = await axios({
      method: 'DELETE',
      url: `/estrategiadetalle/${estrategia.id}`,
    })
    // actualizamos lista de estrategias
    dispatch('fetchEstrategias', estrategia.id_curso)
  } catch (e) {
    commit('estrategiaError', e.response.data)
  }
}
