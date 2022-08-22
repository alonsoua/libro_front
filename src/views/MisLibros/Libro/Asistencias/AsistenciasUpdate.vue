<template>
  <div v-if="selectedAsistencia">
    <b-overlay
      :show="spinner"
      spinner-variant="primary"
      :variant="$store.state.appConfig.layout.skin"
    >
      <asistenciasForm
        btnSubmit="Editar Asistencia"
        :asistencia="selectedAsistencia"
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

import asistenciasForm from './components/AsistenciasForm.vue'

export default {
  components: {
    asistenciasForm,
    BOverlay,
  },
  data() {
    return {
      spinner: false,
    }
  },
  computed: {
    ...mapState('asistencias', ['selectedAsistencia']),
  },
  methods: {
    ...mapActions({ updateAsistencia: 'asistencias/updateAsistencia' }),
    editar(asistencia) {
      this.spinner = true
      this.updateAsistencia(asistencia).then(() => {
        const errorAsistencias = store.state.asistencias
        const errorMessage = errorAsistencias.errorMessage.errors
        if (!errorAsistencias.error) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Asistencia editado 👍',
              text: `El asistencia "${asistencia.nombre}" fue editado con éxito!`,
              icon: 'CheckIcon',
              variant: 'success',
            },
          },
          {
            position: 'bottom-right',
            timeout: 4000,
          })
          this.$router.replace({
            name: 'asistencias',
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
        } else if (errorAsistencias.error) {
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
