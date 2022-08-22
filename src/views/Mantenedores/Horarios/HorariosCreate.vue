<template>
  <horarioForm
    btnSubmit="Crear Horario"
    :horario="data"
    @processForm="agregar"
  />
</template>

<script>

import { mapActions } from 'vuex'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import horarioForm from './components/HorariosForm.vue'

export default {
  components: {
    horarioForm,
  },
  data() {
    return {
      data: {
        curso: '',
        profesorJefe: '',
        estado: null,
      },
    }
  },
  methods: {
    ...mapActions({ createHorario: 'horarios/addHorarios' }),
    agregar(horario) {
      this.createHorario(horario).then(() => {
        const errorHorarios = store.state.horarios
        const errorMessage = errorHorarios.errorMessage.errors
        if (!errorHorarios.error) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Horario creado 👍',
              icon: 'CheckIcon',
              text: `El horario "${horario.nombre}" fue creado con éxito!`,
              variant: 'success',
            },
          },
          {
            position: 'bottom-right',
            timeout: 4000,
          })
          this.$router.replace({
            name: 'horarios',
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
