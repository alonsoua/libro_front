export function setEstrategias(state, estrategia) {
  state.estrategias = estrategia
}


export function updateEstrategiaEstado(state, payload) {
  const estrategia = state.estrategias.find(u => u.id === payload.id)
  if (estrategia) {
    state.done = !estrategia.done
  }
}

export function setResponse(state, payload) {
  state.status = payload.status
  state.message = payload.message
}

export function estrategiaError(state, payload) {
  state.error = true
  state.errorMessage = payload
  state.estrategias = []
}

export function estrategiaErrorNull(state) {
  state.error = false
  state.errorMessage = []
}
