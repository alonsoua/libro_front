import axios from 'axios'

export default async function libros() {
  return 0
}

export async function fetchLibros({ commit }) {
  try {
    const { data } = await axios.get('curso')
    commit('setLibros', data)
  } catch (e) {
    commit('libroError', e.response.data)
  }
}

export async function fetchLibrosUser({ commit }, idUsuario) {
  try {
    // const { data } = await axios.get('curso')
    const { data } = await axios({
      method: 'GET',
      url: `curso/${idUsuario}`,
    })
    commit('setLibros', data)
  } catch (e) {
    commit('libroError', e.response.data)
  }
}

export async function addLibro({ commit }, libro) {
  try {
    commit('libroErrorNull')

    // const response = await axios({
    //   method: 'POST',
    //   url: 'libro',
    //   data: {
    //     // insignia: libro.insignia,
    //     rbd: libro.rbd,
    //     nombre: libro.nombre,
    //     abreviatura: libro.abreviatura,
    //     nombre_calle: libro.nombre_calle,
    //     numero_calle: libro.numero_calle,
    //     celular: libro.celular,
    //     correo: libro.correo,
    //     // estado: 'Activo',
    //   },
    // })
  } catch (e) {
    console.log('e.response.data :', e.response.data)
    commit('libroError', e.response.data)
  }
}

export async function updateLibro({ commit }, libro) {
  try {
    commit('libroErrorNull')
    console.log('libro :', libro)
    const response = await axios({
      method: 'PUT',
      url: `libro/${libro.id}`,
      data: {
        rbd: libro.rbd,
        nombre: libro.nombre,
        abreviatura: libro.abreviatura,
        nombre_calle: libro.nombre_calle,
        numero_calle: libro.numero_calle,
        celular: libro.celular,
        correo: libro.correo,
      },
    })
    console.log('response :', response)
  } catch (e) {
    commit('libroError', e.response.data)
  }
}

export async function updateLibroPeriodo({ commit }, libro) {
  try {
    commit('libroErrorNull')
    const fecha = new Date()
    const dia = fecha.getDate()
    const mes = (fecha.getMonth() + 1)
    const year = fecha.getFullYear()
    const fechaInicioPeriodoActivo = `${year}-${mes}-${dia}`
    await axios({
      method: 'PUT',
      url: `/libros/periodoActivo/${libro.id}`,
      data: {
        idPeriodoActivo: libro.idPeriodoActivo,
        fechaInicioPeriodoActivo,
      },
    })
  } catch (e) {
    commit('libroError', e.response.data)
  }
}

export async function updateLibroEstado({ commit, dispatch }, libro) {
  let est = ''
  try {
    commit('libroErrorNull')
    if (libro.estado === 'Inactivo') {
      est = 'Activo'
    } else if (libro.estado === 'Activo') {
      est = 'Inactivo'
    }
    await axios({
      method: 'PUT',
      url: `/libros/${libro.id}`,
      data: {
        nombre: libro.nombre,
        estado: est,
      },
    })
    // actualizamos lista de libros
    dispatch('fetchLibros')
    dispatch('fetchLibrosActivas')
  } catch (e) {
    commit('libroError', e.response.data)
  }
}

export async function removeLibros({ commit, dispatch }, id) {
  try {
    await axios({
      method: 'DELETE',
      url: `/libros/${id}`,
    })
    // actualizamos lista de libros
    dispatch('fetchLibros')
  } catch (e) {
    commit('libroError', e.response.data)
  }
}
