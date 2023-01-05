<template>
  <evaluaciones-form
    nombreModal="modal-evaluacion-create"
    title="Crear evaluación"
    :evaluacion.sync="data"
    @processForm="agregar"
  />
</template>

<script>
import { mapActions } from 'vuex'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Ripple from 'vue-ripple-directive'

import EvaluacionesForm from './EvaluacionesForm.vue'

export default {
  components: {
    // COMPONENTES
    EvaluacionesForm,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      data: {
        contenido: '',
        id_periodo: null,
        fecha: null,
        coeficiente: null,
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
      // createReunion: 'I_2_reuniones/addReunion',
      // fetchReuniones: 'I_2_reuniones/fetchReuniones',
    }),
    agregar(evaluacion) {
      console.log('crear evaluacion :', evaluacion)
      // const data = {
      //   fecha: reunion.fecha,
      //   horario: reunion.horario,
      //   acuerdos: reunion.acuerdos,
      //   personas: reunion.asistentes,
      //   id_cursos: this.idCurso,
      //   id_periodo: 1,
      // }
      // this.createReunion(data).then(() => {
      //   const statusReuniones = store.state.I_2_reuniones.status
      //   if (statusReuniones === 'success') {
      //     this.fetchReuniones(this.idCurso)
      //     this.$toast({
      //       component: ToastificationContent,
      //       props: {
      //         title: 'Reunión guardada 👍',
      //         icon: 'CheckIcon',
      //         text: 'La reunión fue ingresada con éxito!',
      //         variant: 'success',
      //       },
      //     },
      //     {
      //       position: 'bottom-right',
      //       timeout: 4000,
      //     })
      //     this.$bvModal.hide('modal-create')
      //   }
      //   else {
      //     this.$swal({
      //       title: 'Error!',
      //       text: store.state.I_2_reuniones.message,
      //       icon: 'error',
      //       customClass: {
      //         confirmButton: 'btn btn-primary',
      //       },
      //       buttonsStyling: false,
      //     })
      //   }
      // })
    },
  },
}
</script>
