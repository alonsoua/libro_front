<template>
  <aplicacionForm
    nombreModal="modal-create"
    title="Registro de acciones de aplicación de las estrategias diversificadas planificadas"
    :aplicacion="data"
    @processForm="agregar"
  />
</template>

<script>
import { mapActions } from 'vuex'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Ripple from 'vue-ripple-directive'

import aplicacionForm from './AplicacionForm.vue'

export default {
  components: {
    // COMPONENTES
    aplicacionForm,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      data: {
        acciones: '',
        evaluacion: '',
        id_detalle_estrategia: '',
      },
    }
  },
  props: {
    idCurso: {
      type: Number,
      required: true,
    },
  },
  methods: {
    ...mapActions({
      addAplicacion: 'III_1_a_acciones_de_aplicacion/addAplicacion',
      fetchAplicaciones: 'III_1_a_acciones_de_aplicacion/fetchAplicaciones',
    }),
    agregar(aplicacion) {
      const data = {
        acciones: aplicacion.acciones,
        evaluacion: aplicacion.evaluacion,
        id_detalle_estrategia: aplicacion.id_detalle_estrategia,
      }
      this.addAplicacion(data).then(() => {
        const statusAplicaciones = store.state.III_1_a_acciones_de_aplicacion.status
        if (statusAplicaciones === 'success') {
          this.fetchAplicaciones(this.idCurso)
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Acción guardada 👍',
              icon: 'CheckIcon',
              text: 'La acción fue ingresada con éxito!',
              variant: 'success',
            },
          },
          {
            position: 'bottom-right',
            timeout: 4000,
          })
          this.$bvModal.hide('modal-create')
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
