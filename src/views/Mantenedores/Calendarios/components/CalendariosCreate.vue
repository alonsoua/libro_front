<template>
  <calendarioForm
    btnSubmit="Crear Calendario"
    :calendario="data"
    @processForm="agregar"
  />
</template>

<script>

import { mapActions } from 'vuex'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import calendarioForm from './CalendariosForm.vue'

export default {
  components: {
    calendarioForm,
  },
  data() {
    return {
      data: {
        codigo_calendario: '',
        periodo_escolar: '2022',
        fecha_inicio: '',
        fecha_termino: '',
        id_establecimiento: '',
        id_director: '',
      },
    }
  },
  methods: {
    ...mapActions({ addCalendario: 'calendarios/addCalendario' }),
    agregar(calendario) {
      this.addCalendario(calendario).then(() => {
        const errorCalendarios = store.state.calendarios
        const errorMessage = errorCalendarios.errorMessage.errors
        if (!errorCalendarios.error) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Calendario creado 👍',
              icon: 'CheckIcon',
              text: `El calendario "${calendario.nombre}" fue guardado con éxito!`,
              variant: 'success',
            },
          },
          {
            position: 'bottom-right',
            timeout: 3000,
          })
          // this.$router.replace({
          //   name: 'calendarios',
          // })
        } else if (errorMessage.nombre) {
          this.$swal({
            title: 'Error!',
            text: `${errorMessage.nombre[0]}!`,
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        } else {
          this.$swal({
            title: 'Error!',
            text: 'Ingreso de datos fraudulento!',
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        }
      })
    },
  },
}
</script>
