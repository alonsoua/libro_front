import axios from 'axios'

export default async function horarios() {
  return 0
}

export async function fetchHorarioUsuarioCurso({ commit }, id_curso) {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `horariousuariocurso/${id_curso}`,
    })
    commit('setHorarios', data)
    console.log('/horariousuariocurso fetch horario usuario curso:', data)
  } catch (e) {
    commit('setHorarios', e.response.data)
  }
}

export async function addHorario({ commit }, horario) {
  try {
    // commit('horarioErrorNull')
    const { data } = await axios({
      method: 'POST',
      url: 'horario',
      data: {
        rut: horario.rut,
        dv: horario.dv,
        nombre: horario.nombre,
        primer_apellido: horario.primer_apellido,
        segundo_apellido: horario.segundo_apellido,
        nombre_calle: horario.nombre_calle,
        numero_calle: horario.numero,

        block: horario.block,
        departamento: horario.departamento,

        celular: horario.celular,
        correo: horario.correo,
        id_rol: horario.id_rol,
        id_establecimiento: horario.id_establecimiento,
        // estado: 1,
      },
    })
    commit('setResponse', data)
  } catch (e) {
    commit('horarioError', e.response.data)
  }
}

export async function updateHorario({ commit }, horario) {
  try {
    commit('horarioErrorNull')
    const { data } = await axios({
      method: 'PUT',
      url: `horario/${horario.id}`,
      data: {
        rut: horario.rut,
        dv: horario.dv,
        nombre: horario.nombre,
        primer_apellido: horario.primer_apellido,
        segundo_apellido: horario.segundo_apellido,
        nombre_calle: horario.nombre_calle,
        numero_calle: horario.numero,

        block: horario.block,
        departamento: horario.departamento,

        celular: horario.celular,
        correo: horario.correo,
        id_rol: horario.id_rol,
        id_establecimiento: horario.id_establecimiento,
      },
    })
    console.log('/horario update :', data)
    commit('setResponse', data)
  } catch (e) {
    commit('horarioError', e.response.data)
  }
}

export async function removeHorarios({ commit, dispatch }, id) {
  try {
    await axios({
      method: 'DELETE',
      url: `/horarios/${id}`,
    })
    // actualizamos lista de horarios
    dispatch('fetchHorarios')
  } catch (e) {
    commit('horarioError', e.response.data)
  }
}
