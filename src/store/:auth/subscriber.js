import store from '@/store'
import axios from 'axios'


store.subscribe(mutation => {
  if (mutation.payload === 'Unauthorized') {
    // console.log('- Unauthorized -', mutation)
    // return
    localStorage.removeItem('userData')
    store.dispatch('auth/signOut')
  } else {
    // console.log('- Authorized -', mutation)
  }
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
  }
})
