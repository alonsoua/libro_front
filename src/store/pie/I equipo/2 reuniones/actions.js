import axios from 'axios'

export default async function reuniones() {
  return 0
}

export async function fetchReuniones({ commit }, idCurso) {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `reunion/${idCurso}`,
    })
    commit('setReuniones', data)
  } catch (e) {
    commit('reunionesError', e.response.data)
  }
}

export async function addReunion({ commit }, reunion) {
  try {
    commit('reunionErrorNull')
    const { data } = await axios({
      method: 'POST',
      url: 'reunion',
      data: {
        fecha: reunion.fecha,
        horario: reunion.horario,
        acuerdos: reunion.acuerdos,
        id_cursos: reunion.id_cursos,
        id_periodo: reunion.id_periodo,
        personas: reunion.personas,
      },
    })
    commit('setResponse', data)
  } catch (e) {
    commit('reunionError', e.response.data)
  }
}

export async function updateReunion({ commit }, reunion) {
  try {
    commit('reunionErrorNull')
    const { data } = await axios({
      method: 'PUT',
      url: `reunion/${reunion.id}`,
      data: {
        fecha: reunion.fecha,
        horario: reunion.horario,
        acuerdos: reunion.acuerdos,
        id_cursos: reunion.id_cursos,
        id_periodo: reunion.id_periodo,
        personas: reunion.personas,
      },
    })
    commit('setResponse', data)
  } catch (e) {
    commit('reunionError', e.response.data)
  }
}

export async function removeReunion({ commit, dispatch }, id) {
  try {
    await axios({
      method: 'DELETE',
      url: `/reunion/${id}`,
    })
  } catch (e) {
    commit('reunionError', e.response.data)
  }
}
