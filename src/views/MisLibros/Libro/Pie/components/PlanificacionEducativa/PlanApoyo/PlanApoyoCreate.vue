<template>
  <div>
    <plan-apoyo-form
      nombreModal="modal-create"
      :title="title"
      :planApoyo.sync="data"
      :submitTitle="submitTitle"
      @processForm="agregar"
    />
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Ripple from 'vue-ripple-directive'

import planApoyoForm from './PlanApoyoForm.vue'

export default {
  components: {
    // COMPONENTES
    planApoyoForm,
  },
  data() {
    return {
      data: {
        // descripcion: 'TEST',
        // fecha_inicio: '2022-12-12',
        // fecha_termino: '2022-12-13',
        // alumno: null,
        // apoyoEspecializado: [],
        // observaciones: 'Test',
        descripcion: '',
        fecha_inicio: null,
        fecha_termino: null,
        alumno: null,
        apoyoEspecializado: [],
        observaciones: '',
        // personas: [],
      },
    }
  },
  computed: {
    ...mapGetters({
      getLibroSelected: 'libros/getLibroSelected',
    }),
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
    ...mapActions({
      createPlanApoyo: 'II_4_plan_apoyo/addPlanApoyo',
      fetchPlanApoyos: 'II_4_plan_apoyo/fetchPlanApoyos',
      createPlanApoyoHorario: 'II_4_plan_apoyo/addPlanApoyoHorario',
    }),
    agregar(planApoyo) {

      this.personas = [planApoyo.alumno.value]
      planApoyo.apoyoEspecializado.forEach(especialista => {
        this.personas.push(especialista.value)
      })

      const data = {
        descripcion: planApoyo.descripcion,
        observaciones: planApoyo.observaciones,
        fecha_inicio: planApoyo.fecha_inicio,
        fecha_termino: planApoyo.fecha_termino,
        id_curso: this.getLibroSelected.id,
        id_periodo: 1,
        personas: this.personas,
      }


      this.createPlanApoyo(data).then(() => {
        const statusPlanApoyos = store.state.II_4_plan_apoyo.status
        if (statusPlanApoyos === 'success') {
          const dataResponse = store.state.II_4_plan_apoyo.dataResponse
          // consulta horarios registrado y compara id_persona_rol del horario.apoyoEspecializado,
          // con los id_persona_rol de la respuesta del dataResponse
          // para obtener el id_plan_apoyo_persona
          let responseStatus = 'Success'
          planApoyo.horarios.forEach(horario => {
            let id_plan_apoyo_persona = null
            dataResponse.forEach(plan_apoyo_persona => {
              id_plan_apoyo_persona = null
              if (plan_apoyo_persona.id_persona_rol === horario.apoyoEspecializado.value) {
                let dataHorario = {}
                dataHorario = {
                  dia: horario.dia.id,
                  hora_inicio: horario.hora_inicio,
                  hora_termino: horario.hora_termino,
                  id_plan_apoyo_persona: plan_apoyo_persona.id
                }
                this.createPlanApoyoHorario(dataHorario).then(() => {
                  const statusHorario = store.state.II_4_plan_apoyo.statusHorario
                  if (statusHorario !== 'Success') {
                    responseStatus = statusHorario
                  }
                })
              }
            })
          })

          if (responseStatus === 'Success') {
            this.fetchPlanApoyos(this.getLibroSelected.id).then(() => {
              this.cargando = false
              this.data = {
                apoyoEspecializado: [],
              }
            })
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Plan de apoyo individual registrado 👍',
                icon: 'CheckIcon',
                text: 'La plan de apoyo fue guardado con éxito!',
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
              text: responseStatus,
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          }
        }
        else {
          this.$swal({
            title: 'Error!',
            text: statusPlanApoyos,
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
