export function setAsignaturas(state, asignaturas) {
  state.asignaturas = asignaturas
}

export function setAsignaturasActivos(state, asignaturas) {
  state.asignaturasActivos = asignaturas
}

export function setAsignatura(state, asignatura) {
  state.selectedAsignatura = asignatura
}

export function setAsignaturasCurso(state, asignaturasCurso) {
  state.asignaturasCurso = asignaturasCurso
}


export function updateAsignaturaEstado(state, payload) {
  const asignatura = state.asignaturas.find(u => u.id === payload.id)
  if (asignatura) {
    state.done = !asignatura.done
  }
}

export function asignaturaError(state, payload) {
  state.error = true
  state.errorMessage = payload
  state.asignaturas = []
}

export function asignaturaErrorNull(state) {
  state.error = false
  state.errorMessage = []
}
