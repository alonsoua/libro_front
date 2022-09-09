<template>
  <div v-if="selectedPeriodo">
    <b-overlay
      :show="spinner"
      spinner-variant="primary"
      :variant="$store.state.appConfig.layout.skin"
    >
      <periodosForm
        btnSubmit="Editar Periodo"
        :periodo="selectedPeriodo"
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

import periodosForm from './PeriodosForm.vue'

export default {
  components: {
    periodosForm,
    BOverlay,
  },
  data() {
    return {
      spinner: false,
    }
  },
  computed: {
    ...mapState('periodos', ['selectedPeriodo']),
  },
  methods: {
    ...mapActions({ updatePeriodo: 'periodos/updatePeriodo' }),
    editar(periodo) {
      this.spinner = true
      this.updatePeriodo(periodo).then(() => {
        const errorPeriodos = store.state.periodos
        const errorMessage = errorPeriodos.errorMessage.errors
        if (!errorPeriodos.error) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Periodo editado 👍',
              text: `El periodo "${periodo.nombre}" fue editado con éxito!`,
              icon: 'CheckIcon',
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
        } else if (errorPeriodos.error) {
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
