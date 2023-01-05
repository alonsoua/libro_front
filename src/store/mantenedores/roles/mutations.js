export function setRoles(state, roles) {
  state.roles = roles
}

export function setRol(state, rol) {
  state.selectedRol = rol
}

export function rolError(state, payload) {
  state.error = true
  state.errorMessage = payload
  state.roles = []
}

export function rolErrorNull(state) {
  state.error = false
  state.errorMessage = []
}
