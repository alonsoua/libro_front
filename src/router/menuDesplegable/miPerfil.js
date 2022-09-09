import store from '@/store'

export default [
  {
    path: '/mi-perfil',
    name: 'mi-perfil',
    component: () => import('@/views/MenuDesplegable/MiPerfil/MiPerfil.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login',
        })
      }
      return next()
    },
    meta: {
      pageTitle: 'Mi Perfil',
      breadcrumb: [
        {
          text: 'Mi Perfil',
          active: true,
        },
      ],
    },
  },
]