// We haven't added icon's computed property because it makes this mixin coupled with UI
export const formatos = {
  data() {
    return {
      // passwordFieldType: 'password',
    }
  },
  methods: {
    formatFechaVer(fecha) {
      // EJEMPLO: Jue, 06-06-2021
      const dias = [
        'Lun',
        'Mar',
        'Mié',
        'Jue',
        'Vie',
        'Sáb',
        'Dom',
      ];

      const meses = [
        'ene',
        'feb',
        'mar',
        'abr',
        'may',
        'jun',
        'jul',
        'ago',
        'sep',
        'oct',
        'nov',
        'dic',

      ];

      const date = new Date(fecha)
      let nombreDia = dias[date.getDay()]
      let nombreMes = meses[date.getMonth()]
      const dia = date.getDate() > 9
        ? date.getDate() + 1
        : `0${date.getDate() + 1}`

      const year = date.getFullYear()

      return `${nombreDia}, ${dia} ${nombreMes} ${year}`

      // OBTIENE EL NUM DEL MES
      // const mes = (date.getMonth() + 1) > 9
      //   ? (date.getMonth() + 1)
      //   : `0${(date.getMonth() + 1)}`
    },
    formatHoraVer(date) {
      // EJEMPLO: 13:30 hrs
      const hora = date.split(':')[0]
      const minutos = date.split(':')[1]
      const horario = `${hora}:${minutos} hrs`
      return horario
    },
    formatHoraInput(date) {
      // EJEMPLO: 13:30
      const hora = date.split(':')[0]
      const minutos = date.split(':')[1]
      let horario = `${hora}:${minutos}`
      if (minutos === 'undefined') {
        horario = hora
      }
      return horario
    },
    formatSoloNumeros(number){
      const expReg = /^[0-9]+$/
      let numero
      if (number.match(expReg)){
        numero = number
      } else if (number === '') {
        numero = 0
      } else {
        numero = 0
      }

      return numero
   }
  },
}

export const _ = null
