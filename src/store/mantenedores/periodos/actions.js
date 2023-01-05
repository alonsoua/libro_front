import axios from 'axios'
import { LCircle } from 'vue2-leaflet'

export default async function periodos() {
  return 0
}

export async function fetchPeriodos({ commit }) {
  try {
    const { data } = await axios.get('periodo')
    commit('setPeriodos', data)
  } catch (e) {
    commit('periodoError', e.response.data)
  }
}

export async function fetchPeriodosEstablecimiento({ commit }, idEstablecimiento) {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `periodosEstablecimiento/${idEstablecimiento}`,
    })
    commit('setPeriodosEstablecimiento', data)
  } catch (e) {
    commit('periodoError', e.response.data)
  }
}

export async function addPeriodo({ commit }, periodo) {
  try {
    commit('periodoErrorNull')


    // const response = await axios({
    //   method: 'POST',
    //   url: 'periodo',
    //   data: {
    //     // insignia: periodo.insignia,
    //     rbd: periodo.rbd,
    //     nombre: periodo.nombre,
    //     abreviatura: periodo.abreviatura,
    //     nombre_calle: periodo.nombre_calle,
    //     numero_calle: periodo.numero_calle,
    //     celular: periodo.celular,
    //     correo: periodo.correo,
    //     // estado: 'Activo',
    //   },
    // })
  } catch (e) {
    commit('periodoError', e.response.data)
  }
}

export async function updatePeriodo({ commit }, periodo) {
  try {
    commit('periodoErrorNull')
    const response = await axios({
      method: 'PUT',
      url: `periodo/${periodo.id}`,
      data: {
        rbd: periodo.rbd,
        nombre: periodo.nombre,
        abreviatura: periodo.abreviatura,
        nombre_calle: periodo.nombre_calle,
        numero_calle: periodo.numero_calle,
        celular: periodo.celular,
        correo: periodo.correo,
      },
    })
  } catch (e) {
    commit('periodoError', e.response.data)
  }
}

export async function updatePeriodoPeriodo({ commit }, periodo) {
  try {
    commit('periodoErrorNull')
    const fecha = new Date()
    const dia = fecha.getDate()
    const mes = (fecha.getMonth() + 1)
    const year = fecha.getFullYear()
    const fechaInicioPeriodoActivo = `${year}-${mes}-${dia}`
    await axios({
      method: 'PUT',
      url: `/periodos/periodoActivo/${periodo.id}`,
      data: {
        idPeriodoActivo: periodo.idPeriodoActivo,
        fechaInicioPeriodoActivo,
      },
    })
  } catch (e) {
    commit('periodoError', e.response.data)
  }
}

export async function updatePeriodoEstado({ commit, dispatch }, periodo) {
  let est = ''
  try {
    commit('periodoErrorNull')
    if (periodo.estado === 'Inactivo') {
      est = 'Activo'
    } else if (periodo.estado === 'Activo') {
      est = 'Inactivo'
    }
    await axios({
      method: 'PUT',
      url: `/periodos/${periodo.id}`,
      data: {
        nombre: periodo.nombre,
        estado: est,
      },
    })
    // actualizamos lista de periodos
    dispatch('fetchPeriodos')
    dispatch('fetchPeriodosActivas')
  } catch (e) {
    commit('periodoError', e.response.data)
  }
}

export async function removePeriodos({ commit, dispatch }, id) {
  try {
    await axios({
      method: 'DELETE',
      url: `/periodos/${id}`,
    })
    // actualizamos lista de periodos
    dispatch('fetchPeriodos')
  } catch (e) {
    commit('periodoError', e.response.data)
  }
}
