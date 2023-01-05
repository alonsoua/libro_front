export default function evaluacion() {
  return 0
}

export function getEvaluaciones(state) {
  return state.evaluaciones
}

export function getEvaluacionesActivos(state) {
  return state.evaluacionesActivos
}

export function getEvaluacionSelected(state) {
  return state.selectedEvaluacion
}
