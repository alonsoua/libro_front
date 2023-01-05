import axios from 'axios'
import store from '@/store/index'

export default async function notas() {
  return 0
}

export async function fetchNotas({ commit, dispatch }, id_asignatura) {
  try {
    // const { data } = await axios.get('curso')
    // console.log('id_asignatura :', id_asignatura)
    const data = [
      {
        num_lista: 1,
        id_alumno: 1,
        nombre_completo: 'ISIDORA NOEMI ALVAREZ AGUIRRE',
        notas: [
          {
            id: 1,
            id_evaluacion: 1,
            nota: 50,
          },
          {
            id: 2,
            id_evaluacion: 2,
            nota: 60,
          },
        ],
        promedio_primer: 55,
        // promedio_segundo: '0',
        promedio_final: 55,
      },
      {
        num_lista: 2,
        id_alumno: 2,
        nombre_completo: 'JULIÁN ALONSO BRAVO CERDA',
        notas: [
          {
            id: 3,
            id_evaluacion: 1,
            nota: 60,
          },
          {
            id: 4,
            id_evaluacion: 2,
            nota: 40,
          },
        ],
        promedio_primer: 50,
        // promedio_segundo: '0',
        promedio_final: 50,
      },
      {
        num_lista: 3,
        id_alumno: 3,
        nombre_completo: 'JUAN CARLOS CISTERNAS CESPED',
        notas: [
          {
            id: 5,
            id_evaluacion: 1,
            nota: 50,
          },
          {
            id: 6,
            id_evaluacion: 2,
            nota: 40,
          },
        ],
        promedio_primer: 45,
        // promedio_segundo: '0',
        promedio_final: 45,
      },
      {
        num_lista: 4,
        id_alumno: 4,
        nombre_completo: 'DIEGO ANDRES DIAZ RODRIGUEZ',
        notas: [
          {
            id: 7,
            id_evaluacion: 1,
            nota: 43,
          }
        ],
        promedio_primer: 43,
        // promedio_segundo: '0',
        promedio_final: 43,
      },
    ]
    commit('setNotas', data)
    console.log('/notas GET notas por asignatura:', data)
  } catch (e) {
    commit('notaError', e.response.data)
  }
}

export async function fetchNotasUser({ commit }, idUsuario) {
  try {
    // const { data } = await axios.get('curso')
    const { data } = await axios({
      method: 'GET',
      url: `curso/${idUsuario}`,
    })
    commit('setNotas', data)
    console.log('/curso/${idUsuario} GET cursos por usuario:', data)
  } catch (e) {
    commit('notaError', e.response.data)
  }
}

export async function addNota({ commit }, nota) {
  try {
    commit('notaErrorNull')

    // const response = await axios({
    //   method: 'POST',
    //   url: 'nota',
    //   data: {
    //     // insignia: nota.insignia,
    //     rbd: nota.rbd,
    //     nombre: nota.nombre,
    //     abreviatura: nota.abreviatura,
    //     nombre_calle: nota.nombre_calle,
    //     numero_calle: nota.numero_calle,
    //     celular: nota.celular,
    //     correo: nota.correo,
    //     // estado: 'Activo',
    //   },
    // })
  } catch (e) {
    console.log('e.response.data :', e.response.data)
    commit('notaError', e.response.data)
  }
}

export async function updateNota({ commit }, nota) {
  try {
    commit('notaErrorNull')
    console.log('nota :', nota)
    const response = await axios({
      method: 'PUT',
      url: `nota/${nota.id}`,
      data: {
        rbd: nota.rbd,
        nombre: nota.nombre,
        abreviatura: nota.abreviatura,
        nombre_calle: nota.nombre_calle,
        numero_calle: nota.numero_calle,
        celular: nota.celular,
        correo: nota.correo,
      },
    })
    console.log('response :', response)
  } catch (e) {
    commit('notaError', e.response.data)
  }
}

export async function updateNotaPeriodo({ commit }, nota) {
  try {
    commit('notaErrorNull')
    const fecha = new Date()
    const dia = fecha.getDate()
    const mes = (fecha.getMonth() + 1)
    const year = fecha.getFullYear()
    const fechaInicioPeriodoActivo = `${year}-${mes}-${dia}`
    await axios({
      method: 'PUT',
      url: `/notas/periodoActivo/${nota.id}`,
      data: {
        idPeriodoActivo: nota.idPeriodoActivo,
        fechaInicioPeriodoActivo,
      },
    })
  } catch (e) {
    commit('notaError', e.response.data)
  }
}

export async function updateNotaEstado({ commit, dispatch }, nota) {
  let est = ''
  try {
    commit('notaErrorNull')
    if (nota.estado === 'Inactivo') {
      est = 'Activo'
    } else if (nota.estado === 'Activo') {
      est = 'Inactivo'
    }
    await axios({
      method: 'PUT',
      url: `/notas/${nota.id}`,
      data: {
        nombre: nota.nombre,
        estado: est,
      },
    })
    // actualizamos lista de notas
    dispatch('fetchNotas')
    dispatch('fetchNotasActivas')
  } catch (e) {
    commit('notaError', e.response.data)
  }
}

export async function removeNotas({ commit, dispatch }, id) {
  try {
    await axios({
      method: 'DELETE',
      url: `/notas/${id}`,
    })
    // actualizamos lista de notas
    dispatch('fetchNotas')
  } catch (e) {
    commit('notaError', e.response.data)
  }
}
