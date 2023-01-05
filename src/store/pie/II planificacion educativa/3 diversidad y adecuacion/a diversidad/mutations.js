export function setDiversidad(state, diversidad) {
  state.diversidades = diversidad
}


export function updateDiversidadEstado(state, payload) {
  const diversidad = state.diversidades.find(u => u.id === payload.id)
  if (diversidad) {
    state.done = !diversidad.done
  }
}

export function diversidadError(state, payload) {
  state.error = true
  state.errorMessage = payload
  state.diversidades = []
}

export function diversidadErrorNull(state) {
  state.error = false
  state.errorMessage = []
}
