<template>
  <trabajo-familia-form
    nombreModal="modal-create"
    title="Registrar trabajo con la familia, apoderados y/o con el o la estudiante"
    :actividad.sync="data"
    @processForm="agregar"
  />
</template>

<script>
import { mapActions } from 'vuex'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Ripple from 'vue-ripple-directive'

import TrabajoFamiliaForm from './TrabajoFamiliaForm.vue'

export default {
  components: {
    // COMPONENTES
    TrabajoFamiliaForm,
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
        texto_4: actividad.texto_4,
        tipo: 1, //Tipo Actividad: Trabajo Familia
        id_curso: this.idCurso,
        personas: actividad.personas,
      }
      this.createActividad(data).then(() => {
        const statusActividades = store.state.IV_actividades.status
        if (statusActividades === 'success') {
          const data = {
            idCurso: this.idCurso,
            tipo: 1, // Tipo Trabajo Comunidad
          }
          this.fetchActividades(data)
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Trabajo guardado 👍',
              icon: 'CheckIcon',
              text: 'El trabajo fue ingresado con éxito!',
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
