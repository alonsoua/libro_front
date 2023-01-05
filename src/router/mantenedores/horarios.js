import store from '@/store'

export default [
  {
    path: '/horarios',
    name: 'horarios',
    component: () => import('@/views/Mantenedores/Horarios/Horarios.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login',
        })
      }
      return next()
    },
    meta: {
      pageTitle: 'Horarios',
      breadcrumb: [
        {
          text: 'Horarios',
          active: true,
        },
      ],
    },
  },
  {
    path: '/horarios-create',
    name: 'horarios-create',
    component: () => import('@/views/Mantenedores/Horarios/HorariosCreate.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login',
        })
      }
      return next()
    },
    meta: {
      pageTitle: 'Crear horario',
      breadcrumb: [
        {
          text: 'Horarios',
          to: '/horarios',
        },
        {
          text: 'Crear Horario',
          active: true,
        },
      ],
    },
  },
  {
    path: '/carga-horaria',
    name: 'carga-horaria',
    component: () => import('@/views/Mantenedores/Horarios/CargaHoraria.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login',
        })
      }
      return next()
    },
    meta: {
      pageTitle: 'Configuración de carga horaria',
    },
  },
]