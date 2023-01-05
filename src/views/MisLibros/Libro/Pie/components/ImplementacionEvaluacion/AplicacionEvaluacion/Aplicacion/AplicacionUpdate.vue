<template>
  <b-overlay
    :show="spinner"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
  >
    <aplicacionForm
      :nombreModal="modal"
      title="Editar la acción de aplicación de las estrategias diversificadas planificadas"
      :aplicacion="data.item"
      @processForm="editar"
    />
  </b-overlay>
</template>

<script>
import { BOverlay } from 'bootstrap-vue'
import { mapActions, mapState } from 'vuex'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import aplicacionForm from './AplicacionForm.vue'

export default {
  components: {
    BOverlay,
    aplicacionForm,
  },
  data() {
    return {
      spinner: false,
    }
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    idCurso: {
      type: Number,
      required: true,
    },
    modal: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions({
      updateAplicacion: 'III_1_a_acciones_de_aplicacion/updateAplicacion',
      fetchAplicaciones: 'III_1_a_acciones_de_aplicacion/fetchAplicaciones',
    }),
    editar(aplicacion) {
      const data = {
        id: aplicacion.id,
        acciones: aplicacion.acciones,
        evaluacion: aplicacion.evaluacion,
        id_detalle_estrategia: aplicacion.id_detalle_estrategia,
      }
      this.updateAplicacion(data).then(() => {
        const statusAplicacion = store.state.III_1_a_acciones_de_aplicacion.status
        if (statusAplicacion === 'success') {
          this.fetchAplicaciones(this.idCurso)
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Acción guardada 👍',
              icon: 'CheckIcon',
              text: 'La acción fue editada con éxito!',
              variant: 'success',
            },
          },
          {
            position: 'bottom-right',
            timeout: 4000,
          })
          this.$bvModal.hide(this.modal)
        }
        else {
          this.$swal({
            title: 'Error!',
            text: 'Error',
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
