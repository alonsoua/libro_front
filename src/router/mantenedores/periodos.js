import store from '@/store'

export default [
  {
    path: '/periodos',
    name: 'periodos',
    component: () => import('@/views/Mantenedores/Periodos/Periodos.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login',
        })
      }
      return next()
    },
    meta: {
      pageTitle: 'Periodos',
      breadcrumb: [
        {
          text: 'Periodos',
          active: true,
        },
      ],
    },
  },
  {
    path: '/periodos-create',
    name: 'periodos-create',
    component: () => import('@/views/Mantenedores/Periodos/components/PeriodosCreate.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login',
        })
      }
      return next()
    },
    meta: {
      pageTitle: 'Crear periodo',
      breadcrumb: [
        {
          text: 'Periodos',
          to: '/periodos',
        },
        {
          text: 'Crear Periodo',
          active: true,
        },
      ],
    },
  },
]