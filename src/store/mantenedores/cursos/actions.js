import axios from 'axios'

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

export async function fetchCursosEstablecimiento({ commit }, id_establecimiento) {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `cursoEstablecimiento/${id_establecimiento}`,
    })
    commit('setCursos', data)
  } catch (e) {
    commit('cursoError', e.response.data)
  }
}

export async function fetchCursosPersonaRol({ commit }) {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `cursospersonarol`,
    })
    commit('setCursosPersonaRol', data)
  } catch (e) {
    commit('cursoError', e.response.data)
  }
}

export async function addCursoPersona({ commit, dispatch }, datos) {
  try {
    commit('cursoErrorNull')

    const {
      id_persona_rol,
      id_cursos,
      pie,
    } = datos

    const { data } = await axios({
      method: 'POST',
      url: 'cursopersona',
      data: {
        id_persona_rol,
        id_cursos,
        pie,
      },
    })

    commit('setResponse', data)
    dispatch('fetchCursosPersonaRol')
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

export async function removeCursoPersona({ commit, dispatch }, id_curso_rol) {
  try {
    const {data} = await axios({
      method: 'DELETE',
      url: `/cursopersona/${id_curso_rol}`,
    })
    // actualizamos lista de cursos
    dispatch('fetchCursosPersonaRol')
  } catch (e) {
    commit('cursoError', e.response.data)
  }
}
