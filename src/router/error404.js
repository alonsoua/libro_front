import store from '@/store'

export default [
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/error/Error404.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login',
        })
      }
      return next()
    },
    meta: {
      layout: 'full',
    },
  },
]