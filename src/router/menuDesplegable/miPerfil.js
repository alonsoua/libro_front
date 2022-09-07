export default [
  {
    path: '/mi-perfil',
    name: 'mi-perfil',
    component: () => import('@/views/MenuDesplegable/MiPerfil/MiPerfil.vue'),
    meta: {
      pageTitle: 'Mi Perfil',
      breadcrumb: [
        {
          text: 'Mi Perfil',
          active: true,
        },
      ],
    },
  },
]