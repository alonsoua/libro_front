export function setEstablecimientos(state, establecimientos) {
  state.establecimientos = establecimientos
}

export function setEstablecimientosActivos(state, establecimientos) {
  state.establecimientosActivos = establecimientos
}

export function setEstablecimiento(state, establecimiento) {
  state.selectedEstablecimiento = establecimiento
}

export function updateEstablecimientoEstado(state, payload) {
  const establecimiento = state.establecimientos.find(u => u.id === payload.id)
  if (establecimiento) {
    state.done = !establecimiento.done
  }
}

export function establecimientoError(state, payload) {
  state.error = true
  state.errorMessage = payload
  state.establecimientos = []
}

export function establecimientoErrorNull(state) {
  state.error = false
  state.errorMessage = []
}
