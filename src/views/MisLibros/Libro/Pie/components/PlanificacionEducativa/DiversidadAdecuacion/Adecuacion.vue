<template>
  <b-overlay
    :show="!cargando"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
  >
    <b-form
      ref="form"
      :style="{height: trHeight}"
      class="repeater-form mb-2 mt-3"
      @submit.prevent="repeateAgain"
    >

      <b-row
        ref="row"
      >

        <!-- ADECUACIÓN -->
        <b-col md="3">
          <b-form-group
            label="Adecuación curricular"
            label-for="observaciones"
            class="text-center"
          />
        </b-col>
        <!-- AMBITOS DE APRENDIZAJE -->
        <b-col md="3">
          <b-form-group
            label="Ámbito de aprendizaje, asignatura o módulo en que se aplicarán"
            label-for="observaciones"
            class="text-center"
          />
        </b-col>
        <!-- ESTRATEGIAS -->
        <b-col md="3">
          <b-form-group
            label="Principales estrategias que se utilizarán"
            label-for="observaciones"
            class="text-center"
          />
        </b-col>
        <!-- ESTUDIANTES -->
        <b-col md="3">
          <b-form-group
            label="Estudiantes"
            label-for="observaciones"
            class="text-center"
          />
        </b-col>
      </b-row>

      <colLinea class="mt-25 mb-1"/>

      <!-- DE ACCESO -->
      <b-row>
        <!-- ADECUACIÓN -->
        <b-col md="3">
          <b-form-checkbox
            v-model="adecuacion.acceso"
            value="CC"
          >
            De acceso
          </b-form-checkbox>
        </b-col>

        <!-- ESTRATEGIAS PARA -->
        <b-col md="3">
          <b-form-textarea
            id="como"
            placeholder="Ingresa el ámbito de aprendizaje, asignatura o módulo"
            v-model="adecuacion.accesoAsignaturas"
            rows="6"
          />
        </b-col>

        <!-- COMO? -->
        <b-col md="3">
          <b-form-textarea
            id="como"
            placeholder="Ingresa la estrategia principal"
            v-model="adecuacion.accesoEstrategias"
            rows="6"
          />
        </b-col>

        <!-- A QUIENES? -->
        <b-col md="3">
          <v-select
            v-model="adecuacion.accesoAumnos"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            multiple
            label="title"
            :options="optionsAlumnos"
            placeholder="Seleccione el/la estudiante"
          />
        </b-col>
      </b-row>

      <colLinea />

      <!-- OBJETIVOS -->
      <b-row>
        <!-- ADECUACIÓN -->
        <b-col md="3">
          <b-form-checkbox
            v-model="adecuacion.objetivos"
            value="CC"
          >
            A los objetivos de aprendizaje en el caso de la educación básica
          </b-form-checkbox>
        </b-col>

        <!-- ESTRATEGIAS PARA -->
        <b-col md="3">
          <b-form-textarea
            id="como"
            placeholder="Ingresa el ámbito de aprendizaje, asignatura o módulo"
            v-model="adecuacion.objetivosAsignaturas"
            rows="6"
          />
        </b-col>

        <!-- COMO? -->
        <b-col md="3">
          <b-form-textarea
            id="como"
            placeholder="Ingresa las principales estratégias"
            v-model="adecuacion.objetivosEstrategias"
            rows="6"
          />
        </b-col>

        <!-- A QUIENES? -->
        <b-col md="3">
          <v-select
            v-model="adecuacion.objetivosAlumnos"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            multiple
            label="title"
            :options="optionsAlumnos"
            placeholder="Seleccione el/la estudiante"
          />
        </b-col>
      </b-row>

      <colLinea />

      <!-- PLAN -->
      <b-row>
        <!-- ADECUACIÓN -->
        <b-col md="3">
          <b-form-checkbox
            v-model="adecuacion.plan"
            value="CC"
          >
            Al plan de estudio (básica)
          </b-form-checkbox>
        </b-col>

        <!-- ESTRATEGIAS PARA -->
        <b-col md="3">
          <b-form-textarea
            id="como"
            placeholder="Ingresa el ámbito de aprendizaje, asignatura o módulo"
            v-model="adecuacion.planAsignatura"
            rows="6"
          />
        </b-col>

        <!-- COMO? -->
        <b-col md="3">
          <b-form-textarea
            id="como"
            placeholder="Ingresa las principales estratégias"
            v-model="adecuacion.planEstrategias"
            rows="6"
          />
        </b-col>

        <!-- A QUIENES? -->
        <b-col md="3">
          <v-select
            v-model="adecuacion.planAlumnos"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            multiple
            label="title"
            :options="optionsAlumnos"
            placeholder="Seleccione el/la estudiante"
          />
        </b-col>
      </b-row>

      <colLinea />

      <!-- PLAN -->
      <b-row>
        <!-- ADECUACIÓN -->
        <b-col md="3">
          <b-form-checkbox
            v-model="adecuacion.adecuacion"
            value="CC"
          >
            Plan de adecuación curricular individual (PACI) (básica)
          </b-form-checkbox>
        </b-col>

        <!-- ESTRATEGIAS PARA -->
        <b-col md="3">
          <b-form-textarea
            id="como"
            placeholder="Ingresa el ámbito de aprendizaje, asignatura o módulo"
            v-model="adecuacion.adecuacionAsignatura"
            rows="6"
          />
        </b-col>

        <!-- COMO? -->
        <b-col md="3">
          <b-form-textarea
            id="como"
            placeholder="Ingresa las principales estratégias"
            v-model="adecuacion.adecuacionEstrategias"
            rows="6"
          />
        </b-col>

        <!-- A QUIENES? -->
        <b-col md="3">
          <v-select
            v-model="adecuacion.adecuacionAlumnos"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            multiple
            label="title"
            :options="optionsAlumnos"
            placeholder="Seleccione el/la estudiante"
          />
        </b-col>
      </b-row>

      <colLinea />

      <!-- Action Buttons -->
      <b-row
        ref="row"
      >
        <b-col md="8">
        </b-col>

        <b-col md="4">
          <btnSubmit
            v-if="cargando"
            class="float-right"
            variant="primary"
            :btnText="btnSubmit"
            @processBtn="submitOption"
          />
        </b-col>

      </b-row>
    </b-form>
  </b-overlay>
