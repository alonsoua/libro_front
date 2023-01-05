export default function nota() {
  return 0
}

export function getNotas(state) {
  return state.notas
}

export function getNotasActivos(state) {
  return state.notasActivos
}

export function getNotaSelected(state) {
  return state.selectedNota
}
