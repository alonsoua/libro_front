export default [
  {
    path: '/mis-libros',
    name: 'mis-libros',
    component: () => import('@/views/MisLibros/MisLibros.vue'),
    meta: {
      pageTitle: 'Mis Libros',
      breadcrumb: [
        {
          text: 'Mis Libros',
          active: true,
        },
      ],
    },
  },
]