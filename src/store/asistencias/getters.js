export default function asistencia() {
  return 0
}

export function getAsistencias(state) {
  return state.asistencias
}

export function getAsistenciasMensual(state) {
  return state.asistenciasMensual
}

export function getTipoAsistencia(state) {
  return state.tipoAsistencia
}

export function getAsistenciasActivos(state) {
  return state.asistenciasActivos
}

export function getAsistenciaSelected(state) {
  return state.selectedAsistencia
}
