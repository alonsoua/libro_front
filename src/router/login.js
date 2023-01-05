import store from '@/store'

export default [
  {
    path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      beforeEnter: (to, from, next) => {
        if (store.getters['auth/authenticated']) {
          return next({
            name: 'inicio',
          })
        }
        return next()
      },
      meta: {
        layout: 'full',
      },
  },

]