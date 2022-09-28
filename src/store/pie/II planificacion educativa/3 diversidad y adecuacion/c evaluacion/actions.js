import axios from 'axios'

export default async function evaluaciones() {
  return 0
}

export async function fetchEvaluacion({ commit }, idCurso) {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `adecuacionc/${idCurso}`,
    })
    commit('setEvaluacion', data[0])
    console.log('/adecuacionc Evaluación GET con exito... data[0]', data[0])
  } catch (e) {
    commit('evaluacionError', e.response.data)
  }
}

export async function addEvaluacion({ commit }, evaluacion) {
  try {
    commit('evaluacionErrorNull')
    const {data} = await axios({
      method: 'POST',
      url: 'adecuacionc',
      data: {
        id_curso: evaluacion.idCurso,
        evaluacion: evaluacion.evaluacion,
        estrategia: evaluacion.estrategia,
        observaciones: evaluacion.observaciones,
      },
    })
    console.log('/adecuacionc Evaluacion CREATE con exito...', data)
  } catch (e) {
    commit('evaluacionError', e.response.data)
  }
}

export async function updateEvaluacion({ commit }, evaluacion) {
  try {
    commit('evaluacionErrorNull')
    const {data} = await axios({
      method: 'PUT',
      url: `adecuacionc/${evaluacion.id}`,
      data: {
        id_curso: evaluacion.idCurso,
        evaluacion: evaluacion.evaluacion,
        estrategia: evaluacion.estrategia,
        observaciones: evaluacion.observaciones,
      },
    })
    console.log('/adecuacionc Evaluacion UPDATE con exito...', data)
  } catch (e) {
    commit('evaluacionError', e.response.data)
  }
}
