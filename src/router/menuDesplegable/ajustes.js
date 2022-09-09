import store from '@/store'

export default [
  {
    path: '/ajustes',
    name: 'ajustes',
    component: () => import('@/views/MenuDesplegable/Ajustes.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login',
        })
      }
      return next()
    },
    meta: {
      pageTitle: 'Ajustes',
      breadcrumb: [
        {
          text: 'Ajustes',
          active: true,
        },
      ],
    },
  },
]