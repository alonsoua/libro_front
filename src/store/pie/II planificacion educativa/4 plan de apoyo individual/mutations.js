export function setPlanApoyo(state, planApoyo) {
  state.planApoyos = planApoyo
}

export function setPlanApoyoAlumnos(state, planApoyoAlumno) {
  state.planApoyosAlumnos = planApoyoAlumno
}

export function setPlanApoyoHorario(state, planApoyoHorario) {
  state.horarioSelected = planApoyoHorario
}

export function setPlanApoyoHorarios(state, planApoyoHorarios) {
  state.horarios = planApoyoHorarios
}

export function setResponse(state, payload) {
  state.status = payload.status
  state.message = payload.message
  state.dataResponse = payload.dataResponse
}

export function setResponseHorario(state, payload) {
  state.statusHorario = payload.status
  state.message = payload.message
}

export function planApoyoError(state, payload) {
  state.error = true
  state.errorMessage = payload
  state.planApoyo = []
}

export function planApoyoErrorNull(state) {
  state.error = false
  state.errorMessage = []
}
