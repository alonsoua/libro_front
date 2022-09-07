<template>
  <b-overlay
    :show="!cargando"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
  >
    <b-form>
      <!-- PLAN: FORM -->
      <b-row>

        <!-- Field: ALUMNO (S) -->
        <b-col
          cols="6"
          md="6"
          sm="12"
        >
          <b-form-group
            label="Estudiante(s) *"
            label-for="alumnos"
          >
            <v-select
              v-model="plan.alumnos"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              multiple
              label="title"
              :options="optionsAlumnos"
              placeholder="Seleccione el/la estudiante"
            />

          </b-form-group>
        </b-col>

        <!-- Field: FECHA TERMINO (S) -->
        <b-col
          cols="3"
          md="3"
          sm="12"
        >
          <b-form-group
            label="Fecha inicio(s) *"
            label-for="fechaInicio"
          >
            <b-form-datepicker
              v-model="plan.fechaInicio"
              id="fechaInicio"
              placeholder="Selecciona una fecha"
              hide-header
              :date-format-options="{
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                weekday: 'short'
              }"
              start-weekday="1"
              locale="es-CL"
              :date-disabled-fn="dateDisabled"
              label-help=""
            />

          </b-form-group>
        </b-col>

        <!-- Field: FECHA TERMINO (S) -->
        <b-col
          cols="3"
          md="3"
          sm="12"
        >
          <b-form-group
            label="Fecha termino(s) *"
            label-for="fechaTermino"
          >
            <b-form-datepicker
              v-model="plan.fechaTermino"
              id="fechaTermino"
              placeholder="Selecciona una fecha"
              hide-header
              :date-format-options="{
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                weekday: 'short'
              }"
              start-weekday="1"
              locale="es-CL"
              :date-disabled-fn="dateDisabled"
              label-help=""
            />

          </b-form-group>
        </b-col>

        <!-- Field: OBSERVACIONES -->
        <b-col
          cols="12"
          md="12"
          sm="12"
        >
          <b-form-group
            label="Observaciones *"
            label-for="observaciones"
          >
            <b-form-textarea
              id="observaciones"
              placeholder="Ingresa las observaciones"
              v-model="plan.observaciones"
              rows="2"
            />
          </b-form-group>
        </b-col>

      </b-row>

      <!-- CALENDARIO -->
      <b-form-group
        label="Selecciona los días y horas"
        class="mb-25 mt-1 h6"
      />
      <calendario />
    </b-form>
  </b-overlay>
</template>

<script>

// ETIQUETAS
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BFormInvalidFeedback,
  BMedia, BButton, BAvatar, BOverlay, BFormDatepicker, BFormTimepicker,
  BFormTextarea
} from 'bootstrap-vue'

// VALIDACIONES
import useVuelidate from '@vuelidate/core'
import { required, maxLength, email, helpers } from '@vuelidate/validators'

// COMPONENTES
import vSelect from 'vue-select'

// HIJOS
import Calendario from './Calendario/Calendario.vue'

export default {
  components: {
    // ETIQUETAS
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BFormInvalidFeedback,
    BMedia,
    BButton,
    BAvatar,
    BOverlay,
    BFormDatepicker,
    BFormTimepicker,
    BFormTextarea,

    // COMPONENTES
    vSelect,

    // HIJOS
    Calendario
  },
  setup() {
    return {
      v$: useVuelidate(),
    }
  },
  data() {
    return {
      cargando: true,
      // required,
      // email,
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
  props: {
    plan: {
      type: Object,
      required: true,
    },
  },
  validations() {
    return {
      plan: {
        rbd: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener un máximo de 8 caracteres.', maxLength(8)),
        },
        nombre: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener un máximo de 250 caracteres.', maxLength(250)),
        },
        abreviatura: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener un máximo de 10 caracteres.', maxLength(10)),
        },
        correo: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          email: helpers.withMessage('Debe ser un correo valido.', email),
        },
      }
    }
  },
  methods: {
    dateDisabled(ymd, date) {
      // Disable weekends (Sunday = `0`, Saturday = `6`) and
      // disable days that fall on the 13th of the month
      const weekday = date.getDay()
      const day = date.getDate()
      // Return `true` if the date should be disabled
      // return weekday === 0 || weekday === 6 || day === 1
      return weekday === 0 || weekday === 6
    },
    // submitOption() {
    //   console.log('this.v$ :', this.v$.plan)
    //   this.v$.plan.$touch()
    //   // if (!this.v$.plan.$invalid) {
    //   //   this.$emit('processForm', this.plan)
    //   // }
    // },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
@import '@core/scss/vue/libs/vue-select.scss';
</style>
