<template>
  <periodoForm
    btnSubmit="Crear Periodo"
    :periodo="data"
    @processForm="agregar"
  />
</template>

<script>

import { mapActions } from 'vuex'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import periodoForm from './components/PeriodosForm.vue'

export default {
  components: {
    periodoForm,
  },
  data() {
    return {
      data: {
        periodo: '',
        estado: null,
      },
    }
  },
  methods: {
    ...mapActions({ createPeriodo: 'periodos/addPeriodos' }),
    agregar(periodo) {
      this.createPeriodo(periodo).then(() => {
        const errorPeriodos = store.state.periodos
        const errorMessage = errorPeriodos.errorMessage.errors
        if (!errorPeriodos.error) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Periodo creado 👍',
              icon: 'CheckIcon',
              text: `El periodo "${periodo.nombre}" fue creado con éxito!`,
              variant: 'success',
            },
          },
          {
            position: 'bottom-right',
            timeout: 4000,
          })
          this.$router.replace({
            name: 'periodos',
          })
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
