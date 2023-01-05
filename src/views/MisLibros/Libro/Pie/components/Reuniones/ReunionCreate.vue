<template>
  <reunion-form
    nombreModal="modal-create"
    title="Registrar reunión"
    :actividad.sync="data"
    @processForm="agregar"
  />
</template>

<script>
import { mapActions } from 'vuex'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Ripple from 'vue-ripple-directive'

import ReunionForm from './ReunionForm.vue'

export default {
  components: {
    // COMPONENTES
    ReunionForm,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      data: {
        alumnos: [],
        objetivos: '',
        actividades: [],
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
      createActividad: 'IV_actividades/addActividad',
      fetchActividades: 'IV_actividades/fetchActividades',
    }),
    agregar(actividad) {
      const data = {
        fecha: actividad.fecha,
        texto_1: actividad.texto_1,
        texto_2: actividad.texto_2,
        texto_3: actividad.texto_3,
        texto_4: null,
        tipo: 3,
        id_curso: this.idCurso,
        personas: actividad.personas,
      }
      this.createActividad(data).then(() => {
        const statusActividades = store.state.IV_actividades.status
        if (statusActividades === 'success') {
          const data = {
            idCurso: this.idCurso,
            tipo: 3, // Tipo Reunion
          }
          this.fetchActividades(data)
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Reunión guardada 👍',
              icon: 'CheckIcon',
              text: 'La reunión fue ingresada con éxito!',
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
            text: store.state.IV_actividades.message,
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
