export function setReuniones(state, reuniones) {
  state.reuniones = reuniones
}

export function setResponse(state, payload) {
  state.status = payload.status
  state.message = payload.message
}

export function reunionError(state, payload) {
  state.error = true
  state.errorMessage = payload
  state.reunions = []
}

export function reunionErrorNull(state) {
  state.error = false
  state.errorMessage = []
}
