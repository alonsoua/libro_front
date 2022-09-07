export default [
  {
    path: '/usuarios',
    name: 'usuarios',
    component: () => import('@/views/Mantenedores/Usuarios/Usuarios.vue'),
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
    component: () => import('@/views/Mantenedores/Usuarios/UsuariosCreate.vue'),
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
]