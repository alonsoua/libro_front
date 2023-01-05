export function setLogros(state, logros) {
  state.logros = logros
}

export function setResponse(state, payload) {
  state.status = payload.status
  state.message = payload.message
}

export function logroError(state, payload) {
  state.error = true
  state.errorMessage = payload
  state.logros = []
}

export function logroErrorNull(state) {
  state.error = false
  state.errorMessage = []
}
