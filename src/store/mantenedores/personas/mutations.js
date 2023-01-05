export function setAlumnos(state, alumnos) {
  state.alumnos = alumnos
}

// export function setEstablecimientosActivos(state, establecimientos) {
//   state.establecimientosActivos = establecimientos
// }
export function setDirectivos(state, directivos) {
  state.directivos = directivos
}

export function setPersona(state, persona) {
  state.selectedPersona = persona
}

export function setParticipantesPie(state, participantesPie) {
  state.participantesPie = participantesPie
}

export function setEquipoPie(state, equipoPie) {
  state.equipoPie = equipoPie
}

export function setEquipoApoyoEspecializado(state, equipoApoyoEspecializado) {
  state.equipoApoyoEspecializado = equipoApoyoEspecializado
}

// export function updateEstablecimientoEstado(state, payload) {
//   const establecimiento = state.establecimientos.find(u => u.id === payload.id)
//   if (establecimiento) {
//     state.done = !establecimiento.done
//   }
// }

export function setResponse(state, payload) {
  state.status = payload.status
  state.message = payload.message
  state.id_persona = payload.id_persona
}

export function personaError(state, payload) {
  state.error = true
  state.errorMessage = payload
  state.personas = []
}

export function personaErrorNull(state) {
  state.error = false
  state.errorMessage = []
}
