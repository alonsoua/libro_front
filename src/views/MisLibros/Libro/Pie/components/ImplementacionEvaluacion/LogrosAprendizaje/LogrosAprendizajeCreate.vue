<template>

  <b-modal
    id="modal-create"
    :title="title"
    :ok-title="submitTitle"
    cancel-title="Cancelar"
    cancel-variant="outline-secondary"
    size="xl"
    no-close-on-backdrop
    centered
    @ok="agregar"
  >
    <logros-aprendizaje-form
      :logros.sync="data"
      @processForm="agregar"
    />
  </b-modal>
</template>

<script>
import {
  BModal, VBModal
} from 'bootstrap-vue'
import { mapActions } from 'vuex'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Ripple from 'vue-ripple-directive'

import LogrosAprendizajeForm from './LogrosAprendizajeForm.vue'

export default {
  components: {
    // ETIQUETAS
    BModal,
    VBModal,

    // COMPONENTES
    LogrosAprendizajeForm,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      data: {
        estudiantes: [],
        logros: '',
        comentarios: '',
      },
    }
  },
  props: {
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
    // ...mapActions({ createEstablecimiento: 'establecimientos/addEstablecimientos' }),
    agregar() {
      console.log('reunion :', this.data)
      // this.createEstablecimiento(establecimiento).then(() => {
      //   const errorEstablecimientos = store.state.establecimientos
      //   const errorMessage = errorEstablecimientos.errorMessage.errors
      //   if (!errorEstablecimientos.error) {
      //     this.$toast({
      //       component: ToastificationContent,
      //       props: {
      //         title: 'Establecimiento creado 👍',
      //         icon: 'CheckIcon',
      //         text: `El establecimiento "${establecimiento.nombre}" fue creado con éxito!`,
      //         variant: 'success',
      //       },
      //     },
      //     {
      //       position: 'bottom-right',
      //       timeout: 4000,
      //     })
      //     this.$router.replace({
      //       name: 'establecimientos',
      //     })
      //   } else if (errorMessage.nombre) {
      //     this.$swal({
      //       title: 'Error!',
      //       text: `${errorMessage.nombre[0]}!`,
      //       icon: 'error',
      //       customClass: {
      //         confirmButton: 'btn btn-primary',
      //       },
      //       buttonsStyling: false,
      //     })
      //   } else {
      //     this.$swal({
      //       title: 'Error!',
      //       text: 'Ingreso de datos fraudulento!',
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
