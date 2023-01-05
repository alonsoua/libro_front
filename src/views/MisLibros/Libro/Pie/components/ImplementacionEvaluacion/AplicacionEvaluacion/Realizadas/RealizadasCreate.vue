<template>
  <realizadasForm
    nombreModal="modal-create"
    title="Registrar acciones realizadas por el profesor o profesora de aula"
    :realizadas.sync="data"
    @processForm="agregar"
  />
</template>

<script>
import { mapActions } from 'vuex'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Ripple from 'vue-ripple-directive'

import realizadasForm from './RealizadasForm.vue'

export default {
  components: {

    // COMPONENTES
    realizadasForm,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      data: {
        planApoyo: null,
        observaciones: '',
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
      createRealizada: 'III_1_b_acciones_realizadas/addRealizada',
      createAccion: 'III_1_b_acciones_realizadas/addAccion',
      fetchRealizadas: 'III_1_b_acciones_realizadas/fetchRealizadas',
    }),
    agregar(realizada, acciones) {

      let accionesArray = []
      acciones.forEach(accion => {
        accionesArray.push({
          fecha: accion.fecha,
          horas: accion.horas,
          aula: 1,
          actividades: accion.actividades,
          firma: 0,
        })
      })
      const dataRealizada = {
        observaciones: realizada.observaciones,
        id_plan_apoyo: realizada.id_plan_apoyo,
        tipo: 1, // tipo profesor de aula
        acciones: accionesArray,
      }

      this.createRealizada(dataRealizada).then(() => {
        const statusReuniones = store.state.III_1_b_acciones_realizadas.status
        if (statusReuniones === 'success') {
          const data = {
            idCurso: this.idCurso,
            tipo: 1, // tipo profesor de aula
          }
          this.fetchRealizadas(data)
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Registro de acciones guardado 👍',
              icon: 'CheckIcon',
              text: 'El registro de acciones realizadas fue ingresado con éxito!',
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
            text: store.state.III_1_b_acciones_realizadas.message,
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
