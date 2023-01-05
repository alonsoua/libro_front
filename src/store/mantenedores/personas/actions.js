import axios from 'axios'

export default async function personas() {
  return 0
}

export async function fetchPersonas({ commit }) {
  try {
    const { data } = await axios.get('persona')
    commit('setPersonas', data)
  } catch (e) {
    commit('personaError', e.response.data)
  }
}

export async function fetchDirectivos({ commit }, id_establecimiento) {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `personadirectivo/${id_establecimiento}`,
    })
    commit('setDirectivos', data)
  } catch (e) {
    commit('personaError', e.response.data)
  }
}

export async function fetchAlumnosPie({ commit }, idCurso) {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `personaalumno/${idCurso}`,
    })
    commit('setAlumnos', data)
  } catch (e) {
    commit('personaError', e.response.data)
  }
}

export async function fetchParticipantesPie({ commit }, idCurso) {
  try {
    // const { data } = await axios.get('persona')
    const data = [
      {
        id: 21,
        id_persona_rol: 21,
        text: 'Constanza Gaete Fernandez - Apoderado',
        nombre: 'Constanza Gaete Fernandez',
        rol: 'Apoderado(a)',
      },
      {
        id: 22,
        id_persona_rol: 22,
        text: 'Nancy Romero Álvarez - Hermano(a)',
        nombre: 'Nancy Romero Álvarez',
        rol: 'Otro',
        especialidad: 'Hermano(a)',
      },
      {
        id: 23,
        id_persona_rol: 23,
        text: 'Lidia Santa Maria Ordenez - Abuelo(a)',
        nombre: 'Lidia Santa Maria Ordenez',
        rol: 'Otro',
        especialidad: 'Abuelo(a)',
      },
      {
        id: 10,
        id_persona_rol: 10,
        text: 'Juan Perez Lopez - Docente',
        nombre: 'Juan Perez Lopez',
        nombre_asignatura: 'Lenguaje y Comunicación',
        rol: 'Docente',
      },
      {
        id: 11,
        id_persona_rol: 11,
        text: 'Pedro Lazcano Rubilar - Docente',
        nombre: 'Pedro Lazcano Rubilar',
        nombre_asignatura: 'Matemáticas',
        rol: 'Docente',
      },
      {
        id: 12,
        id_persona_rol: 12,
        text: 'Paulina Rios Sanhueza - Docente',
        nombre: 'Paulina Rios Sanhueza',
        nombre_asignatura: 'Orientación',
        rol: 'Docente',
      },

      {
        id: 13,
        id_persona_rol: 13,
        text: 'Paola Vidal Henriquez - Docente',
        nombre: 'Paola Vidal Henriquez',
        nombre_asignatura: 'Orientación',
        rol: 'Docente',
      },
      {
        id: 14,
        id_persona_rol: 14,
        text: 'Natalia Barrera García - Profesor(a) de Educación Diferencial',
        nombre: 'Natalia Barrera García',
        rol: 'Profesor(a) de Educación Diferencial',
      },
      {
        id: 15,
        id_persona_rol: 15,
        text: 'Consuelo Contreras Baeza - Fonoaudióloga',
        nombre: 'Consuelo Contreras Baeza',
        rol: 'Profesional de la salud',
        especialidad: 'Fonoaudióloga',
      },
      {
        id: 16,
        id_persona_rol: 16,
        text: 'Karen Quiroga - Terapeuta ocupacional',
        nombre: 'Karen Quiroga',
        rol: 'Profesional de la salud',
        especialidad: 'Terapeuta ocupacional',
      },
      {
        id: 17,
        id_persona_rol: 18,
        text: 'Camila Rivera - Psicologa',
        nombre: 'Camila Rivera',
        rol: 'Profesional de la salud',
        especialidad: 'Psicologa',
      },
    ]
    commit('setParticipantesPie', data)
  } catch (e) {
    commit('personaError', e.response.data)
  }
}

