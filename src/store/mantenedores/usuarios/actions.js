import axios from 'axios'
import { LCircle } from 'vue2-leaflet'

export default async function usuarios() {
  return 0
}

export async function fetchUsuarios({ commit }) {
  try {
    const { data } = await axios.get('usuario')
    commit('setUsuarios', data)
  } catch (e) {
    commit('usuarioError', e.response.data)
  }
}

export async function addUsuario({ commit }, usuario) {
  try {
    commit('usuarioErrorNull')
    const { data } = await axios({
      method: 'POST',
      url: 'usuario',
      data: {
        password: usuario.password,
        id_persona: usuario.id_persona,
        // estado: 1,
      },
    })
    commit('setResponse', data)
  } catch (e) {
    commit('usuarioError', e.response.data)
  }
}

export async function updateUsuario({ commit }, usuario) {
  try {
    commit('usuarioErrorNull')
    const response = await axios({
      method: 'PUT',
      url: `usuario/${usuario.id}`,
      data: {
        rbd: usuario.rbd,
        nombre: usuario.nombre,
        abreviatura: usuario.abreviatura,
        nombre_calle: usuario.nombre_calle,
        numero_calle: usuario.numero_calle,
        celular: usuario.celular,
        correo: usuario.correo,
      },
    })
  } catch (e) {
    commit('usuarioError', e.response.data)
  }
}

export async function updateUsuarioEstado({ commit, dispatch }, usuario) {
  let est = ''
  try {
    commit('usuarioErrorNull')
    if (usuario.estado === 'Inactivo') {
      est = 'Activo'
    } else if (usuario.estado === 'Activo') {
      est = 'Inactivo'
    }
    await axios({
      method: 'PUT',
      url: `/usuarios/${usuario.id}`,
      data: {
        nombre: usuario.nombre,
        estado: est,
      },
    })
    // actualizamos lista de usuarios
    dispatch('fetchUsuarios')
    dispatch('fetchUsuariosActivas')
  } catch (e) {
    commit('usuarioError', e.response.data)
  }
}

export async function removeUsuarios({ commit, dispatch }, id) {
  try {
    await axios({
      method: 'DELETE',
      url: `/usuarios/${id}`,
    })
    // actualizamos lista de usuarios
    dispatch('fetchUsuarios')
  } catch (e) {
    commit('usuarioError', e.response.data)
  }
}
