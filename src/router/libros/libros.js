import store from '@/store'

export default [
  {
    path: '/mis-libros',
    name: 'mis-libros',
    component: () => import('@/views/MisLibros/MisLibros.vue'),
    beforeEnter: (to, from, next) => {
      console.log('store.getters[auth/authenticated] :', store.getters['auth/authenticated'])
      if (!store.getters['auth/authenticated']) {
        console.log('1 :', 1)
        return next({
          name: 'login',
        })
      }
      return next()
    },
    meta: {
      pageTitle: 'Mis Libros',
      breadcrumb: [
        {
          text: 'Mis Libros',
          active: true,
        },
      ],
    },
  },

  // Finalmente será como el update
  {
    path: '/mis-libros/:id/libro',
    name: 'libro',
    component: () => import('@/views/MisLibros/Libro.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login',
        })
      }
      return next()
    },
    meta: {
      pageTitle: '',
      configs: false,
      breadcrumb: [
        {
          text: 'Mis Libros',
          to: '/mis-libros',
        },
        {
          text: 'Libro Abierto',
          active: true,
          configs: true,
          optionsConfigs: [
            {
              to: 'config-curso',
              txtBtn: 'Configurar Curso',
              icon: 'ToolIcon',
            },
            {
              to: 'config-asignaturas',
              txtBtn: 'Configurar Asignaturas',
              icon: 'ToolIcon',
            },
            {
              to: 'config-promedios',
              txtBtn: 'Configurar Promedios',
              icon: 'ToolIcon',
            },
          ]
        },
      ],
    },
  },
]