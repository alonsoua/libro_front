import store from '@/store'

export default [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    beforeEnter: (to, from, next) => {
      console.log('store.getters[auth/authenticated] :', store.getters['auth/authenticated'])
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login',
        })
      }
      return next()
    },
    meta: {
      pageTitle: 'Home',
      breadcrumb: [
        {
          text: 'Home',
          active: true,
        },
      ],
    },
  },
]