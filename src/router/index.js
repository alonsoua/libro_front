import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
// import { canNavigate } from '@/libs/acl/routeProtection'
// import { isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser } from '@/auth/utils'

// Menu Desplegable
import miPerfil from './menuDesplegable/miPerfil'
import miHorario from './menuDesplegable/miHorario'
// Menu
import inicio from './inicio/inicio'
import libros from './libros/libros'
import matriculas from './matriculas/matriculas'
// Mantenedor
import alumnos from './mantenedores/alumnos'
import establecimientos from './mantenedores/establecimientos'
import calendarios from './mantenedores/calendarios'
import periodos from './mantenedores/periodos'
import horarios from './mantenedores/horarios'
import usuarios from './mantenedores/usuarios'
// Acceso
import login from './login'
import error from './error404'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    // Acceso
    ...login,
    ...error,
    // Menu Desplegable
    ...miPerfil,
    ...miHorario,
    // Menu
    ...inicio,
    ...libros,
    ...matriculas,
    // Mantenedor
    ...alumnos,
    ...establecimientos,
    ...calendarios,
    ...periodos,
    ...horarios,
    ...usuarios,
    {
      path: '*',
      redirect: 'inicio',
    },
  ],
})

// console.log('router :', router)
// router.beforeEnter ((to, from, next) => {
//   console.log('store.getters[auth/authenticated] :', store.getters['auth/authenticated'])
//   if (!store.getters['auth/authenticated']) {
//     return next({
//       name: 'login',
//     })
//   }
//   return next()
// })
// router.beforeEach((to, _, next) => {
//   const isLoggedIn = isUserLoggedIn()

//   if (!canNavigate(to)) {
//     // Redirect to login if not logged in
//     if (!isLoggedIn) return next({ name: 'auth-login' })

//     // If logged in => not authorized
//     return next({ name: 'misc-not-authorized' })
//   }

//   // Redirect if logged in
//   if (to.meta.redirectIfLoggedIn && isLoggedIn) {
//     const userData = getUserData()
//     next(getHomeRouteForLoggedInUser(userData ? userData.role : null))
//   }

//   return next()
// })
// ? For splash screen
// Remove afterEach hook if you are not using splash screen
// router.afterEach(() => {
//   localStorage.setItem('userData', JSON.stringify(store.getters['auth/user']))
//   // Remove initial loading
//   const appLoading = document.getElementById('loading-bg')
//   if (appLoading) {
//     appLoading.style.display = 'none'
//   }
// })

router.afterEach(() => {
  // console.log('ROUTER GET authenticated:', router)
  localStorage.setItem('userData', JSON.stringify(store.getters['auth/user']))
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})


export default router
