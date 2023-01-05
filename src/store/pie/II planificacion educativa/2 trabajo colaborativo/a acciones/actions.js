import axios from 'axios'

export default async function acciones() {
  return 0
}

export async function fetchAcciones({ commit }, idCurso) {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `trabajo/${idCurso}`,
    })
    commit('setAcciones', data[0])
  } catch (e) {
    commit('accionError', e.response.data)
  }
}

export async function addAccion({ commit }, accion) {
  try {
    commit('accionErrorNull')
    const {data} = await axios({
      method: 'POST',
      url: 'trabajo',
      data: {
        profesores: accion.profesores,
        asistentes: accion.asistentes,
        estudiantes: accion.estudiantes,
        familia: accion.familia,
        comunidad: accion.comunidad,
        observaciones: accion.observaciones,
        id_curso: accion.idCurso,
      },
    })
  } catch (e) {
    commit('accionError', e.response.data)
  }
}

export async function updateAccion({ commit }, accion) {
  try {
    commit('accionErrorNull')
    const {data} = await axios({
      method: 'PUT',
      url: `trabajo/${accion.id}`,
      data: {
        profesores: accion.profesores,
        asistentes: accion.asistentes,
        estudiantes: accion.estudiantes,
        familia: accion.familia,
        comunidad: accion.comunidad,
        observaciones: accion.observaciones,
        id_curso: accion.idCurso,
      },
    })
  } catch (e) {
    commit('accionError', e.response.data)
  }
}
