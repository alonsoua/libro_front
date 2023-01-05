export function setNotas(state, notas) {
  state.notas = notas
}

export function setNotasActivos(state, notas) {
  state.notasActivos = notas
}

export function setNota(state, nota) {
  state.selectedNota = nota
}

export function updateNotaEstado(state, payload) {
  const nota = state.notas.find(u => u.id === payload.id)
  if (nota) {
    state.done = !nota.done
  }
}

export function notaError(state, payload) {
  state.error = true
  state.errorMessage = payload
  state.notas = []
}

export function notaErrorNull(state) {
  state.error = false
  state.errorMessage = []
}
