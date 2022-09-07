// We haven't added icon's computed property because it makes this mixin coupled with UI
export const rut = {
  data() {
    return {
      // passwordFieldType: 'password',
    }
  },
  methods: {
    formatRut:(rut)=>{
      // XX.XXX.XXX-X
      let newRut = rut.replace(/\./g,'').replace(/\-/g, '').trim().toLowerCase();
      if (newRut.length > 9) {
        newRut = newRut.substr(0, newRut.length-1)
      }

      let lastDigit = newRut.substr(-1, 1);
      const rutDigit = newRut.substr(0, newRut.length-1)

      let format = '';
      for (let i = rutDigit.length; i > 0; i--) {
        const e = rutDigit.charAt(i-1);
        format = e.concat(format);
        if (i % 3 === 0){
          format = '.'.concat(format);
        }
      }
      var soloNumeros = /^[0-9]+$/;
      var soloK =/^[k]+$/

      if (!lastDigit.match(soloNumeros)) {
        if (!lastDigit.match(soloK)) {
          lastDigit = lastDigit.replace(lastDigit, '')
        }
      }
      const rutFormateado = format.concat('-').concat(lastDigit)
      return rutFormateado === '-' ? '' : rutFormateado
    },
  },
}

export const _ = null
