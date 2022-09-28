export function setPanorama(state, panorama) {
  state.panorama = panorama
}


export function updatePanoramaEstado(state, payload) {
  const panorama = state.panoramas.find(u => u.id === payload.id)
  if (panorama) {
    state.done = !panorama.done
  }
}

export function panoramaError(state, payload) {
  state.error = true
  state.errorMessage = payload
  state.panoramas = []
}

export function panoramaErrorNull(state) {
  state.error = false
  state.errorMessage = []
}
