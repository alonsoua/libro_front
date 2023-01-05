// We haven't added icon's computed property because it makes this mixin coupled with UI
export const formatos = {
  data() {
    return {
      // passwordFieldType: 'password',
    }
  },
  methods: {
    formatHTMLSweetEliminar(modulo, texto, info) {
      const infoDiv = info !== '' && typeof info !== 'undefined'
        ? `<div
            class="text-secondary mb-75"
            style="font-size: 1.1rem;"
          >
           Info: "${info}"
          </div>`
        : ''
      const textoDiv = texto !== '' && typeof texto !== 'undefined'
        ? `<spam
            class="text-secondary"
            style="font-size: 1.1rem;"
          >
            "${texto}"
          </spam>`
        : ''
      const moduloDiv = modulo !== '' && typeof modulo !== 'undefined'
          ? `<p class="text-center mb-50">
              ¿Está seguro(a) de eliminar ${modulo}?
            </p>`
          : ''
      return `
      <div class="mt-75 mb-75">
        ${infoDiv}
        ${moduloDiv}
        ${textoDiv}
      </div>
      `
    },
    formatHTMLSweetInfo(modulo, info) {

      const infoDiv = info !== ''
        ? `<i
            class="text-secondary"
            style="font-size: 1rem;"
          >
            Info: "${info}"
          </i>`
        : ''
      return `
        <div class="mt-75 mb-50">
          ${infoDiv}
          <p class="mb-1 mt-1 text-center">
            ¿Está seguro(a) de actualizar ${modulo}?
          </p>
        </div>
      `
    },
    formatFechaVerCompleto(fecha) {
      // EJEMPLO: Jue, 06-06-2021
      const dias = [
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
        'Domingo',
      ];

      const meses = [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciciembre',

      ];

      const date = new Date(fecha)
      let nombreDia = dias[date.getDay()]
      let nombreMes = meses[date.getMonth()]

      const dia = date.getDate() + 1 > 9
        ? date.getDate() + 1
        : `0${date.getDate() + 1}`

      const year = date.getFullYear()

      return `${nombreDia} ${dia} ${nombreMes} del ${year}`

      // OBTIENE EL NUM DEL MES
      // const mes = (date.getMonth() + 1) > 9
      //   ? (date.getMonth() + 1)
      //   : `0${(date.getMonth() + 1)}`
    },
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
      const dia = date.getDate() + 1 > 9
        ? date.getDate() + 1
        : `0${date.getDate() + 1}`

      const year = date.getFullYear()

      return `${nombreDia}, ${dia} ${nombreMes} ${year}`

      // OBTIENE EL NUM DEL MES
      // const mes = (date.getMonth() + 1) > 9
      //   ? (date.getMonth() + 1)
      //   : `0${(date.getMonth() + 1)}`
    },
    formatoFechaCalendar(fecha, hora) {
      const date = new Date(fecha)
      const mes = date.getMonth() > 8
        ? date.getMonth() + 1
        : `0${date.getMonth() + 1}`
      const dia = date.getDate() + 1 > 9
        ? date.getDate() + 1
        : `0${date.getDate() + 1}`

      const year = date.getFullYear()

      return `${year}-${mes}-${dia} ${hora}`
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
    },
    formatSoloNumerosUnDigito(number){
      let unDigito = 0
      unDigito = number[0] > 8 ? '8' : number[0]
      const expReg = /^[0-9]+$/
      let numero
      if (typeof unDigito === 'undefined' || unDigito === '' || unDigito === null) {
        numero = '0'
      } else if (unDigito.match(expReg)){
        numero = unDigito
      } else {
        numero = '0'
      }

      return numero
    },
    formatSoloNumerosMaxLenght(number, max){
      const expReg = /^[0-9]*(\.?)[ 0-9]+$/
      const lengthCorte = max
      let numero
      if (number.match(expReg)){
        numero = number.substring(0, lengthCorte)
      } else {
        numero = number.substring(0, number.length - 1)
        const ultimoCaracter = number.substring(number.length -2, number.length -1)
        if (ultimoCaracter === "`"
          || ultimoCaracter === "´"
          || ultimoCaracter === "¨"
          || ultimoCaracter === "^") {
          numero = numero.substring(0, numero.length - 1)
        }
      }
      return numero
    },
    formatNota(n){
      const number = String(n)
      const expReg = /^[0-9]+$/
      let numero = Number
      if (number.match(expReg)){
        numero = number
      } else if (number === '') {
        numero = 0
      } else {
        numero = 0
      }

      if (numero.length > 2) {
        numero = numero[0]+''+numero[1]
      } else if (numero > 70) {
        numero = 70
      }

      return numero
    },
    formatColor(nota) {
      if (nota > 9 && nota < 40) {
        this.textColor = 'text-danger'
      } else if (nota > 39 && nota < 71){
        this.textColor = 'text-primary'
      }
    },
  },
}

export const _ = null
