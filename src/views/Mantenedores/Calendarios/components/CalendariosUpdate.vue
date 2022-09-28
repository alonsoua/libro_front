<template>
  <div v-if="selectedCalendario">
    <b-overlay
      :show="spinner"
      spinner-variant="primary"
      :variant="$store.state.appConfig.layout.skin"
    >
      <calendariosForm
        btnSubmit="Editar Calendario"
        :calendario="selectedCalendario"
        @processForm="editar"
      />
    </b-overlay>
  </div>
</template>

<script>

import { BOverlay } from 'bootstrap-vue'
import { mapActions, mapState } from 'vuex'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import calendariosForm from './CalendariosForm.vue'

export default {
  components: {
    calendariosForm,
    BOverlay,
  },
  data() {
    return {
      spinner: false,
    }
  },
  computed: {
    ...mapState('calendarios', ['selectedCalendario']),
  },
  methods: {
    ...mapActions({ updateCalendario: 'calendarios/updateCalendario' }),
    editar(calendario) {
      this.spinner = true
      this.updateCalendario(calendario).then(() => {
        const errorCalendarios = store.state.calendarios
        const errorMessage = errorCalendarios.errorMessage.errors
        if (!errorCalendarios.error) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Calendario editado 👍',
              text: `El calendario "${calendario.nombre}" fue actualizado con éxito!`,
              icon: 'CheckIcon',
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
        } else if (errorCalendarios.error) {
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
        this.spinner = false
      })
    },
  },
}
</script>
