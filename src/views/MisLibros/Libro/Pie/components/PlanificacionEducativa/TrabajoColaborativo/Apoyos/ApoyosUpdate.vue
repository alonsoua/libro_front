<template>
  <apoyosForm
    :nombreModal="modal"
    title="Editar apoyo"
    :apoyo="data.item"
    @processForm="editar"
  />
</template>

<script>

import { mapActions, mapState } from 'vuex'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import apoyosForm from './ApoyosForm.vue'

export default {
  components: {
    apoyosForm,
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
      updateApoyo: 'II_2_b_apoyos/updateApoyo',
      fetchApoyos: 'II_2_b_apoyos/fetchApoyos',
    }),
    editar(apoyo) {
      this.updateApoyo(apoyo).then(() => {
        const statusApoyos = store.state.II_2_b_apoyos.status
        if (statusApoyos === 'success') {
          this.fetchApoyos(this.idCurso)
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Apoyo guardado 👍',
              icon: 'CheckIcon',
              text: 'El apoyo fue editado con éxito!',
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
            text: 'Error',
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
