export function setUsuarios(state, usuarios) {
  state.usuarios = usuarios
}

export function setResponse(state, payload) {
  state.status = payload.status
  state.message = payload.message
}

export function usuarioError(state, payload) {
  state.error = true
  state.errorMessage = payload
  state.usuarios = []
}

export function usuarioErrorNull(state) {
  state.error = false
  state.errorMessage = []
}
