export function setApoyos(state, apoyo) {
  state.apoyos = apoyo
}


export function updateApoyoEstado(state, payload) {
  const apoyo = state.apoyos.find(u => u.id === payload.id)
  if (apoyo) {
    state.done = !apoyo.done
  }
}

export function setResponse(state, payload) {
  state.status = payload.status
  state.message = payload.message
}

export function apoyoError(state, payload) {
  state.error = true
  state.errorMessage = payload
  state.apoyos = []
}

export function apoyoErrorNull(state) {
  state.error = false
  state.errorMessage = []
}
