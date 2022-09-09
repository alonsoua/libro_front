import store from '@/store'

export default [
  {
    path: '/mi-horario',
    name: 'mi-horario',
    component: () => import('@/views/MenuDesplegable/MiHorario/MiHorario.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login',
        })
      }
      return next()
    },
    meta: {
      pageTitle: 'Mi Horario',
      breadcrumb: [
        {
          text: 'Mi Horario',
          active: true,
        },
      ],
    },
  },
]