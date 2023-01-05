import axios from 'axios'

export default async function asistencias() {
  return 0
}



export async function fetchTipoAsistencia({ commit, dispatch }, datos) {
  try {
    const { data } = await axios.get('tipoasistencia')
    commit('setTipoAsistencia', data)
    console.log('/tipoasistencia GET tipo asistencias:', data)
  } catch (e) {
    commit('asistenciaError', e.response.data)
  }
}

export async function fetchAsistenciasMensual({ commit, dispatch }, datos) {
  try {
    const {
      id_curso,
      mes
    } = datos
    const { data } = await axios({
      method: 'GET',
      url: `asistencia/${id_curso}/${mes}`,
    })
    commit('setAsistenciasMensual', data)
    console.log('/asistencia GET asistencias mensual:', data)
  } catch (e) {
    commit('asistenciaError', e.response.data)
  }
}

export async function fetchAsistencias({ commit, dispatch }, datos) {
  try {
    const {
      id_curso,
      fecha
    } = datos
    console.log('datos :', datos)
    const { data } = await axios({
      method: 'GET',
      url: `asistenciabloque/${id_curso}/${fecha}`,
    })
    commit('setAsistencias', data)
    console.log('/ASISTENCIAS BLOQUES GET asistencias por BLOQUE:', data)
  } catch (e) {
    commit('asistenciaError', e.response.data)
  }
}

export async function addAsistencia({ commit }, asistencia) {
  try {
    commit('asistenciaErrorNull')
    console.log('asistencia :', asistencia)
    const response = await axios({
      method: 'POST',
      url: 'asistencia',
      data: {
        // insignia: asistencia.insignia,
        fecha: asistencia.fecha,
        id_curso: asistencia.id_curso,
        alumnos: asistencia.alumnos,
        // estado: 'Activo',
      },
    })
    console.log('response :', response)
    commit('setResponse', response)
  } catch (e) {
    console.log('e.response.data :', e.response.data)
    commit('asistenciaError', e.response.data)
  }
}

export async function updateAsistencia({ commit }, asistencia) {
  try {
    commit('asistenciaErrorNull')
    console.log('asistencia :', asistencia)
    const response = await axios({
      method: 'PUT',
      url: `asistencia/${asistencia.id}`,
      data: {
        rbd: asistencia.rbd,
        nombre: asistencia.nombre,
        abreviatura: asistencia.abreviatura,
        nombre_calle: asistencia.nombre_calle,
        numero_calle: asistencia.numero_calle,
        celular: asistencia.celular,
        correo: asistencia.correo,
      },
    })
    console.log('response :', response)
  } catch (e) {
    commit('asistenciaError', e.response.data)
  }
}

export async function removeAsistencias({ commit, dispatch }, id) {
  try {
    await axios({
      method: 'DELETE',
      url: `/asistencias/${id}`,
    })
    // actualizamos lista de asistencias
    dispatch('fetchAsistencias')
  } catch (e) {
    commit('asistenciaError', e.response.data)
  }
}
