import axios from 'axios'

export default async function estrategia() {
  return 0
}

export async function fetchEstrategia({ commit }, idCurso) {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `estrategiafamilia/${idCurso}`,
    })
    commit('setEstrategia', data)
    console.log('/estrategiafamilia Estrategia GET con exito...', data)
  } catch (e) {
    commit('estrategiaError', e.response.data)
  }
}

export async function fetchEstrategiaDetalle({ commit }, idCurso) {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `estrategiafamiliadetalle/${idCurso}`,
    })
    commit('setEstrategiaDetalle', data)
    console.log('/estrategiafamiliadetalle Estrategia GET con exito...', data)
  } catch (e) {
    commit('estrategiaError', e.response.data)
  }
}


export async function addEstrategia({ commit }, estrategia) {
  try {
    console.log('estrategia :', estrategia)
    commit('estrategiaErrorNull')
    const {data} = await axios({
      method: 'POST',
      url: 'estrategiafamilia',
      data: {
        id_curso: estrategia.id_curso,
        observaciones: estrategia.observaciones,
      },
    })
    console.log('/estrategiafamilia Estrategia CREATE exito...', data)
  } catch (e) {
    commit('estrategiaError', e.response.data)
  }
}

export async function addEstrategiaDetalle({ commit }, estrategiaDetalle) {
  try {
    console.log('estrategiaDetalle detalle:', estrategiaDetalle)
    commit('estrategiaErrorNull')
    const {data} = await axios({
      method: 'POST',
      url: 'estrategiafamiliadetalle',
      data: {
        id_estrategia_familia: estrategiaDetalle.id_estrategia_familia,
        participacion: estrategiaDetalle.participacion,
        descripcion: estrategiaDetalle.descripcion,
        seguimiento: estrategiaDetalle.seguimiento,
        evaluacion: estrategiaDetalle.evaluacion,
      },
    })
    console.log('/estrategiafamiliadetalle Estrategia CREATE exito...', data)
  } catch (e) {
    commit('estrategiaError', e.response.data)
  }
}

export async function updateEstrategia({ commit }, estrategia) {
  try {
    commit('estrategiaErrorNull')
    const {data} = await axios({
      method: 'PUT',
      url: `estrategiafamilia/${estrategia.id}`,
      data: {
        id_curso: estrategia.id_curso,
        observaciones: estrategia.observaciones,
      },
    })
    console.log('/estrategiafamilia Estrategia UPDATE exito...', data)
  } catch (e) {
    commit('estrategiaError', e.response.data)
  }
}

export async function updateEstrategiaDetalle({ commit }, estrategiaDetalle) {
  try {
    commit('estrategiaErrorNull')
    const {data} = await axios({
      method: 'PUT',
      url: `estrategiafamiliadetalle/${estrategiaDetalle.id}`,
      data: {
        id_estrategia_familia: estrategiaDetalle.id_estrategia_familia,
        participacion: estrategiaDetalle.participacion,
        descripcion: estrategiaDetalle.descripcion,
        seguimiento: estrategiaDetalle.seguimiento,
        evaluacion: estrategiaDetalle.evaluacion,
      },
    })

    if (data.message === 'Registro no encontrado') {
      dispatch('addEstrategiaDetalle', estrategiaDetalle)
    }

    console.log('/estrategiafamiliadetalle Estrategia UPDATE exito...', data)
  } catch (e) {
    commit('estrategiaError', e.response.data)
  }
}

export async function removeEstrategiaDetalle({ commit, dispatch }, estrategia) {
  try {
    await axios({
      method: 'DELETE',
      url: `/estrategiafamiliadetalle/${estrategia.id_estrategia_detalle}`,
    })
    // actualizamos lista de estrategia
    dispatch('fetchEstrategia', estrategia.id_curso)
  } catch (e) {
    commit('estrategiaError', e.response.data)
  }
}
