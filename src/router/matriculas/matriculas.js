export default [
  {
    path: '/matriculas',
    name: 'matriculas',
    component: () => import('@/views/Matriculas/Matriculas.vue'),
    meta: {
      pageTitle: 'Matrículas',
      breadcrumb: [
        {
          text: 'Crear Matrícula',
          active: true,
        },
      ],
    },
  },
]