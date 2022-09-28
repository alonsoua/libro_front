import axios from 'axios'
import { LCircle } from 'vue2-leaflet'

export default async function panoramas() {
  return 0
}

export async function fetchPanorama({ commit }, idCurso) {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `estrategia/${idCurso}`,
    })
    commit('setPanorama', data)
  } catch (e) {
    commit('panoramaError', e.response.data)
  }
}

export async function addPanorama({ commit }, panorama) {
  try {
    commit('panoramaErrorNull')
    await axios({
      method: 'POST',
      url: 'estrategia',
      data: {
        // insignia: panorama.insignia,
        id_curso: panorama.idCurso,
        estilo: panorama.estilo,
        fortaleza: panorama.fortaleza,
        necesidad: panorama.necesidad,
      },
    })
    console.log('Panorama creado con exito...')
  } catch (e) {
    commit('panoramaError', e.response.data)
  }
}

export async function updatePanorama({ commit }, panorama) {
  try {
    commit('panoramaErrorNull')
    await axios({
      method: 'PUT',
      url: `estrategia/${panorama.id}`,
      data: {
        id_curso: panorama.idCurso,
        estilo: panorama.estilo,
        fortaleza: panorama.fortaleza,
        necesidad: panorama.necesidad,
      },
    })
    console.log('Panorama actualizado con exito...')
  } catch (e) {
    commit('panoramaError', e.response.data)
  }
}
