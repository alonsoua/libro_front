export function setAsistencias(state, asistencias) {
  state.asistencias = asistencias
}

export function setAsistenciasActivos(state, asistencias) {
  state.asistenciasActivos = asistencias
}

export function setAsistencia(state, asistencia) {
  state.selectedAsistencia = asistencia
}

export function setResponse(state, payload) {
  state.status = payload.status
  state.message = payload.message
}

export function setAsistenciasMensual(state, asistenciasMensual) {
  state.asistenciasMensual = asistenciasMensual
}

export function setTipoAsistencia(state, tipoAsistencia) {
  state.tipoAsistencia = tipoAsistencia
}

export function updateAsistenciaEstado(state, payload) {
  const asistencia = state.asistencias.find(u => u.id === payload.id)
  if (asistencia) {
    state.done = !asistencia.done
  }
}

export function asistenciaError(state, payload) {
  state.error = true
  state.errorMessage = payload
  state.asistencias = []
}

export function asistenciaErrorNull(state) {
  state.error = false
  state.errorMessage = []
}
