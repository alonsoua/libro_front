import axios from 'axios'

export default async function logros() {
  return 0
}

export async function fetchLogros({ commit }, idCurso) {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `registrologrocurso/${idCurso}`,
    })
    commit('setLogros', data)
  } catch (e) {
    commit('logroError', e.response.data)
  }
}

export async function addLogro({ commit }, logro) {
  try {
    commit('logroErrorNull')
    const { data } = await axios({
      method: 'POST',
      url: 'registrologro',
      data: {
        logros: logro.logros,
        comentarios: logro.comentarios,
        id_persona_rol_alumno: logro.id_persona_rol_alumno,
        id_curso: logro.id_curso,
      },
    })
    commit('setResponse', data)
  } catch (e) {
    commit('logroError', e.response.data)
  }
}

export async function updateLogro({ commit }, logro) {
  try {
    commit('logroErrorNull')
    const { data } = await axios({
      method: 'PUT',
      url: `registrologro/${logro.id}`,
      data: {
        logros: logro.logros,
        comentarios: logro.comentarios,
        id_persona_rol_alumno: logro.id_persona_rol_alumno,
        id_curso: logro.id_curso,
      },
    })
    commit('setResponse', data)
  } catch (e) {
    commit('logroError', e.response.data)
  }
}

export async function removeLogro({ commit, dispatch }, id) {
  try {
    await axios({
      method: 'DELETE',
      url: `registrologro/${id}`,
    })
  } catch (e) {
    commit('logroError', e.response.data)
  }
}
