export default [
  {
    path: '/periodos',
    name: 'periodos',
    component: () => import('@/views/Mantenedores/Periodos/Periodos.vue'),
    meta: {
      pageTitle: 'Periodos',
      breadcrumb: [
        {
          text: 'Periodos',
          active: true,
        },
      ],
    },
  },
  {
    path: '/periodos-create',
    name: 'periodos-create',
    component: () => import('@/views/Mantenedores/Periodos/PeriodosCreate.vue'),
    meta: {
      pageTitle: 'Crear periodo',
      breadcrumb: [
        {
          text: 'Periodos',
          to: '/periodos',
        },
        {
          text: 'Crear Periodo',
          active: true,
        },
      ],
    },
  },
]