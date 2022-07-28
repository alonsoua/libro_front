export default [
  {
    path: '/',
    name: 'inicio',
    component: () => import('@/views/Inicio/Inicio.vue'),
    meta: {
      pageTitle: 'Inicio',
      breadcrumb: [
        {
          text: 'Inicio',
          active: true,
        },
      ],
    },
  },
]