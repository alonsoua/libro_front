import axios from 'axios'

export default async function adecuaciones() {
  return 0
}

export async function fetchAdecuacion({ commit }, idCurso) {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `adecuacionb/${idCurso}`,
    })
    commit('setAdecuacion', data)
  } catch (e) {
    commit('adecuacionError', e.response.data)
  }
}

export async function addAdecuacion({ commit }, adecuacion) {
  try {
    commit('adecuacionErrorNull')
    const {data} = await axios({
      method: 'POST',
      url: 'adecuacionb',
      data: {
        adecuacion_chk: adecuacion.adecuacion_chk,
        adecuacion: adecuacion.adecuacion,
        estrategia: adecuacion.estrategia,
        id_asignatura: adecuacion.id_asignatura,
        id_curso: adecuacion.id_curso,
        personas: adecuacion.personas,
      },
    })
  } catch (e) {
    commit('adecuacionError', e.response.data)
  }
}

export async function updateAdecuacion({ commit }, adecuacion) {
  try {
    commit('adecuacionErrorNull')
    const {data} = await axios({
      method: 'PUT',
      url: `adecuacionb/${adecuacion.id}`,
      data: {
        adecuacion_chk: adecuacion.adecuacion_chk,
        adecuacion: adecuacion.adecuacion,
        estrategia: adecuacion.estrategia,
        id_asignatura: adecuacion.id_asignatura,
        id_curso: adecuacion.id_curso,
        personas: adecuacion.personas,
      },
    })
  } catch (e) {
    commit('adecuacionError', e.response.data)
  }
}
