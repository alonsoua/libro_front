export function setActividades(state, actividades) {
  state.actividades = actividades
}

export function setResponse(state, payload) {
  state.status = payload.status
  state.message = payload.message
}

export function actividadError(state, payload) {
  state.error = true
  state.errorMessage = payload
  state.actividades = []
}

export function actividadErrorNull(state) {
  state.error = false
  state.errorMessage = []
}
