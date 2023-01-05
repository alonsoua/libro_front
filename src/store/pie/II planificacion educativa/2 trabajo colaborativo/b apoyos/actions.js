import axios from 'axios'
import { LCircle } from 'vue2-leaflet'

export default async function apoyos() {
  return 0
}

export async function fetchApoyos({ commit }, idCurso) {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `trabajodetalle/${idCurso}`,
    })
    commit('setApoyos', data)
  } catch (e) {
    commit('apoyoError', e.response.data)
  }
}

export async function addApoyo({ commit }, apoyo) {
  try {
    commit('apoyoErrorNull')
    const { data } = await axios({
      method: 'POST',
      url: 'trabajodetalle',
      data: {
        horas_aula: apoyo.horas_aula,
        horas_fuera: apoyo.horas_fuera,
        apoyos: apoyo.apoyos,
        id_asignatura: apoyo.id_asignatura,
      },
    })
    commit('setResponse', data)
  } catch (e) {
    commit('apoyoError', e.response.data)
  }
}

export async function updateApoyo({ commit }, apoyo) {
  try {
    commit('apoyoErrorNull')
    const {data} = await axios({
      method: 'PUT',
      url: `trabajodetalle/${apoyo.id}`,
      data: {
        horas_aula: apoyo.horas_aula,
        horas_fuera: apoyo.horas_fuera,
        apoyos: apoyo.apoyos,
        id_asignatura: apoyo.id_asignatura,
      },
    })
    commit('setResponse', data)
  } catch (e) {
    commit('apoyoError', e.response.data)
  }
}

export async function removeApoyo({ commit, dispatch }, apoyo) {
  try {
    await axios({
      method: 'DELETE',
      url: `/trabajodetalle/${apoyo.id}`,
    })
    // actualizamos lista de apoyos
    dispatch('fetchApoyos', apoyo.id_curso)
  } catch (e) {
    commit('apoyoError', e.response.data)
  }
}
