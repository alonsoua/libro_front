import store from '@/store'

export default [
  {
    path: '/establecimientos',
    name: 'establecimientos',
    component: () => import('@/views/Mantenedores/Establecimientos/Establecimientos.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login',
        })
      }
      return next()
    },
    meta: {
      pageTitle: 'Establecimientos',
      breadcrumb: [
        {
          text: 'Establecimientos',
          active: true,
        },
      ],
    },
  },
  {
    path: '/establecimientos-create',
    name: 'establecimientos-create',
    component: () => import('@/views/Mantenedores/Establecimientos/components/EstablecimientosCreate.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login',
        })
      }
      return next()
    },
    meta: {
      pageTitle: 'Crear Establecimiento',
      breadcrumb: [
        {
          text: 'Establecimientos',
          to: '/establecimientos',
        },
        {
          text: 'Crear Establecimiento',
          active: true,
        },
      ],
    },
  },
  {
    path: '/establecimientos/update',
    name: 'establecimientos-update',
    component: () => import('@/views/Mantenedores/Establecimientos/components/EstablecimientosUpdate.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login',
        })
      }
      return next()
    },
    meta: {
      pageTitle: 'Editar establecimiento',
      breadcrumb: [
        {
          text: 'Establecimientos',
          to: '/establecimientos',
        },
        {
          text: 'Editar Establecimiento',
          active: true,
        },
      ],
    },
  },
]