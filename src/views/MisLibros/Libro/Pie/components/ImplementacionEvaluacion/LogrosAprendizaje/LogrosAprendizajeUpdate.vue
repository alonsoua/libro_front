<template>
  <b-overlay
    :show="spinner"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
  >
    <logros-aprendizaje-form
      :nombreModal="modal"
      title="Editar logros de aprendizaje"
      :logros.sync="data.item"
      @processForm="editar"
    />
  </b-overlay>
</template>

<script>

import { BOverlay } from 'bootstrap-vue'
import { mapActions, mapState } from 'vuex'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import LogrosAprendizajeForm from './LogrosAprendizajeForm.vue'

export default {
  components: {
    LogrosAprendizajeForm,
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
      updateLogro: 'III_3_logros/updateLogro',
      fetchLogros: 'III_3_logros/fetchLogros',
    }),
    editar(logro) {
      const data = {
        id: this.data.item.id,
        logros: logro.logros,
        comentarios: logro.comentarios,
        id_persona_rol_alumno: logro.id_persona_rol_alumno,
        id_curso: this.idCurso,
      }
      this.updateLogro(data).then(() => {
        const statusLogros = store.state.III_3_logros.status
        if (statusLogros === 'success') {
          this.fetchLogros(this.idCurso)
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Reunión guardada 👍',
              icon: 'CheckIcon',
              text: 'La reunión fue editada con éxito!',
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
            text: store.state.III_3_logros.message,
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
