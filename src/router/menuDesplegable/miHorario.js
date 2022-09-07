export default [
  {
    path: '/mi-horario',
    name: 'mi-horario',
    component: () => import('@/views/MenuDesplegable/MiHorario/MiHorario.vue'),
    meta: {
      pageTitle: 'Mi Horario',
      breadcrumb: [
        {
          text: 'Mi Horario',
          active: true,
        },
      ],
    },
  },
]