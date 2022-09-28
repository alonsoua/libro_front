export function setCalendarios(state, calendarios) {
  state.calendarios = calendarios
}

export function setCalendariosActivos(state, calendarios) {
  state.calendariosActivos = calendarios
}

export function setCalendario(state, calendario) {
  state.selectedCalendario = calendario
}

export function updateCalendarioEstado(state, payload) {
  const calendario = state.calendarios.find(u => u.id === payload.id)
  if (calendario) {
    state.done = !calendario.done
  }
}

export function calendarioError(state, payload) {
  state.error = true
  state.errorMessage = payload
  state.calendarios = []
}

export function calendarioErrorNull(state) {
  state.error = false
  state.errorMessage = []
}
