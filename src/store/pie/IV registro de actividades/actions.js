import axios from 'axios'

export default async function actividades() {
  return 0
}

export async function fetchActividades({ commit, dispatch }, datos) {
  try {
    const {
      idCurso,
      tipo
    } = datos
    const { data } = await axios({
      method: 'GET',
      url: `registroactividadcurso/${idCurso}/${tipo}`,
    })
    console.log('/registroactividadcurso Actividades de coordinación GET con exito... ', data)
    commit('setActividades', data)
  } catch (e) {
    commit('actividadError', e.response.data)
  }
}

export async function addActividad({ commit }, actividad) {
  try {
    commit('actividadErrorNull')
    const { data } = await axios({
      method: 'POST',
      url: 'registroactividad',
      data: {
        fecha: actividad.fecha,
        texto_1: actividad.texto_1,
        texto_2: actividad.texto_2,
        texto_3: actividad.texto_3,
        texto_4: actividad.texto_4,
        tipo: actividad.tipo,
        id_curso: actividad.id_curso,
        personas: actividad.personas,
      },
    })
    commit('setResponse', data)
  } catch (e) {
    commit('actividadError', e.response.data)
  }
}

export async function updateActividad({ commit }, actividad) {
  try {
    commit('actividadErrorNull')
    const { data } = await axios({
      method: 'PUT',
      url: `registroactividad/${actividad.id}`,
      data: {
        fecha: actividad.fecha,
        texto_1: actividad.texto_1,
        texto_2: actividad.texto_2,
        texto_3: actividad.texto_3,
        texto_4: actividad.texto_4,
        tipo: actividad.tipo,
        id_curso: actividad.id_curso,
        personas: actividad.personas,
      },
    })
    commit('setResponse', data)
  } catch (e) {
    commit('actividadError', e.response.data)
  }
}

export async function removeActividad({ commit, dispatch }, id) {
  try {
    await axios({
      method: 'DELETE',
      url: `registroactividad/${id}`,
    })
  } catch (e) {
    commit('actividadError', e.response.data)
  }
}
