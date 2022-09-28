import axios from 'axios'
import { LCircle } from 'vue2-leaflet'

export default async function establecimientos() {
  return 0
}

export async function fetchEstablecimientos({ commit }) {
  try {
    const { data } = await axios.get('establecimiento')
    commit('setEstablecimientos', data)
  } catch (e) {
    commit('establecimientoError', e.response.data)
  }
}

export async function addEstablecimiento({ commit }, establecimiento) {
  try {
    commit('establecimientoErrorNull')

    // const response = await axios({
    //   method: 'POST',
    //   url: 'establecimiento',
    //   data: {
    //     // insignia: establecimiento.insignia,
    //     rbd: establecimiento.rbd,
    //     nombre: establecimiento.nombre,
    //     abreviatura: establecimiento.abreviatura,
    //     nombre_calle: establecimiento.nombre_calle,
    //     numero_calle: establecimiento.numero_calle,
    //     celular: establecimiento.celular,
    //     correo: establecimiento.correo,
    //     // estado: 'Activo',
    //   },
    // })
  } catch (e) {
    console.log('e.response.data :', e.response.data)
    commit('establecimientoError', e.response.data)
  }
}

export async function updateEstablecimiento({ commit }, establecimiento) {
  try {
    commit('establecimientoErrorNull')
    console.log('establecimiento :', establecimiento)
    const response = await axios({
      method: 'PUT',
      url: `establecimiento/${establecimiento.id}`,
      data: {
        rbd: establecimiento.rbd,
        nombre: establecimiento.nombre,
        abreviatura: establecimiento.abreviatura,
        nombre_calle: establecimiento.nombre_calle,
        numero_calle: establecimiento.numero_calle,
        celular: establecimiento.celular,
        correo: establecimiento.correo,
      },
    })
    console.log('response :', response)
  } catch (e) {
    commit('establecimientoError', e.response.data)
  }
}

export async function updateEstablecimientoPeriodo({ commit }, establecimiento) {
  try {
    commit('establecimientoErrorNull')
    const fecha = new Date()
    const dia = fecha.getDate()
    const mes = (fecha.getMonth() + 1)
    const year = fecha.getFullYear()
    const fechaInicioPeriodoActivo = `${year}-${mes}-${dia}`
    await axios({
      method: 'PUT',
      url: `/establecimientos/periodoActivo/${establecimiento.id}`,
      data: {
        idPeriodoActivo: establecimiento.idPeriodoActivo,
        fechaInicioPeriodoActivo,
      },
    })
  } catch (e) {
    commit('establecimientoError', e.response.data)
  }
}

export async function updateEstablecimientoEstado({ commit, dispatch }, establecimiento) {
  let est = ''
  try {
    commit('establecimientoErrorNull')
    if (establecimiento.estado === 'Inactivo') {
      est = 'Activo'
    } else if (establecimiento.estado === 'Activo') {
      est = 'Inactivo'
    }
    await axios({
      method: 'PUT',
      url: `/establecimientos/${establecimiento.id}`,
      data: {
        nombre: establecimiento.nombre,
        estado: est,
      },
    })
    // actualizamos lista de establecimientos
    dispatch('fetchEstablecimientos')
    dispatch('fetchEstablecimientosActivas')
  } catch (e) {
    commit('establecimientoError', e.response.data)
  }
}

export async function removeEstablecimientos({ commit, dispatch }, id) {
  try {
    await axios({
      method: 'DELETE',
      url: `/establecimientos/${id}`,
    })
    // actualizamos lista de establecimientos
    dispatch('fetchEstablecimientos')
  } catch (e) {
    commit('establecimientoError', e.response.data)
  }
}
