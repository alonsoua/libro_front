import store from '@/store'

export default [
  {
    path: '/calendarios',
    name: 'calendarios',
    component: () => import('@/views/Mantenedores/Calendarios/Calendarios.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login',
        })
      }
      return next()
    },
    meta: {
      pageTitle: 'Calendarios',
      breadcrumb: [
        {
          text: 'Calendarios',
          active: true,
        },
      ],
    },
  },
  {
    path: '/calendarios-create',
    name: 'calendarios-create',
    component: () => import('@/views/Mantenedores/Calendarios/components/CalendariosCreate.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login',
        })
      }
      return next()
    },
    meta: {
      pageTitle: 'Crear Calendario',
      breadcrumb: [
        {
          text: 'Calendarios',
          to: '/calendarios',
        },
        {
          text: 'Crear Calendario',
          active: true,
        },
      ],
    },
  },
  {
    path: '/calendarios/update',
    name: 'calendarios-update',
    component: () => import('@/views/Mantenedores/Calendarios/components/CalendariosUpdate.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login',
        })
      }
      return next()
    },
    meta: {
      pageTitle: 'Editar calendario',
      breadcrumb: [
        {
          text: 'Calendarios',
          to: '/calendarios',
        },
        {
          text: 'Editar Calendario',
          active: true,
        },
      ],
    },
  },
]