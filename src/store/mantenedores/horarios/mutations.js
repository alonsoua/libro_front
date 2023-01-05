export function setHorarios(state, horarios) {
  state.horarios = horarios
}

export function setResponse(state, payload) {
  state.status = payload.status
  state.message = payload.message
  state.id_persona = payload.id_persona
}
