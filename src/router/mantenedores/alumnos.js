import store from '@/store'

export default [
  {
    path: '/alumnos',
    name: 'alumnos',
    component: () => import('@/views/Mantenedores/Alumnos/Alumnos.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login',
        })
      }
      return next()
    },
    meta: {
      pageTitle: 'Alumnos',
      breadcrumb: [
        {
          text: 'Alumnos',
          active: true,
        },
      ],
    },
  },
]