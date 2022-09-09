export default [
  {
    header: 'Mantenedores',
  },
  {
    title: 'Periodos',
    route: 'periodos',
    icon: 'ClockIcon',
    // resource: 'periodos',
    // action: 'read',
  },
  {
    title: 'Servicio Local',
    route: 'sostenedores',
    icon: 'BookmarkIcon',
    // resource: 'sostenedores',
    // action: 'read',
  },
  {
    title: 'Establecimientos',
    route: 'establecimientos',
    icon: 'FlagIcon',
    // resource: 'establecimientos',
    // action: 'read',
  },
  // {
  //   title: 'Calendarios',
  //   route: 'calendarios',
  //   icon: 'CalendarIcon',
  //   // resource: 'calendarios',
  //   // action: 'read',
  // },
  // {
  //   title: 'Carga Horaria',
  //   route: 'horarios',
  //   icon: 'CalendarIcon',
  //   // resource: 'horarios',
  //   // action: 'read',
  // },
  {
    title: 'Cuentas',
    icon: 'UsersIcon',
    children: [
      {
        title: 'Cuentas de Apoderados',
        route: 'apoderados',
        icon: 'HexagonIcon',
        // resource: 'apoderados',
        // action: 'read',
      },
      {
        title: 'Cuentas de Usuarios',
        route: 'usuarios',
        icon: 'HexagonIcon',
        // resource: 'usuarios',
        // action: 'read',
      },
    ],
  },
]
