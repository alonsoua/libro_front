<template>
  <estrategias-form
    :nombreModal="modal"
    title="Editar estrategia diversificada que aplicará el profesor de educación regular para el curso"
    :estrategia="data.item"
    @processForm="editar"
  />
</template>

<script>

import { mapActions, mapState } from 'vuex'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import estrategiasForm from './EstrategiasForm.vue'

export default {
  components: {
    estrategiasForm,
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
      updateEstrategia: 'II_1_b_estrategias/updateEstrategia',
      fetchEstrategias: 'II_1_b_estrategias/fetchEstrategias',
    }),
    editar(estrategia) {
      this.updateEstrategia(estrategia).then(() => {
        const statusEstrategias = store.state.II_1_b_estrategias.status
        if (statusEstrategias === 'success') {
          this.fetchEstrategias(this.idCurso)
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Estrategia guardada 👍',
              icon: 'CheckIcon',
              text: 'La estrategia fue editada con éxito!',
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
            text: store.state.II_1_b_estrategias.message,
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
