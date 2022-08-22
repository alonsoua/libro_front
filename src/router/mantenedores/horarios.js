export default [
  {
    path: '/horarios',
    name: 'horarios',
    component: () => import('@/views/Mantenedores/Horarios/Horarios.vue'),
    meta: {
      pageTitle: 'Horarios',
      breadcrumb: [
        {
          text: 'Horarios',
          active: true,
        },
      ],
    },
  },
  {
    path: '/horarios-create',
    name: 'horarios-create',
    component: () => import('@/views/Mantenedores/Horarios/HorariosCreate.vue'),
    meta: {
      pageTitle: 'Crear horario',
      breadcrumb: [
        {
          text: 'Horarios',
          to: '/horarios',
        },
        {
          text: 'Crear Horario',
          active: true,
        },
      ],
    },
  },
]