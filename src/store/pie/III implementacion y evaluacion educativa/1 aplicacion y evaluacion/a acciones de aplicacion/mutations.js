export function setAplicaciones(state, aplicacion) {
  state.aplicaciones = aplicacion
}

export function setResponse(state, payload) {
  state.status = payload.status
  state.message = payload.message
}

export function aplicacionError(state, payload) {
  state.error = true
  state.errorMessage = payload
  state.aplicaciones = []
}

export function aplicacionErrorNull(state) {
  state.error = false
  state.errorMessage = []
}
