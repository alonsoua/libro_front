export default [
  {
    path: '/ajustes',
    name: 'ajustes',
    component: () => import('@/views/MenuDesplegable/Ajustes.vue'),
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