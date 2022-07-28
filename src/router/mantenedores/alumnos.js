export default [
  {
    path: '/alumnos',
    name: 'alumnos',
    component: () => import('@/views/Mantenedores/Alumnos/Alumnos.vue'),
    meta: {
      pageTitle: 'Alumnos',
      breadcrumb: [
        {
          text: 'Alumnos',
          active: true,
        },
      ],
    },
  },
]