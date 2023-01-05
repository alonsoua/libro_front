export function setAdecuacion(state, adecuacion) {
  state.adecuaciones = adecuacion
}


export function updateAdecuacionEstado(state, payload) {
  const adecuacion = state.adecuaciones.find(u => u.id === payload.id)
  if (adecuacion) {
    state.done = !adecuacion.done
  }
}

export function adecuacionError(state, payload) {
  state.error = true
  state.errorMessage = payload
  state.adecuaciones = []
}

export function adecuacionErrorNull(state) {
  state.error = false
  state.errorMessage = []
}
