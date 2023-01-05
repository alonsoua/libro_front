import store from '@/store'

export default [
  {
    path: '/inicio',
    name: 'inicio',
    component: () => import('@/views/Inicio/Inicio.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login',
        })
      }
      return next()
    },
    meta: {
      pageTitle: 'Inicio',
      breadcrumb: [
        {
          text: 'Inicio',
          active: true,
        },
      ],
    },
  },
]