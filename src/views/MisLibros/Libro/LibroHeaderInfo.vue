<template>
  <b-overlay
    :show="!cargando"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
  >
    <b-card
      aria-hidden="true"
      class="mb-0 pb-0"
      :bg-variant="$store.state.appConfig.layout.skin === 'light'
        ? 'light-primary'
        : ''"
    >


      <b-form>
        <b-row>
          <!-- PROFESOR JEFE -->
          <b-col
            xs="12"
            md="6"
          >
            <b-card-title
              class="text-left mb-25"
              style="margin-left: -5px;"
            >
                Profesor Jefe
            </b-card-title>
            <h5
              class="text-dark text-bold font-weight-normal text-left mt-1"
              style="margin-left: -5px;"
            >
                Paula Macarena Saavedra Sandoval
            </h5>
          </b-col>

          <!-- CURSO -->
          <b-col
            xs="12"
            md="6"
          >
            <b-card-title class="text-left mb-25">
                Curso
            </b-card-title>
            <v-select
              v-model="libro.idCurso"
              placeholder="Selecciona el Curso"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="title"
              :options="cursosOption"
              :reduce="option => option.id"
              input-id="idCurso"
              class="bg-light mb-2 mt-25"
              style="border-radius: 6px;"
            />
          </b-col>

        </b-row>

        <!-- DETALLE DEL CURSO -->
        <b-tabs style="margin-left: -21px;" class="mt-1">
          <b-tab
            active
            title="Estilos y modos de aprendizaje"
            class="ml-2"
          >
            <b-card-text class="text-secondary" style="margin-left: -4px;">
              Es un curso combinado de 3° (10) y 4° básico (11), con diversos
              estilos de aprendizaje, primando el kinestésico, a su vez posee
              alumnos con diagnóstico asociado de TEL, DEA, DIL y TDAH recibiendo
              apoyo de un equipo multidisciplinario Terapeuta ocupacional,
              fonoaudióloga, profesora diferencias, psicóloga y trabajadora social.
              Se trabaja de forma online, debido a situación pandemia, con
              asignaturas a diario vía ZOOM.
            </b-card-text>
          </b-tab>
          <b-tab title="Fortalezas">
            <b-card-text class="text-secondary mb-2" style="margin-left: 17px;">
              Alumnos con motivación por aprender, trabajo articulado y colaborativo
              entre los profesionales de la educación y a su vez con la familia,
              buena asistencia a las clases online, con justificación las
              inasistencias, entrega de tareas en plazos estipulados, responsabilidad
              de los alumnos y sus familia en el desarrollo integral de sus pupilos.
            </b-card-text>
          </b-tab>
          <b-tab title="Necesidades de apoyo">
            <b-card-text class="text-secondary mb-2" style="margin-left: 17px;">
              Debido a la situación sanitaria por el COVID19, el trabajo es de
              forma online y con actividades asincrónicas, dificultando que los
              y las alumnas lleguen a la adquisición del 100% de los aprendizajes
              o apoyos necesarios, la conectividad y redes de internet deficientes
              en ocasiones a nivel comunal.
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-form>
    </b-card>
  </b-overlay>
</template>

<script>

// ETIQUETAS
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BFormInvalidFeedback,
  BMedia, BButton, BAvatar, BOverlay, BCard, BFormSelect, BCardText, BCardTitle,
  BTabs, BTab
} from 'bootstrap-vue'

import vSelect from 'vue-select'

// VALIDACIONES
import useVuelidate from '@vuelidate/core'
import { required, maxLength, email, helpers } from '@vuelidate/validators'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BFormInvalidFeedback,
    BMedia,
    BButton,
    BAvatar,
    vSelect,
    BOverlay,
    BCard,
    BFormSelect,
    BCardText,
    BCardTitle,
    BTabs,
    BTab,
  },
  setup() {
    return {
      v$: useVuelidate(),
    }
  },
  data() {
    return {
      collapseType: 'border',
      cargando: true,
      cursosOption: [
        { id: 1, title: '1ero Básico A' },
        { id: 2, title: '1ero Básico B' },
        { id: 3, title: '2do Básico A' },
        { id: 4, title: '2do Básico B' },
        { id: 5, title: '3ero Básico A' },
      ],
    }
  },
  props: {
    libro: {
      type: Object,
      required: true,
    },
  },
  // validations() {
  //   return {
  //     libro: {
  //       rbd: {
  //         $autoDirty: true,
  //         required: helpers.withMessage('El campo es requerido.', required),
  //         maxLength: helpers.withMessage('Debe tener un máximo de 8 caracteres.', maxLength(8)),
  //       },
  //       nombre: {
  //         $autoDirty: true,
  //         required: helpers.withMessage('El campo es requerido.', required),
  //         maxLength: helpers.withMessage('Debe tener un máximo de 250 caracteres.', maxLength(250)),
  //       },
  //       abreviatura: {
  //         $autoDirty: true,
  //         required: helpers.withMessage('El campo es requerido.', required),
  //         maxLength: helpers.withMessage('Debe tener un máximo de 10 caracteres.', maxLength(10)),
  //       },
  //       correo: {
  //         $autoDirty: true,
  //         required: helpers.withMessage('El campo es requerido.', required),
  //         email: helpers.withMessage('Debe ser un correo valido.', email),
  //       },
  //     }
  //   }
  // },
  methods: {
    submitOption() {
      console.log('this.v$ :', this.v$.libro)
      this.v$.libro.$touch()
      // if (!this.v$.libro.$invalid) {
      //   this.$emit('processForm', this.libro)
      // }
    },
  },
}

</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>