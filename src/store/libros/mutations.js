export function setLibros(state, libros) {
  state.libros = libros
}

export function setLibrosActivos(state, libros) {
  state.librosActivos = libros
}

export function setLibro(state, libro) {
  state.selectedLibro = libro
}

export function updateLibroEstado(state, payload) {
  const libro = state.libros.find(u => u.id === payload.id)
  if (libro) {
    state.done = !libro.done
  }
}

export function libroError(state, payload) {
  state.error = true
  state.errorMessage = payload
  state.libros = []
}

export function libroErrorNull(state) {
  state.error = false
  state.errorMessage = []
}
