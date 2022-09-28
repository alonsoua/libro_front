<template>
  <b-modal
    :id="nombreModal"
    :title="title"
    centered
    size="xl"
    cancel-title="Cancelar"
    cancel-variant="outline-secondary"
    :ok-disabled="this.v$.planApoyo.$errors.length > 0"
    :ok-title="submitTitle"
    @ok.prevent="submitOption"
  >
  <b-overlay
    :show="!cargando"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
  >
    <b-form>
      <!-- PLAN: FORM -->
      <b-row>

        <!-- Field: DESCRIPCION -->
        <b-col
          cols="12"
          md="12"
          sm="12"
        >
          <b-form-group
            label="Descripción *"
            label-for="descripcion"
          >
            <b-form-input
              id="descripcion"
              placeholder="Ingresa una descripción para el plan de apoyo"
              v-model="planApoyo.descripcion"
              rows="2"
              :state="v$.planApoyo.descripcion.$error === true
                ? false
                : null"
              @blur.native="v$.planApoyo.descripcion.$touch"
            />
            <b-form-invalid-feedback
              v-if="v$.planApoyo.descripcion.$error"
              id="observacionesInfo"
              class="text-right"
            >
              <p v-for="error of v$.planApoyo.descripcion.$errors" :key="error.$uid">
                {{ error.$message }}
              </p>
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>

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
              v-model="planApoyo.alumnos"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              multiple
              label="title"
              :options="optionsAlumnos"
              placeholder="Seleccione el/la estudiante"
              :class="v$.planApoyo.alumnos.$error === true
                  ? 'border-danger rounded'
                  : ''"
              />
              <!-- Mensajes Error Validación -->
              <div
                v-if="v$.planApoyo.alumnos.$error"
                id="alumnosInfo"
                class="text-danger text-right"
                style="font-size: 0.857rem;"
              >
                <p v-for="error of v$.planApoyo.alumnos.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </div>

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
              v-model="planApoyo.fechaInicio"
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
              :state="v$.planApoyo.fechaInicio.$error === true
                ? false
                : null"
              @blur.native="v$.planApoyo.fechaInicio.$touch"
            />
            <b-form-invalid-feedback
              v-if="v$.planApoyo.fechaInicio.$error"
              id="fechaInicioInfo"
              class="text-right"
            >
              <p v-for="error of v$.planApoyo.fechaInicio.$errors" :key="error.$uid">
                {{ error.$message }}
              </p>
            </b-form-invalid-feedback>

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
              v-model="planApoyo.fechaTermino"
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
              :state="v$.planApoyo.fechaTermino.$error === true
                ? false
                : null"
              @blur.native="v$.planApoyo.fechaTermino.$touch"
            />
            <b-form-invalid-feedback
              v-if="v$.planApoyo.fechaTermino.$error"
              id="fechaTerminoInfo"
              class="text-right"
            >
              <p v-for="error of v$.planApoyo.fechaTermino.$errors" :key="error.$uid">
                {{ error.$message }}
              </p>
            </b-form-invalid-feedback>

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
              v-model="planApoyo.observaciones"
              rows="2"
              :state="v$.planApoyo.observaciones.$error === true
                ? false
                : null"
              @blur.native="v$.planApoyo.observaciones.$touch"
            />
            <b-form-invalid-feedback
              v-if="v$.planApoyo.observaciones.$error"
              id="observacionesInfo"
              class="text-right"
            >
              <p v-for="error of v$.planApoyo.observaciones.$errors" :key="error.$uid">
                {{ error.$message }}
              </p>
            </b-form-invalid-feedback>
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
  </b-modal>
</template>

<script>

// ETIQUETAS
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BFormInvalidFeedback,
  BMedia, BButton, BAvatar, BOverlay, BFormDatepicker, BFormTimepicker,
  BFormTextarea, BModal, VBModal
} from 'bootstrap-vue'

import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'

// VALIDACIONES
import useVuelidate from '@vuelidate/core'
import { required, maxLength, email, helpers } from '@vuelidate/validators'

// COMPONENTES HIJOS
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
    BModal,
    VBModal,
    vSelect,

    // COMPONENTES HIJOS
    Calendario
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
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
    nombreModal: {
      type: String,
      required: true,
    },
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
  },
  validations() {
    return {
      planApoyo: {
        alumnos: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
        },
        observaciones: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener un máximo de 550 caracteres.', maxLength(550)),
        },
        descripcion: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener un máximo de 150 caracteres.', maxLength(150)),
        },
        fechaInicio: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
        },
        fechaTermino: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
        },
      }
    }
  },
  methods: {
    submitOption() {
      console.log('this.planApoyo :', this.planApoyo)
      this.v$.planApoyo.$touch()
      // if (!this.v$.planApoyo.$invalid) {
      //   this.cargando = true
      //   this.$emit('processForm', this.planApoyo)
      //   this.cargando = false
      // }
    },
    dateDisabled(ymd, date) {
      // Disable weekends (Sunday = `0`, Saturday = `6`) and
      // disable days that fall on the 13th of the month
      const weekday = date.getDay()
      const day = date.getDate()
      // Return `true` if the date should be disabled
      // return weekday === 0 || weekday === 6 || day === 1
      return weekday === 0 || weekday === 6
    },
  },
  setup() {
    return {
      v$: useVuelidate(),
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
@import '@core/scss/vue/libs/vue-select.scss';
</style>
