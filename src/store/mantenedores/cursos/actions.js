import axios from 'axios'
import { LCircle } from 'vue2-leaflet'

export default async function cursos() {
  return 0
}

export async function fetchCursos({ commit }) {
  try {
    const { data } = await axios.get('curso')
    commit('setCursos', data)
  } catch (e) {
    commit('cursoError', e.response.data)
  }
}

export async function addCurso({ commit }, curso) {
  try {
    commit('cursoErrorNull')

    // const response = await axios({
    //   method: 'POST',
    //   url: 'curso',
    //   data: {
    //     // insignia: curso.insignia,
    //     rbd: curso.rbd,
    //     nombre: curso.nombre,
    //     abreviatura: curso.abreviatura,
    //     nombre_calle: curso.nombre_calle,
    //     numero_calle: curso.numero_calle,
    //     celular: curso.celular,
    //     correo: curso.correo,
    //     // estado: 'Activo',
    //   },
    // })
  } catch (e) {
    console.log('e.response.data :', e.response.data)
    commit('cursoError', e.response.data)
  }
}

export async function updateCurso({ commit }, curso) {
  try {
    commit('cursoErrorNull')
    console.log('curso :', curso)
    const response = await axios({
      method: 'PUT',
      url: `curso/${curso.id}`,
      data: {
        rbd: curso.rbd,
        nombre: curso.nombre,
        abreviatura: curso.abreviatura,
        nombre_calle: curso.nombre_calle,
        numero_calle: curso.numero_calle,
        celular: curso.celular,
        correo: curso.correo,
      },
    })
    console.log('response :', response)
  } catch (e) {
    commit('cursoError', e.response.data)
  }
}

export async function updateCursoPeriodo({ commit }, curso) {
  try {
    commit('cursoErrorNull')
    const fecha = new Date()
    const dia = fecha.getDate()
    const mes = (fecha.getMonth() + 1)
    const year = fecha.getFullYear()
    const fechaInicioPeriodoActivo = `${year}-${mes}-${dia}`
    await axios({
      method: 'PUT',
      url: `/cursos/periodoActivo/${curso.id}`,
      data: {
        idPeriodoActivo: curso.idPeriodoActivo,
        fechaInicioPeriodoActivo,
      },
    })
  } catch (e) {
    commit('cursoError', e.response.data)
  }
}

export async function updateCursoEstado({ commit, dispatch }, curso) {
  let est = ''
  try {
    commit('cursoErrorNull')
    if (curso.estado === 'Inactivo') {
      est = 'Activo'
    } else if (curso.estado === 'Activo') {
      est = 'Inactivo'
    }
    await axios({
      method: 'PUT',
      url: `/cursos/${curso.id}`,
      data: {
        nombre: curso.nombre,
        estado: est,
      },
    })
    // actualizamos lista de cursos
    dispatch('fetchCursos')
    dispatch('fetchCursosActivas')
  } catch (e) {
    commit('cursoError', e.response.data)
  }
}

export async function removeCursos({ commit, dispatch }, id) {
  try {
    await axios({
      method: 'DELETE',
      url: `/cursos/${id}`,
    })
    // actualizamos lista de cursos
    dispatch('fetchCursos')
  } catch (e) {
    commit('cursoError', e.response.data)
  }
}
