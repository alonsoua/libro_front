import axios from 'axios'

export default async function realizadas() {
  return 0
}

export async function fetchRealizadas({ commit }, dato) {
  try {

    const {
      idCurso
      , tipo
    } = dato
    const { data } = await axios({
      method: 'GET',
      url: `registrocursoaccion/${idCurso}/${tipo}`,
    })
    console.log('/registrocursoaccion Registro Realizadas GET con exito...', data)
    commit('setRealizadas', data)
  } catch (e) {
    commit('realizadasError', e.response.data)
  }
}

export async function addRealizada({ commit }, realizada) {
  try {
    commit('realizadasErrorNull')
    const { data } = await axios({
      method: 'POST',
      url: 'registroaccion',
      data: {
        observaciones: realizada.observaciones,
        id_plan_apoyo: realizada.id_plan_apoyo,
        tipo: realizada.tipo,
        acciones: realizada.acciones,
      },
    })
    commit('setResponse', data)
  } catch (e) {
    commit('realizadasError', e.response.data)
  }
}

export async function updateRealizada({ commit }, realizada) {
  try {
    commit('realizadasErrorNull')
    const {data} = await axios({
      method: 'PUT',
      url: `registroaccion/${realizada.id}`,
      data: {
        observaciones: realizada.observaciones,
        id_plan_apoyo: realizada.id_plan_apoyo,
        tipo: realizada.tipo,
        acciones: realizada.acciones,
      },
    })
    commit('setResponse', data)
  } catch (e) {
    commit('realizadasError', e.response.data)
  }
}

export async function removeRealizada({ commit, dispatch }, realizada) {
  try {
    await axios({
      method: 'DELETE',
      url: `/registroaccion/${realizada.id}`,
    })
    // actualizamos lista de realizadas
    dispatch('fetchRealizadas', realizada.id_curso)
  } catch (e) {
    commit('realizadasError', e.response.data)
  }
}
