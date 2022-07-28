export default [
  {
    path: '/establecimientos',
    name: 'establecimientos',
    component: () => import('@/views/Mantenedores/Establecimientos/Establecimientos.vue'),
    meta: {
      pageTitle: 'Establecimientos',
      breadcrumb: [
        {
          text: 'Establecimientos',
          active: true,
        },
      ],
    },
  },
  {
    path: '/establecimientos-create',
    name: 'establecimientos-create',
    component: () => import('@/views/Mantenedores/Establecimientos/EstablecimientosCreate.vue'),
    meta: {
      pageTitle: 'Establecimientos',
      breadcrumb: [
        {
          text: 'Establecimientos',
          active: true,
        },
      ],
    },
  },
]