</template>

<script>

// ETIQUETAS
import {
  BForm, BFormGroup, BFormInput, BRow, BCol, BButton, BOverlay, BCardText,
  BFormTextarea, BFormCheckbox
} from 'bootstrap-vue'
import { heightTransition } from '@core/mixins/ui/transition'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import Cleave from 'vue-cleave-component'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'cleave.js/dist/addons/cleave-phone.us'

// COMPONENTES
import colLinea from '../../../../../../components/Form/colLinea.vue'
import btnSubmit from '../../../../../../components/Form/btnSubmit.vue'

export default {
  components: {
    // ETIQUETAS
    BOverlay,
    BForm,
    BRow,
    BCol,
    BButton,
    BFormGroup,
    BFormInput,
    BCardText,
    BFormTextarea,
    BFormCheckbox,
    vSelect,
    // COMPONENTES
    colLinea,
    btnSubmit,
  },
  directives: {
    Ripple,
  },
  mixins: [heightTransition],
  data() {
    return {
      adecuacion: [],
      cargando: true,
      coordinacion: [],
      nextTodoId: 2,
      optionsAlumnos: [
        {
          value: 1,
          title: 'Catalina Gaete',
        },
        {
          value: 2,
          title: 'Thomas Torres',
        },
        {
          value: 3,
          title: 'Felipe López',
        },
      ],
    }
  },
  mounted() {
    this.initTrHeight()
  },
  created() {
    window.addEventListener('resize', this.initTrHeight)
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
  props: {
    btnSubmit: {
      type: String, // Texto del boton
      default: 'Actualizar Estrategia',
    },
  },
  methods: {
    submitOption() {
      console.log('this.v$ :', this.v$.asistencia)
      // this.v$.asistencia.$touch()
      // if (!this.v$.asistencia.$invalid) {
      //   this.$emit('processForm', this.asistencia)
      // }
    },
    // REPEATER
    repeateAgain() {
      this.items.push({
        id: this.nextTodoId += this.nextTodoId,
      })

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight)
      })
    },
    removeItem(index) {
      this.items.splice(index, 1)
      this.trTrimHeight(this.$refs.row[0].offsetHeight)
    },
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight)
      })
    },
  },
}
</script>
