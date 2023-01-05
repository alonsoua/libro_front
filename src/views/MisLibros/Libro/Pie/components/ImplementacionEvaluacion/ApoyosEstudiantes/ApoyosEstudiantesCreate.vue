<template>
  <apoyos-estudiantes-form
    nombreModal="modal-create"
    title="Registrar apoyos para cada estudiante o grupo de estudiantes"
    :apoyo.sync="data"
    @processForm="agregar"
  />
</template>

<script>
import { mapActions } from 'vuex'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Ripple from 'vue-ripple-directive'

import ApoyosEstudiantesForm from './ApoyosEstudiantesForm.vue'

export default {
  components: {

    // COMPONENTES
    ApoyosEstudiantesForm,
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
          aula: accion.aula,
          actividades: accion.actividades,
          firma: 0,
        })
      })
      const dataRealizada = {
        observaciones: realizada.observaciones,
        id_plan_apoyo: realizada.id_plan_apoyo,
        tipo: 2, // tipo Profesional de la salud
        acciones: accionesArray,
      }

      this.createRealizada(dataRealizada).then(() => {
        const statusReuniones = store.state.III_1_b_acciones_realizadas.status
        if (statusReuniones === 'success') {
          const data = {
            idCurso: this.idCurso,
            tipo: 2, // tipo Profesional de la salud
          }
          this.fetchRealizadas(data)
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Registro de apoyos guardado 👍',
              icon: 'CheckIcon',
              text: 'El registro de apoyos fue ingresado con éxito!',
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
