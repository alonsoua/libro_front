import axios from 'axios'
import { LCircle } from 'vue2-leaflet'

export default async function asignaturas() {
  return 0
}

export async function fetchAsignaturas({ commit }) {
  try {
    const { data } = await axios.get('asignatura')
    commit('setAsignaturas', data)
  } catch (e) {
    commit('asignaturaError', e.response.data)
  }
}

export async function fetchAsignaturasCurso({ commit }, idCurso) {
  // try {
  //   const { data } = await axios.get('asignatura')
  //   commit('setAsignaturas', data)
  // } catch (e) {
  //   commit('asignaturaError', e.response.data)
  // }

  const data = [
    {
      id: 1,
      texto: 'Lenguaje',
      nombre: 'Lenguaje',
    },
    {
      id: 2,
      texto: 'Matemáticas',
      nombre: 'Matemáticas',
    },
  ]
  commit('setAsignaturasCurso', data)
}

export async function addAsignatura({ commit }, asignatura) {
  try {
    commit('asignaturaErrorNull')

    // const response = await axios({
    //   method: 'POST',
    //   url: 'asignatura',
    //   data: {
    //     // insignia: asignatura.insignia,
    //     rbd: asignatura.rbd,
    //     nombre: asignatura.nombre,
    //     abreviatura: asignatura.abreviatura,
    //     nombre_calle: asignatura.nombre_calle,
    //     numero_calle: asignatura.numero_calle,
    //     celular: asignatura.celular,
    //     correo: asignatura.correo,
    //     // estado: 'Activo',
    //   },
    // })
  } catch (e) {
    console.log('e.response.data :', e.response.data)
    commit('asignaturaError', e.response.data)
  }
}

export async function updateAsignatura({ commit }, asignatura) {
  try {
    commit('asignaturaErrorNull')
    console.log('asignatura :', asignatura)
    const response = await axios({
      method: 'PUT',
      url: `asignatura/${asignatura.id}`,
      data: {
        rbd: asignatura.rbd,
        nombre: asignatura.nombre,
        abreviatura: asignatura.abreviatura,
        nombre_calle: asignatura.nombre_calle,
        numero_calle: asignatura.numero_calle,
        celular: asignatura.celular,
        correo: asignatura.correo,
      },
    })
    console.log('response :', response)
  } catch (e) {
    commit('asignaturaError', e.response.data)
  }
}

export async function updateAsignaturaPeriodo({ commit }, asignatura) {
  try {
    commit('asignaturaErrorNull')
    const fecha = new Date()
    const dia = fecha.getDate()
    const mes = (fecha.getMonth() + 1)
    const year = fecha.getFullYear()
    const fechaInicioPeriodoActivo = `${year}-${mes}-${dia}`
    await axios({
      method: 'PUT',
      url: `/asignaturas/periodoActivo/${asignatura.id}`,
      data: {
        idPeriodoActivo: asignatura.idPeriodoActivo,
        fechaInicioPeriodoActivo,
      },
    })
  } catch (e) {
    commit('asignaturaError', e.response.data)
  }
}

export async function updateAsignaturaEstado({ commit, dispatch }, asignatura) {
  let est = ''
  try {
    commit('asignaturaErrorNull')
    if (asignatura.estado === 'Inactivo') {
      est = 'Activo'
    } else if (asignatura.estado === 'Activo') {
      est = 'Inactivo'
    }
    await axios({
      method: 'PUT',
      url: `/asignaturas/${asignatura.id}`,
      data: {
        nombre: asignatura.nombre,
        estado: est,
      },
    })
    // actualizamos lista de asignaturas
    dispatch('fetchAsignaturas')
    dispatch('fetchAsignaturasActivas')
  } catch (e) {
    commit('asignaturaError', e.response.data)
  }
}

export async function removeAsignaturas({ commit, dispatch }, id) {
  try {
    await axios({
      method: 'DELETE',
      url: `/asignaturas/${id}`,
    })
    // actualizamos lista de asignaturas
    dispatch('fetchAsignaturas')
  } catch (e) {
    commit('asignaturaError', e.response.data)
  }
}
