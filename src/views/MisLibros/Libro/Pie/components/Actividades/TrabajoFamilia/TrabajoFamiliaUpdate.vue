<template>
  <b-overlay
    :show="spinner"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
  >
    <trabajo-familia-form
      :nombreModal="modal"
      title="Editar registro de trabajo con la familia, apoderados y/o con el o la estudiante"
      :actividad.sync="data.item"
      @processForm="editar"
    />
  </b-overlay>

</template>

<script>

import { BOverlay } from 'bootstrap-vue'
import { mapActions, mapState } from 'vuex'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import trabajoFamiliaForm from './TrabajoFamiliaForm.vue'

export default {
  components: {
    trabajoFamiliaForm,
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
      updateActividad: 'IV_actividades/updateActividad',
      fetchActividades: 'IV_actividades/fetchActividades',
    }),
    editar(actividad) {
      const data = {
        id: this.data.item.id,
        fecha: actividad.fecha,
        texto_1: actividad.texto_1,
        texto_2: actividad.texto_2,
        texto_3: actividad.texto_3,
        texto_4: actividad.texto_4,
        tipo: 1, //Tipo Actividad: Trabajo Familia
        id_curso: this.idCurso,
        personas: actividad.personas,
      }
      this.updateActividad(data).then(() => {
        const statusActividades = store.state.IV_actividades.status
        if (statusActividades === 'success') {
           const data = {
            idCurso: this.idCurso,
            tipo: 1, // Tipo Trabajo Familia
          }
          this.fetchActividades(data)
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Trabajo guardado 👍',
              icon: 'CheckIcon',
              text: 'El trabajo fue editado con éxito!',
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
