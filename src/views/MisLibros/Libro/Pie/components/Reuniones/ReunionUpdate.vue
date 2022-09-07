<template>
  <div v-if="selectedEstablecimiento">
    <b-overlay
      :show="spinner"
      spinner-variant="primary"
      :variant="$store.state.appConfig.layout.skin"
    >
      <establecimientosForm
        btnSubmit="Editar Establecimiento"
        :establecimiento="selectedEstablecimiento"
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

import establecimientosForm from './components/EstablecimientosForm.vue'

export default {
  components: {
    establecimientosForm,
    BOverlay,
  },
  data() {
    return {
      spinner: false,
    }
  },
  computed: {
    ...mapState('establecimientos', ['selectedEstablecimiento']),
  },
  methods: {
    ...mapActions({ updateEstablecimiento: 'establecimientos/updateEstablecimiento' }),
    editar(establecimiento) {
      this.spinner = true
      this.updateEstablecimiento(establecimiento).then(() => {
        const errorEstablecimientos = store.state.establecimientos
        const errorMessage = errorEstablecimientos.errorMessage.errors
        if (!errorEstablecimientos.error) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Establecimiento editado 👍',
              text: `El establecimiento "${establecimiento.nombre}" fue editado con éxito!`,
              icon: 'CheckIcon',
              variant: 'success',
            },
          },
          {
            position: 'bottom-right',
            timeout: 4000,
          })
          this.$router.replace({
            name: 'establecimientos',
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
        } else if (errorEstablecimientos.error) {
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
