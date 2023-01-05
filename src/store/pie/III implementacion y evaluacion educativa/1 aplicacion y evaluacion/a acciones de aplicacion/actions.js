import axios from 'axios'

export default async function aplicaciones() {
  return 0
}

export async function fetchAplicaciones({ commit }, idCurso) {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `registroimplementacion/${idCurso}`,
    })
    commit('setAplicaciones', data)
  } catch (e) {
    commit('aplicacionError', e.response.data)
  }
}

export async function addAplicacion({ commit }, aplicacion) {
  try {
    commit('aplicacionErrorNull')
    const { data } = await axios({
      method: 'POST',
      url: 'registroimplementacion',
      data: {
        // insignia: aplicacion.insignia,
        acciones: aplicacion.acciones,
        evaluacion: aplicacion.evaluacion,
        id_detalle_estrategia: aplicacion.id_detalle_estrategia,
      },
    })
    commit('setResponse', data)
  } catch (e) {
    commit('aplicacionError', e.response.data)
  }
}

export async function updateAplicacion({ commit }, aplicacion) {
  try {
    commit('aplicacionErrorNull')
    const {data} = await axios({
      method: 'PUT',
      url: `registroimplementacion/${aplicacion.id}`,
      data: {
        acciones: aplicacion.acciones,
        evaluacion: aplicacion.evaluacion,
        id_detalle_estrategia: aplicacion.id_detalle_estrategia,
      },
    })
    commit('setResponse', data)
  } catch (e) {
    commit('aplicacionError', e.response.data)
  }
}

export async function removeAplicacion({ commit, dispatch }, aplicacion) {
  try {
    const {data} = await axios({
      method: 'DELETE',
      url: `/registroimplementacion/${aplicacion.id}`,
    })
    // actualizamos lista de aplicaciones
    dispatch('fetchAplicaciones', aplicacion.id_curso)
  } catch (e) {
    commit('aplicacionError', e.response.data)
  }
}
