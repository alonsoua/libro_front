<template>
  <b-overlay
    :show="spinner"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
  >
    <reunionesForm
      :nombreModal="modal"
      title="Editar reunión"
      :reunion.sync="data.item"
      @processForm="editar"
    />
  </b-overlay>
</template>

<script>

import { BOverlay } from 'bootstrap-vue'
import { mapActions, mapState } from 'vuex'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import reunionesForm from './ReunionesForm.vue'

export default {
  components: {
    reunionesForm,
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
      updateReunion: 'I_2_reuniones/updateReunion',
      fetchReuniones: 'I_2_reuniones/fetchReuniones',
    }),
    editar(reunion) {
      let asistentes = []
      reunion.asistentes.forEach(asistente => {
        if (typeof asistente.id === 'undefined') {
          asistentes.push(asistente)
        } else {
          asistentes.push(asistente.id)
        }
      })
      const data = {
        id: reunion.id,
        fecha: reunion.fecha,
        horario: reunion.horario,
        acuerdos: reunion.acuerdos,
        personas: asistentes,
        id_cursos: this.idCurso,
        id_periodo: 1,
      }
      this.updateReunion(data).then(() => {
        const statusReuniones = store.state.I_2_reuniones.status
        if (statusReuniones === 'success') {
          this.fetchReuniones(this.idCurso)
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
            text: store.state.I_2_reuniones.message,
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
