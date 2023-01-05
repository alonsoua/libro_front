import axios from 'axios'

export default async function bloques() {
  return 0
}

export async function fetchBloques({ commit, dispatch }, id_curso) {
  try {
    // const { data } = await axios.get('curso')
    // console.log('id_asignatura :', id_asignatura)

    const data = [
      {
        id: 1,
        nombre: 'BLoque 1',
        horario: '09:00 - 09:45',
        dia: 28,
      },
      {
        id: 2,
        nombre: 'BLoque 2',
        horario: '09:45 - 10:30',
        dia: 28,
      },
      {
        id: 3,
        nombre: 'BLoque 3',
        horario: '10:45 - 11:30',
        dia: 28,
      },
      {
        id: 4,
        nombre: 'BLoque 4',
        horario: '11:30 - 12:15',
        dia: 28,
      },
    ]
    commit('setBloques', data)
    console.log('/bloques GET bloques por asignatura:', data)
  } catch (e) {
    commit('evaluacionError', e.response.data)
  }
}

export async function addEvaluacion({ commit }, evaluacion) {
  try {
    commit('evaluacionErrorNull')

    // const response = await axios({
    //   method: 'POST',
    //   url: 'evaluacion',
    //   data: {
    //     // insignia: evaluacion.insignia,
    //     rbd: evaluacion.rbd,
    //     nombre: evaluacion.nombre,
    //     abreviatura: evaluacion.abreviatura,
    //     nombre_calle: evaluacion.nombre_calle,
    //     numero_calle: evaluacion.numero_calle,
    //     celular: evaluacion.celular,
    //     correo: evaluacion.correo,
    //     // estado: 'Activo',
    //   },
    // })
  } catch (e) {
    console.log('e.response.data :', e.response.data)
    commit('evaluacionError', e.response.data)
  }
}

export async function updateEvaluacion({ commit }, evaluacion) {
  try {
    commit('evaluacionErrorNull')
    console.log('evaluacion :', evaluacion)
    const response = await axios({
      method: 'PUT',
      url: `evaluacion/${evaluacion.id}`,
      data: {
        rbd: evaluacion.rbd,
        nombre: evaluacion.nombre,
        abreviatura: evaluacion.abreviatura,
        nombre_calle: evaluacion.nombre_calle,
        numero_calle: evaluacion.numero_calle,
        celular: evaluacion.celular,
        correo: evaluacion.correo,
      },
    })
    console.log('response :', response)
  } catch (e) {
    commit('evaluacionError', e.response.data)
  }
}

export async function updateEvaluacionPeriodo({ commit }, evaluacion) {
  try {
    commit('evaluacionErrorNull')
    const fecha = new Date()
    const dia = fecha.getDate()
    const mes = (fecha.getMonth() + 1)
    const year = fecha.getFullYear()
    const fechaInicioPeriodoActivo = `${year}-${mes}-${dia}`
    await axios({
      method: 'PUT',
      url: `/bloques/periodoActivo/${evaluacion.id}`,
      data: {
        idPeriodoActivo: evaluacion.idPeriodoActivo,
        fechaInicioPeriodoActivo,
      },
    })
  } catch (e) {
    commit('evaluacionError', e.response.data)
  }
}

export async function updateEvaluacionEstado({ commit, dispatch }, evaluacion) {
  let est = ''
  try {
    commit('evaluacionErrorNull')
    if (evaluacion.estado === 'Inactivo') {
      est = 'Activo'
    } else if (evaluacion.estado === 'Activo') {
      est = 'Inactivo'
    }
    await axios({
      method: 'PUT',
      url: `/bloques/${evaluacion.id}`,
      data: {
        nombre: evaluacion.nombre,
        estado: est,
      },
    })
    // actualizamos lista de bloques
    dispatch('fetchBloques')
    dispatch('fetchBloquesActivas')
  } catch (e) {
    commit('evaluacionError', e.response.data)
  }
}

export async function removeBloques({ commit, dispatch }, id) {
  try {
    await axios({
      method: 'DELETE',
      url: `/bloques/${id}`,
    })
    // actualizamos lista de bloques
    dispatch('fetchBloques')
  } catch (e) {
    commit('evaluacionError', e.response.data)
  }
}
