export function setEvaluacion(state, evaluacion) {
  state.evaluaciones = evaluacion
}


export function updateEvaluacionEstado(state, payload) {
  const evaluacion = state.evaluaciones.find(u => u.id === payload.id)
  if (evaluacion) {
    state.done = !evaluacion.done
  }
}

export function evaluacionError(state, payload) {
  state.error = true
  state.errorMessage = payload
  state.evaluaciones = []
}

export function evaluacionErrorNull(state) {
  state.error = false
  state.errorMessage = []
}
