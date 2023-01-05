import axios from 'axios'

export default async function planApoyo() {
  return 0
}

export async function fetchPlanApoyos({ commit }, idCurso) {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `planapoyo/${idCurso}`,
    })
    console.log('/planapoyo PlanApoyo GET con exito...', data)
    commit('setPlanApoyo', data)
  } catch (e) {
    commit('planApoyoError', e.response.data)
  }
}

export async function fetchPlanApoyosAlumnos({ commit }, idCurso) {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `planapoyoalumno/${idCurso}`,
    })
    commit('setPlanApoyoAlumnos', data)
  } catch (e) {
    commit('planApoyoError', e.response.data)
  }
}

export async function fetchPlanApoyoHorarios({ commit }, idCurso) {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `planapoyohorario/${idCurso}`,
    })
    commit('setPlanApoyoHorarios', data)
    console.log('/planapoyohorario PlanApoyo Horarios GET con exito...', data)
  } catch (e) {
    commit('planApoyoError', e.response.data)
  }
}

export async function fetchPlanApoyoHorario({ commit }, idHorario) {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `planapoyohorarioespecifico/${idHorario}`,
    })
    commit('setPlanApoyoHorario', data[0])
    console.log('/planapoyohorarioespecifico PlanApoyo Horario GET con exito...', data[0])
  } catch (e) {
    commit('planApoyoError', e.response.data)
  }
}


export async function addPlanApoyo({ commit }, planApoyo) {
  try {
    commit('planApoyoErrorNull')
    const {data} = await axios({
      method: 'POST',
      url: 'planapoyo',
      data: {
        descripcion: planApoyo.descripcion,
        observaciones: planApoyo.observaciones,
        fecha_inicio: planApoyo.fecha_inicio,
        fecha_termino: planApoyo.fecha_termino,
        id_curso: planApoyo.id_curso,
        id_periodo: planApoyo.id_periodo,
        personas: planApoyo.personas,
      },
    })
    console.log('/planapoyo PlanApoyo CREATE exito...', data)
    commit('setResponse', data)
  } catch (e) {
    commit('planApoyoError', e.response.data)
  }
}

export async function addPlanApoyoHorario({ commit }, planApoyoHorario) {
  try {
    commit('planApoyoErrorNull')
    const {data} = await axios({
      method: 'POST',
      url: 'planapoyohorario',
      data: {
        dia: planApoyoHorario.dia,
        hora_inicio: planApoyoHorario.hora_inicio,
        hora_termino: planApoyoHorario.hora_termino,
        id_plan_apoyo_persona: planApoyoHorario.id_plan_apoyo_persona,
      },
    })
    console.log('/planapoyohhorario PlanApoyo Horario CREATE exito...', data)
    commit('setResponseHorario', data)
  } catch (e) {
    commit('planApoyoError', e.response.data)
  }
}

export async function updatePlanApoyo({ commit }, planApoyo) {
  try {
    commit('planApoyoErrorNull')
    const {data} = await axios({
      method: 'PUT',
      url: `planapoyo/${planApoyo.id}`,
      data: {
        descripcion: planApoyo.descripcion,
        observaciones: planApoyo.observaciones,
        fecha_inicio: planApoyo.fecha_inicio,
        fecha_termino: planApoyo.fecha_termino,
        id_curso: planApoyo.id_curso,
        id_periodo: planApoyo.id_periodo,
        personas: planApoyo.personas,
      },
    })
    console.log('/planapoyo UPDATE exito...', data)
  } catch (e) {
    commit('planApoyoError', e.response.data)
  }
}

export async function updatePlanApoyoHorario({ commit }, planApoyoHorario) {
  try {
    commit('planApoyoErrorNull')
    const {data} = await axios({
      method: 'PUT',
      url: `planapoyohorario/${planApoyoHorario.id}`,
      data: {
        dia: planApoyoHorario.dia,
        horas_inicio: planApoyoHorario.horas_inicio,
        hora_termino: planApoyoHorario.hora_termino,
        id_plan_apoyo: planApoyoHorario.id_plan_apoyo,
      },
    })

    if (data.message === 'Registro no encontrado') {
      dispatch('addPlanApoyoDetalle', planApoyoDetalle)
    }

    console.log('/planApoyofamiliadetalle PlanApoyo UPDATE exito...', data)
  } catch (e) {
    commit('planApoyoError', e.response.data)
  }
}

export async function removePlanApoyo({ commit, dispatch }, planApoyo) {
  try {
    await axios({
      method: 'DELETE',
      url: `/planapoyo/${planApoyo.id}`,
    })
    // actualizamos lista de planApoyo
    dispatch('fetchPlanApoyo', planApoyo.id_curso)
  } catch (e) {
    commit('planApoyoError', e.response.data)
  }
}

export async function removePlanApoyoHorario({ commit, dispatch }, planApoyoHorario) {
  try {
    await axios({
      method: 'DELETE',
      url: `/planapoyohorario/${planApoyoHorario.id}`,
    })
    // actualizamos lista de planApoyoHorario
    dispatch('fetchPlanApoyo', planApoyoHorario.id_curso)
  } catch (e) {
    commit('planApoyoError', e.response.data)
  }
}
