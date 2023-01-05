export function setRealizadas(state, realizada) {
  state.realizadas = realizada
}


export function updateRealizadaEstado(state, payload) {
  const realizada = state.realizadas.find(u => u.id === payload.id)
  if (realizada) {
    state.done = !realizada.done
  }
}

export function setResponse(state, payload) {
  state.status = payload.status
  state.message = payload.message
}

export function realizadasError(state, payload) {
  state.error = true
  state.errorMessage = payload
  state.realizadas = []
}

export function realizadasErrorNull(state) {
  state.error = false
  state.errorMessage = []
}
