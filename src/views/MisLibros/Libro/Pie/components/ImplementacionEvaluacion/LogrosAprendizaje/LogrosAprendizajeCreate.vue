<template>
  <logros-aprendizaje-form
    nombreModal="modal-create"
    title="Registrar logros de aprendizaje"
    :logros.sync="data"
    @processForm="agregar"
  />
</template>

<script>
import { mapActions } from 'vuex'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Ripple from 'vue-ripple-directive'

import LogrosAprendizajeForm from './LogrosAprendizajeForm.vue'

export default {
  components: {
    // COMPONENTES
    LogrosAprendizajeForm,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      data: {
        id_persona: '',
        logros: '',
        comentarios: '',
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
      createLogro: 'III_3_logros/addLogro',
      fetchLogros: 'III_3_logros/fetchLogros',
    }),
    agregar(logros) {
      const data = {
        logros: logros.logros,
        comentarios: logros.comentarios,
        id_persona_rol_alumno: logros.id_persona_rol_alumno,
        id_curso: this.idCurso,
      }
      this.createLogro(data).then(() => {
        const statusLogros = store.state.III_3_logros.status
        if (statusLogros === 'success') {
          this.fetchLogros(this.idCurso)
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Logro de aprendizaje guardado 👍',
              icon: 'CheckIcon',
              text: 'El logro de aprendizaje fue ingresado con éxito!',
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
