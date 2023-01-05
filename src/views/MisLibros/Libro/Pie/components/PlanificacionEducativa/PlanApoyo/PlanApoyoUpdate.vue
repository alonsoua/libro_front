<template>
  <b-overlay
    :show="spinner"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
  >
    <plan-apoyo-form
      :nombreModal="modal"
      title="Editar plan de apoyo individual"
      :planApoyo.sync="data"
      @processForm="editar"
    />
  </b-overlay>
</template>

<script>

import { BOverlay } from 'bootstrap-vue'
import { mapActions, mapState } from 'vuex'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import PlanApoyoForm from './PlanApoyoForm.vue'

export default {
  components: {
    PlanApoyoForm,
    BOverlay,
  },
  data() {
    return {
      spinner: false,
      apoyoEspecializado: [],
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
      updatePlanApoyo: 'II_4_plan_apoyo/updatePlanApoyo',
      fetchPlanApoyos: 'II_4_plan_apoyo/fetchPlanApoyos',
    }),
    editar(planApoyo) {
      let personas = []
      personas.push(planApoyo.alumno.value)
      planApoyo.apoyoEspecializado.forEach(apoyo => {
        personas.push(apoyo.value)
      })

      const data = {
        id: this.data.id,
        descripcion: planApoyo.descripcion,
        observaciones: planApoyo.observaciones,
        fecha_inicio: planApoyo.fecha_inicio,
        fecha_termino: planApoyo.fecha_termino,
        id_curso: this.idCurso,
        personas,
        id_periodo: 1,
      }
      this.updatePlanApoyo(data).then(() => {
        const statusPlanApoyos = store.state.II_4_plan_apoyo.status
        if (statusPlanApoyos === 'success') {
          this.fetchPlanApoyos(this.idCurso)
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Plan de apoyo guardado 👍',
              icon: 'CheckIcon',
              text: 'El plan de apoyo individual fue editado con éxito!',
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
