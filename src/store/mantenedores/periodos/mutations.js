export function setPeriodos(state, periodos) {
  state.periodos = periodos
}

export function setPeriodosActivos(state, periodos) {
  state.periodosActivos = periodos
}

export function setPeriodo(state, periodo) {
  state.selectedPeriodo = periodo
}

export function updatePeriodoEstado(state, payload) {
  const periodo = state.periodos.find(u => u.id === payload.id)
  if (periodo) {
    state.done = !periodo.done
  }
}

export function periodoError(state, payload) {
  state.error = true
  state.errorMessage = payload
  state.periodos = []
}

export function periodoErrorNull(state) {
  state.error = false
  state.errorMessage = []
}
