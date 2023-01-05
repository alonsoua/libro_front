<template>
  <estrategiasForm
    nombreModal="modal-create"
    :title="title"
    :estrategia.sync="data"
    btnSubmit="Guardar Estrategia"
    @processForm="agregar"
  />
</template>

<script>
// ETIQUETAS
import { mapActions } from 'vuex'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Ripple from 'vue-ripple-directive'

// COMPONENTES HIJO
import estrategiasForm from './EstrategiasForm.vue'

export default {
  components: {
    // COMPONENTES
    estrategiasForm,
  },
  directives: {
    Ripple,
  },
  computed: {
    // ...mapGetters({
    //   getLibroSelected: 'libros/getLibroSelected'
    // }),
  },
  data() {
    return {
      data: {
        estrategia: '',
        id_asignatura: null,
        id_periodo: null,
        criterios: '',
      },
    }
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    idCurso: {
      type: Number,
      required: true,
    },
    submitTitle: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions({
      createEstrategia: 'II_1_b_estrategias/addEstrategia',
      fetchEstrategias: 'II_1_b_estrategias/fetchEstrategias',
    }),
    agregar(estrategia) {
      this.createEstrategia(estrategia).then(() => {
        const statusEstrategias = store.state.II_1_b_estrategias.status
        if (statusEstrategias === 'success') {
          this.fetchEstrategias(this.idCurso).then(() => {
            this.cargando = false
          })
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Estrategia registrada 👍',
              icon: 'CheckIcon',
              text: 'La estrategia fue guardada con éxito!',
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
