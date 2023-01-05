import axios from 'axios'

export default async function diversidades() {
  return 0
}

export async function fetchDiversidad({ commit }, idCurso) {
  try {

    const { data } = await axios({
      method: 'GET',
      url: `adecuacion/${idCurso}`,
    })
    commit('setDiversidad', data)
    console.log('/adecuacion Diversidad GET con exito... ', data)
  } catch (e) {
    commit('diversidadError', e.response.data)
  }
}

export function addDiversidad({ commit }, diversidad) {
  try {
    commit('diversidadErrorNull')
    const {data} = axios({
      method: 'POST',
      url: 'adecuacion',
      data: {
        id_curso: diversidad.id_curso,
        tipo: diversidad.tipo,
        criterio_show: diversidad.criterio_show,
        criterio_chk: diversidad.criterio_chk,
        criterio: diversidad.criterio,
        estrategia_1_chk: diversidad.estrategia_1_chk,
        estrategia_1: diversidad.estrategia_1,
        estrategia_2_chk: diversidad.estrategia_2_chk,
        estrategia_2: diversidad.estrategia_2,
        estrategia_3_chk: diversidad.estrategia_3_chk,
        estrategia_3: diversidad.estrategia_3,
        como: diversidad.como,
        observaciones: diversidad.observaciones,
        personas: diversidad.personas,
      },
    })
  } catch (e) {
    commit('diversidadError', e.response.data)
  }
}

export function updateDiversidad({ commit }, diversidad) {
  try {
    commit('diversidadErrorNull')
    const {data} = axios({
      method: 'PUT',
      url: `adecuacion/${diversidad.id_diversidad}`,
      data: {
        id_curso: diversidad.id_curso,
        tipo: diversidad.tipo,
        criterio_show: diversidad.criterio_show,
        criterio_chk: diversidad.criterio_chk,
        criterio: diversidad.criterio,
        estrategia_1_chk: diversidad.estrategia_1_chk,
        estrategia_1: diversidad.estrategia_1,
        estrategia_2_chk: diversidad.estrategia_2_chk,
        estrategia_2: diversidad.estrategia_2,
        estrategia_3_chk: diversidad.estrategia_3_chk,
        estrategia_3: diversidad.estrategia_3,
        como: diversidad.como,
        observaciones: diversidad.observaciones,
        personas: diversidad.personas,
      },
    })
    console.log('/adecuacion Diversidad UPDATE con exito...', data)
  } catch (e) {
    console.log('e.response.data :', e.response.data)
    commit('diversidadError', e.response.data)
  }
}