export async function fetchEquipoPie({ commit }, idCurso) {
  try {
    // const { data } = await axios.get('persona')
    const data = [
      {
        id: 10,
        id_persona_rol: 10,
        texto: 'Juan Perez Lopez - Docente',
        nombre: 'Juan Perez Lopez',
        nombre_asignatura: 'Lenguaje y Comunicación',
        rol: 'Docente',
      },
      {
        id: 11,
        id_persona_rol: 11,
        texto: 'Pedro Lazcano Rubilar - Docente',
        nombre: 'Pedro Lazcano Rubilar',
        nombre_asignatura: 'Matemáticas',
        rol: 'Docente',
      },
      {
        id: 12,
        id_persona_rol: 12,
        texto: 'Paulina Rios Sanhueza - Docente',
        nombre: 'Paulina Rios Sanhueza',
        nombre_asignatura: 'Orientación',
        rol: 'Docente',
      },

      {
        id: 13,
        id_persona_rol: 13,
        texto: 'Paola Vidal Henriquez - Docente',
        nombre: 'Paola Vidal Henriquez',
        nombre_asignatura: 'Orientación',
        rol: 'Docente',
      },
      {
        id: 14,
        id_persona_rol: 14,
        texto: 'Natalia Barrera García - Profesor(a) de Educación Diferencial',
        nombre: 'Natalia Barrera García',
        rol: 'Profesor(a) de Educación Diferencial',
      },
      {
        id: 15,
        id_persona_rol: 15,
        texto: 'Consuelo Contreras Baeza - Fonoaudióloga',
        nombre: 'Consuelo Contreras Baeza',
        rol: 'Profesional de la salud',
        especialidad: 'Fonoaudióloga',
      },
      {
        id: 16,
        id_persona_rol: 16,
        texto: 'Karen Quiroga - Terapeuta ocupacional',
        nombre: 'Karen Quiroga',
        rol: 'Profesional de la salud',
        especialidad: 'Terapeuta ocupacional',
      },
      {
        id: 17,
        id_persona_rol: 18,
        texto: 'Camila Rivera - Psicologa',
        nombre: 'Camila Rivera',
        rol: 'Profesional de la salud',
        especialidad: 'Psicologa',
      },
      // {
      //   id: 18,
      //   id_persona_rol: 19,
      //   nombre: 'Paola Frez Ojeda',
      //   rol: 'Coordinador',
      // },
      // {
      //   id: 19,
      //   id_persona_rol: 19,
      //   nombre: 'Daniela Herrera Duarte',
      //   rol: 'Coordinador',
      // },
      // {
      //   id: 20,
      //   id_persona_rol: 20,
      //   nombre: 'Carmen Tapia Pradenas',
      //   rol: 'Coordinador',
      // },
    ]
    commit('setEquipoPie', data)
  } catch (e) {
    commit('personaError', e.response.data)
  }
}

export async function fetchEquipoApoyoEspecializado({ commit }, idCurso) {
  try {
    // const { data } = await axios.get('persona')
    const data = [
      {
        id: 10,
        id_persona_rol: 10,
        texto: 'Juan Perez Lopez - Docente',
        nombre: 'Juan Perez Lopez',
        nombre_asignatura: 'Lenguaje y Comunicación',
        rol: 'Docente',
      },
      {
        id: 11,
        id_persona_rol: 11,
        texto: 'Pedro Lazcano Rubilar - Docente',
        nombre: 'Pedro Lazcano Rubilar',
        nombre_asignatura: 'Matemáticas',
        rol: 'Docente',
      },
      {
        id: 12,
        id_persona_rol: 12,
        texto: 'Paulina Rios Sanhueza - Docente',
        nombre: 'Paulina Rios Sanhueza',
        nombre_asignatura: 'Orientación',
        rol: 'Docente',
      },

      {
        id: 13,
        id_persona_rol: 13,
        texto: 'Paola Vidal Henriquez - Docente',
        nombre: 'Paola Vidal Henriquez',
        nombre_asignatura: 'Orientación',
        rol: 'Docente',
      },
      {
        id: 14,
        id_persona_rol: 14,
        texto: 'Natalia Barrera García - Profesor(a) de Educación Diferencial',
        nombre: 'Natalia Barrera García',
        rol: 'Profesor(a) de Educación Diferencial',
      },
      {
        id: 15,
        id_persona_rol: 15,
        texto: 'Consuelo Contreras Baeza - Fonoaudióloga',
        nombre: 'Consuelo Contreras Baeza',
        rol: 'Profesional de la salud',
        especialidad: 'Fonoaudióloga',
      },
      {
        id: 16,
        id_persona_rol: 16,
        texto: 'Karen Quiroga - Terapeuta ocupacional',
        nombre: 'Karen Quiroga',
        rol: 'Profesional de la salud',
        especialidad: 'Terapeuta ocupacional',
      },
      {
        id: 17,
        id_persona_rol: 18,
        texto: 'Camila Rivera - Psicologa',
        nombre: 'Camila Rivera',
        rol: 'Profesional de la salud',
        especialidad: 'Psicologa',
      },
    ]
    commit('setEquipoApoyoEspecializado', data)
  } catch (e) {
    commit('personaError', e.response.data)
  }
}

