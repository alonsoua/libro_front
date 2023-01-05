export function setBloques(state, bloques) {
  state.bloques = bloques
}

export function setBloquesActivos(state, bloques) {
  state.bloquesActivos = bloques
}

export function setEvaluacion(state, bloque) {
  state.selectedEvaluacion = bloque
}

export function updateEvaluacionEstado(state, payload) {
  const bloque = state.bloques.find(u => u.id === payload.id)
  if (bloque) {
    state.done = !bloque.done
  }
}

export function bloqueError(state, payload) {
  state.error = true
  state.errorMessage = payload
  state.bloques = []
}

export function bloqueErrorNull(state) {
  state.error = false
  state.errorMessage = []
}
