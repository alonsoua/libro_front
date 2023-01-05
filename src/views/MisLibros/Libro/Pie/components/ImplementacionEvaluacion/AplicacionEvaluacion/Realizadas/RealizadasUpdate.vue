<template>
  <b-overlay
    :show="spinner"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
  >
    <realizadasForm
      :nombreModal="modal"
      title="Editar registro de acciones realizadas por el profesor o profesora de aula"
      :realizadas.sync="data.item"
      @processForm="editar"
    />
  </b-overlay>
</template>

<script>

import { BOverlay } from 'bootstrap-vue'
import { mapActions, mapState } from 'vuex'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import realizadasForm from './RealizadasForm.vue'

export default {
  components: {
    realizadasForm,
    BOverlay,
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
      updateRealizada: 'III_1_b_acciones_realizadas/updateRealizada',
      fetchRealizadas: 'III_1_b_acciones_realizadas/fetchRealizadas',
    }),
    editar(realizada, acciones) {
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
        id: realizada.id,
        observaciones: realizada.observaciones,
        id_plan_apoyo: realizada.id_plan_apoyo,
        tipo: 1, // tipo profesor de aula
        acciones: accionesArray,
      }
      this.updateRealizada(dataRealizada).then(() => {
        const statusRealizadas = store.state.III_1_b_acciones_realizadas.status
        if (statusRealizadas === 'success') {
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
              text: 'El registro de acciones fue editado con éxito!',
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
