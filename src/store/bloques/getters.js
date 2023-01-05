export default function bloque() {
  return 0
}

export function getBloques(state) {
  return state.bloques
}

export function getBloquesActivos(state) {
  return state.bloquesActivos
}

export function getBloqueSelected(state) {
  return state.selectedBloque
}
