<template>
  <apoyosForm
    :title="title"
    :submitTitle="submitTitle"
    nombreModal="modal-create"
    :apoyo.sync="data"
    btnSubmit="Guardar Estrategia"
    @processForm="agregar"
  />
</template>

<script>

import { mapActions } from 'vuex'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Ripple from 'vue-ripple-directive'

import apoyosForm from './ApoyosForm.vue'

export default {
  components: {

    // COMPONENTES
    apoyosForm,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      data: {
        id_asignatura: null,
        horas_aula: 0,
        horas_fuera: 0,
        apoyos: '',
      },
    }
  },
  props: {
    idCurso: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    submitTitle: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions({
      createApoyo: 'II_2_b_apoyos/addApoyo',
      fetchApoyos: 'II_2_b_apoyos/fetchApoyos',
    }),
    agregar(apoyo) {
      this.createApoyo(apoyo).then(() => {
        const statusApoyos = store.state.II_2_b_apoyos.status
        if (statusApoyos === 'success') {
          this.fetchApoyos(this.idCurso).then(() => {
            this.cargando = false
          })
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Apoyo registrado 👍',
              icon: 'CheckIcon',
              text: 'El apoyo fue guardado con éxito!',
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
          const mensajeError = store.state.II_2_b_apoyos.message
          this.$swal({
            title: 'Error!',
            text: mensajeError,
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
