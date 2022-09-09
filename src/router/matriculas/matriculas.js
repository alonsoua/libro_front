import store from '@/store'

export default [
  {
    path: '/matriculas',
    name: 'matriculas',
    component: () => import('@/views/Matriculas/Matriculas.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login',
        })
      }
      return next()
    },
    meta: {
      pageTitle: 'Matrículas',
      breadcrumb: [
        {
          text: 'Crear Matrícula',
          active: true,
        },
      ],
    },
  },
]