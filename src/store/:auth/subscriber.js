import store from '@/store'
import axios from 'axios'

store.subscribe(mutation => {
  switch (mutation.type) {
    case 'auth/SET_TOKEN':
      if (mutation.payload) {
        // Agrega el token cuando está logueado
        axios.defaults.headers.common.Authorization = `Bearer ${mutation.payload}`
        localStorage.setItem('token', mutation.payload)
      } else {
        // Elimina el token cuando está logueado
        axios.defaults.headers.common.Authorization = null
        localStorage.removeItem('token')
      }
      break
    case 'auth/SET_USER':

      if (mutation.payload) {
        // Agrega el token cuando está logueado
        // axios.defaults.headers.common.Authorization = `Bearer ${mutation.payload}`
        localStorage.setItem('userData', mutation.payload)
      } else {
        // Elimina el token cuando está logueado
        // axios.defaults.headers.common.Authorization = null
        localStorage.removeItem('userData')
      }
      break
    default:
      break
  }
})