export async function addPersona({ commit }, persona) {
  try {
    commit('personaErrorNull')
    const { data } = await axios({
      method: 'POST',
      url: 'persona',
      data: {
        rut: persona.rut,
        dv: persona.dv,
        nombre: persona.nombre,
        primer_apellido: persona.primer_apellido,
        segundo_apellido: persona.segundo_apellido,
        nombre_calle: persona.nombre_calle,
        numero_calle: persona.numero,

        block: persona.block,
        departamento: persona.departamento,

        celular: persona.celular,
        correo: persona.correo,
        id_rol: persona.id_rol,
        id_establecimiento: persona.id_establecimiento,
        // estado: 1,
      },
    })
    commit('setResponse', data)
  } catch (e) {
    commit('personaError', e.response.data)
  }
}

export async function updatePersona({ commit }, persona) {
  try {
    commit('personaErrorNull')
    const { data } = await axios({
      method: 'PUT',
      url: `persona/${persona.id}`,
      data: {
        rut: persona.rut,
        dv: persona.dv,
        nombre: persona.nombre,
        primer_apellido: persona.primer_apellido,
        segundo_apellido: persona.segundo_apellido,
        nombre_calle: persona.nombre_calle,
        numero_calle: persona.numero,

        block: persona.block,
        departamento: persona.departamento,

        celular: persona.celular,
        correo: persona.correo,
        id_rol: persona.id_rol,
        id_establecimiento: persona.id_establecimiento,
      },
    })
    console.log('/persona update :', data)
    commit('setResponse', data)
  } catch (e) {
    commit('personaError', e.response.data)
  }
}

export async function updatePersonaPeriodo({ commit }, persona) {
  try {
    commit('personaErrorNull')
    const fecha = new Date()
    const dia = fecha.getDate()
    const mes = (fecha.getMonth() + 1)
    const year = fecha.getFullYear()
    const fechaInicioPeriodoActivo = `${year}-${mes}-${dia}`
    await axios({
      method: 'PUT',
      url: `/personas/periodoActivo/${persona.id}`,
      data: {
        idPeriodoActivo: persona.idPeriodoActivo,
        fechaInicioPeriodoActivo,
      },
    })
  } catch (e) {
    commit('personaError', e.response.data)
  }
}

export async function updatePersonaEstado({ commit, dispatch }, persona) {
  let est = ''
  try {
    commit('personaErrorNull')
    if (persona.estado === 'Inactivo') {
      est = 'Activo'
    } else if (persona.estado === 'Activo') {
      est = 'Inactivo'
    }
    await axios({
      method: 'PUT',
      url: `/personas/${persona.id}`,
      data: {
        nombre: persona.nombre,
        estado: est,
      },
    })
    // actualizamos lista de personas
    dispatch('fetchPersonas')
    dispatch('fetchPersonasActivas')
  } catch (e) {
    commit('personaError', e.response.data)
  }
}

export async function removePersonas({ commit, dispatch }, id) {
  try {
    await axios({
      method: 'DELETE',
      url: `/personas/${id}`,
    })
    // actualizamos lista de personas
    dispatch('fetchPersonas')
  } catch (e) {
    commit('personaError', e.response.data)
  }
}
