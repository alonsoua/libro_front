export default function libro() {
  return 0
}

export function getLibros(state) {
  return state.libros
}

export function getLibrosActivos(state) {
  return state.librosActivos
}

export function getLibroSelected(state) {
  return state.selectedLibro
}
