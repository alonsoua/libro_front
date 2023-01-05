import store from '@/store'

export default [
  {
    path: '/usuarios',
    name: 'usuarios',
    component: () => import('@/views/Mantenedores/Usuarios/Usuarios.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login',
        })
      }
      return next()
    },
    meta: {
      pageTitle: 'Usuarios',
      breadcrumb: [
        {
          text: 'Usuarios',
          active: true,
        },
      ],
    },
  },
  {
    path: '/usuarios-create',
    name: 'usuarios-create',
    component: () => import('@/views/Mantenedores/Usuarios/components/UsuariosCreate.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login',
        })
      }
      return next()
    },
    meta: {
      pageTitle: 'Crear Usuario',
      breadcrumb: [
        {
          text: 'Usuarios',
          to: '/usuarios',
        },
        {
          text: 'Crear Usuario',
          active: true,
        },
      ],
    },
  },
  {
    path: '/usuarios/update',
    name: 'usuarios-update',
    component: () => import('@/views/Mantenedores/Usuarios/components/UsuariosUpdate.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login',
        })
      }
      return next()
    },
    meta: {
      pageTitle: 'Editar usuario',
      breadcrumb: [
        {
          text: 'Usuarios',
          to: '/usuarios',
        },
        {
          text: 'Editar Usuario',
          active: true,
        },
      ],
    },
  },
]