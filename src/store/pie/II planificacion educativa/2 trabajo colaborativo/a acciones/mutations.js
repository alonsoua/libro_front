export function setAcciones(state, accion) {
  state.acciones = accion
}


export function updateAccionEstado(state, payload) {
  const accion = state.acciones.find(u => u.id === payload.id)
  if (accion) {
    state.done = !accion.done
  }
}

export function accionError(state, payload) {
  state.error = true
  state.errorMessage = payload
  state.acciones = []
}

export function accionErrorNull(state) {
  state.error = false
  state.errorMessage = []
}
