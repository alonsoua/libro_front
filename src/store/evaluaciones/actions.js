import axios from 'axios'

export default async function evaluaciones() {
  return 0
}

export async function fetchEvaluaciones({ commit, dispatch }, id_asignatura) {
  try {
    // const { data } = await axios.get('curso')
    // console.log('id_asignatura :', id_asignatura)

    const data = [
      {
        id: 1,
        contenido: 'Test de lectura',
        id_periodo: 1,
        fecha: '2022-04-11',
        coeficiente: 1,
      },
      {
        id: 2,
        contenido: 'Test de escritura',
        id_periodo: 1,
        fecha: '2022-04-21',
        coeficiente: 1,
      },
      {
        id: 3,
        contenido: 'Lectura',
        id_periodo: 1,
        fecha: '2022-05-01',
        coeficiente: 1,
      },
    ]
    commit('setEvaluaciones', data)
    console.log('/evaluaciones GET evaluaciones por asignatura:', data)
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
      url: `/evaluaciones/periodoActivo/${evaluacion.id}`,
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
      url: `/evaluaciones/${evaluacion.id}`,
      data: {
        nombre: evaluacion.nombre,
        estado: est,
      },
    })
    // actualizamos lista de evaluaciones
    dispatch('fetchEvaluaciones')
    dispatch('fetchEvaluacionesActivas')
  } catch (e) {
    commit('evaluacionError', e.response.data)
  }
}

export async function removeEvaluaciones({ commit, dispatch }, id) {
  try {
    await axios({
      method: 'DELETE',
      url: `/evaluaciones/${id}`,
    })
    // actualizamos lista de evaluaciones
    dispatch('fetchEvaluaciones')
  } catch (e) {
    commit('evaluacionError', e.response.data)
  }
}
