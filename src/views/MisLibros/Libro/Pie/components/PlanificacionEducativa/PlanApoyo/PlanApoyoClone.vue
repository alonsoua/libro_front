<template>
  <div>
    <plan-apoyo-form
      :nombreModal="modal"
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
      data: {},
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
    planApoyo: {
      type: Object,
      required: true,
    },
    modal: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.setData(this.planApoyo)
  },
  methods: {
    // ...mapActions({ createEstablecimiento: 'establecimientos/addEstablecimientos' }),
    ...mapActions({
      createPlanApoyo: 'II_4_plan_apoyo/addPlanApoyo',
      fetchPlanApoyos: 'II_4_plan_apoyo/fetchPlanApoyos',
      createPlanApoyoHorario: 'II_4_plan_apoyo/addPlanApoyoHorario',
    }),
    setData(planApoyo) {
      this.data = {
        descripcion: planApoyo.descripcion+' - Copia',
        fecha_inicio: planApoyo.fecha_inicio,
        fecha_termino: planApoyo.fecha_termino,
        alumno: planApoyo.alumno,
        apoyoEspecializado: planApoyo.apoyoEspecializado,
        observaciones: planApoyo.observaciones,
      }
    },
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
          // console.log('dataResponse :', dataResponse)
          // console.log('planApoyo :', planApoyo)
          // console.log('planApoyo.horarios :', planApoyo.horarios)
          let responseStatus = 'Success'
          // planApoyo.horarios.forEach(horario => {
          //   let id_plan_apoyo_persona = null
          //   dataResponse.forEach(plan_apoyo_persona => {
          //     id_plan_apoyo_persona = null
          //     if (plan_apoyo_persona.id_persona_rol === horario.apoyoEspecializado.value) {
          //       let dataHorario = {}
          //       dataHorario = {
          //         dia: horario.dia.id,
          //         hora_inicio: horario.hora_inicio,
          //         hora_termino: horario.hora_termino,
          //         id_plan_apoyo_persona: plan_apoyo_persona.id
          //       }
          //       // this.createPlanApoyoHorario(dataHorario).then(() => {
          //       //   const statusHorario = store.state.II_4_plan_apoyo.statusHorario
          //       //   if (statusHorario !== 'Success') {
          //       //     responseStatus = statusHorario
          //       //   }
          //       // })
          //     }
          //   })
          // })

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
            this.$bvModal.hide(this.modal)
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
