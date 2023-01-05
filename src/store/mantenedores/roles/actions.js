import axios from 'axios'
import { LCircle } from 'vue2-leaflet'

export default async function roles() {
  return 0
}

export async function fetchRolesDirectivos({ commit }) {
  try {
    const { data } = await axios.get('rolesdirectivos')
    commit('setRoles', data)
  } catch (e) {
    commit('roleError', e.response.data)
  }
}

export async function fetchRoles({ commit }) {
  try {
    const { data } = await axios.get('rol')
    commit('setRoles', data)
  } catch (e) {
    commit('roleError', e.response.data)
  }
}


export async function addRol({ commit }, rol) {
  try {
    commit('roleErrorNull')


    // const response = await axios({
    //   method: 'POST',
    //   url: 'rol',
    //   data: {
    //     // insignia: rol.insignia,
    //     rbd: rol.rbd,
    //     nombre: rol.nombre,
    //     abreviatura: rol.abreviatura,
    //     nombre_calle: rol.nombre_calle,
    //     numero_calle: rol.numero_calle,
    //     celular: rol.celular,
    //     correo: rol.correo,
    //     // estado: 'Activo',
    //   },
    // })
  } catch (e) {
    commit('roleError', e.response.data)
  }
}

export async function updateRol({ commit }, rol) {
  try {
    commit('roleErrorNull')
    const response = await axios({
      method: 'PUT',
      url: `rol/${rol.id}`,
      data: {
        rbd: rol.rbd,
        nombre: rol.nombre,
        abreviatura: rol.abreviatura,
        nombre_calle: rol.nombre_calle,
        numero_calle: rol.numero_calle,
        celular: rol.celular,
        correo: rol.correo,
      },
    })
  } catch (e) {
    commit('roleError', e.response.data)
  }
}

export async function updateRolRol({ commit }, rol) {
  try {
    commit('roleErrorNull')
    const fecha = new Date()
    const dia = fecha.getDate()
    const mes = (fecha.getMonth() + 1)
    const year = fecha.getFullYear()
    const fechaInicioRolActivo = `${year}-${mes}-${dia}`
    await axios({
      method: 'PUT',
      url: `/roles/roleActivo/${rol.id}`,
      data: {
        idRolActivo: rol.idRolActivo,
        fechaInicioRolActivo,
      },
    })
  } catch (e) {
    commit('roleError', e.response.data)
  }
}

export async function updateRolEstado({ commit, dispatch }, rol) {
  let est = ''
  try {
    commit('roleErrorNull')
    if (rol.estado === 'Inactivo') {
      est = 'Activo'
    } else if (rol.estado === 'Activo') {
      est = 'Inactivo'
    }
    await axios({
      method: 'PUT',
      url: `/roles/${rol.id}`,
      data: {
        nombre: rol.nombre,
        estado: est,
      },
    })
    // actualizamos lista de roles
    dispatch('fetchRoles')
    dispatch('fetchRolesActivas')
  } catch (e) {
    commit('roleError', e.response.data)
  }
}

export async function removeRoles({ commit, dispatch }, id) {
  try {
    await axios({
      method: 'DELETE',
      url: `/roles/${id}`,
    })
    // actualizamos lista de roles
    dispatch('fetchRoles')
  } catch (e) {
    commit('roleError', e.response.data)
  }
}
