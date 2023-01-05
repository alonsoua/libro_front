export default function estrategia() {
  return 0
}

export function getEstrategias(state) {
  return state.estrategias
}

export function getEstrategiasDisponibles(state) {
  // console.log('state.estrategiasDisponibles :', state.estrategiasDisponibles)
  return state.estrategiasDisponibles
}
