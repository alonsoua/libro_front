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
    console.log('/estrategiadetalle Estrategias GET con exito...', data)
    commit('setEstrategias', data)
  } catch (e) {
    commit('estrategiasError', e.response.data)
  }
}

export async function addEstrategia({ commit }, estrategia) {
  try {
    commit('estrategiaErrorNull')
    console.log('estrategia :', estrategia)
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
    console.log('/estrategiadetalle Estrategias CREATE con exito...', data)
  } catch (e) {
    commit('estrategiaError', e.response.data)
  }
}

export async function updateEstrategia({ commit }, estrategia) {
  try {
    commit('estrategiaErrorNull')
    console.log('estrategia :', estrategia)
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
    console.log('/estrategiadetalle Estrategias UPDATE exito...', data)
    commit('setResponse', data)
  } catch (e) {
    console.log('e.reponse.data :', e.reponse.data)
    commit('estrategiaError', e.response.data)
  }
}

export async function removeEstrategia({ commit, dispatch }, estrategia) {
  try {
    await axios({
      method: 'DELETE',
      url: `/estrategiadetalle/${estrategia.id}`,
    })
    // actualizamos lista de estrategias
    console.log('estrategia :', estrategia)
    dispatch('fetchEstrategias', estrategia.id_curso)
  } catch (e) {
    commit('estrategiaError', e.response.data)
  }
}
