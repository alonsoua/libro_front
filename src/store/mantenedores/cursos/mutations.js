export function setCursos(state, cursos) {
  state.cursos = cursos
}

export function setCursosPersonaRol(state, cursosPersonaRol) {
  state.cursosPersonaRol = cursosPersonaRol
}

export function setCursosActivos(state, cursos) {
  state.cursosActivos = cursos
}

export function setCurso(state, curso) {
  state.selectedCurso = curso
}

export function setResponse(state, payload) {
  state.status = payload.status
  state.message = payload.message
}

export function updateCursoEstado(state, payload) {
  const curso = state.cursos.find(u => u.id === payload.id)
  if (curso) {
    state.done = !curso.done
  }
}

export function cursoError(state, payload) {
  state.error = true
  state.errorMessage = payload
  state.cursos = []
}

export function cursoErrorNull(state) {
  state.error = false
  state.errorMessage = []
}
