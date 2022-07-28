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
]