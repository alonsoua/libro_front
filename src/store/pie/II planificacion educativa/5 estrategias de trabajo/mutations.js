export function setEstrategia(state, estrategia) {
  state.estrategia = estrategia
}
export function setEstrategiaDetalle(state, estrategia) {
  state.estrategiaDetalle = estrategia
}

export function estrategiaError(state, payload) {
  state.error = true
  state.errorMessage = payload
  state.estrategia = []
}

export function estrategiaErrorNull(state) {
  state.error = false
  state.errorMessage = []
}
