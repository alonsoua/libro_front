<template>
  <b-modal
    :id="nombreModal"
    :title="title"
    centered
    size="lg"
    cancel-title="Cancelar"
    cancel-variant="outline-secondary"
    ok-title="Guardar apoyo"
    :ok-disabled="this.v$.apoyo.$errors.length > 0"
    @ok.prevent="submitOption"
  >
    <b-overlay
      :show="!cargando"
      spinner-variant="primary"
      :variant="$store.state.appConfig.layout.skin"
    >
      <b-form>
        <!-- Reunión Info: Input Fields -->
        <b-row>

          <!-- Field: TIPO APRENDIZAJE -->
          <b-col
            cols="12"
            md="12"
          >
            <b-form-group
              label="Ámbito, asignatura y/o Módulo de Aprendizaje *"
              label-for="id_asignatura"
            >
              <v-select
                v-model="apoyo.id_asignatura"
                placeholder="Selecciona una asignatura..."
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="texto"
                :options="asignaturasOption"
                :reduce="option => option.id"
                input-id="idPeriodo"
                :class="v$.apoyo.id_asignatura.$error === true
                  ? 'border-danger rounded'
                  : ''"
              />
              <div
                v-if="v$.apoyo.id_asignatura.$error"
                id="id_asignaturaInfo"
                class="text-danger text-right"
                style="font-size: 0.857rem;"
              >
                <p v-for="error of v$.apoyo.id_asignatura.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </div>
            </b-form-group>
          </b-col>

          <!-- Field: HORAS AULA -->
          <b-col
            cols="6"
            md="6"
          >
            <b-form-group
              label="Horas de apoyo en aula regular *"
              label-for="horas_aula"
            >
              <b-input-group
                :class="v$.apoyo.horas_aula.$error === true
                    ? 'border-danger rounded'
                    : 'rounded'"
              >
                <b-form-input
                  id="horas_aula"
                  v-model="apoyo.horas_aula"
                  type="number"
                  placeholder="Ingresa las horas de apoyo en aula"
                  @keyup='apoyo.horas_aula = formatSoloNumeros(apoyo.horas_aula)'
                  @blur.native="v$.apoyo.horas_aula.$touch"
                />
                    <!-- :state="v$.apoyo.horas_aula.$error === true
                      ? false
                      : null" -->
                <b-input-group-append is-text>
                  hrs
                </b-input-group-append>
              </b-input-group>
              <!-- Mensajes Error Validación -->
              <div
                v-if="v$.apoyo.horas_aula.$error"
                id="horas_aulaInfo"
                class="text-right text-danger"
                style="font-size: 0.857rem;"
              >
                <p v-for="error of v$.apoyo.horas_aula.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </div>
            </b-form-group>
          </b-col>

          <!-- Field: PERIODO -->
          <b-col
            cols="6"
            md="6"
          >
            <b-form-group
              label="Horas de apoyo fuera del aula *"
              label-for="horas_fuera"
            >
              <b-input-group
                :class="v$.apoyo.horas_fuera.$error === true
                    ? 'border-danger rounded'
                    : 'rounded'"
              >
                <b-form-input
                  id="horas_fuera"
                  v-model="apoyo.horas_fuera"
                  type="number"
                  placeholder="Ingresa las horas de apoyo fuera del aula"
                  @keyup='apoyo.horas_fuera = formatSoloNumeros(apoyo.horas_fuera)'
                  @blur.native="v$.apoyo.horas_fuera.$touch"
                />
                  <!-- :state="v$.apoyo.horas_fuera.$error === true
                    ? false
                    : null" -->
                <b-input-group-append is-text>
                  hrs
                </b-input-group-append>
              </b-input-group>
              <div
                v-if="v$.apoyo.horas_fuera.$error"
                id="horas_fueraInfo"
                class="text-right text-danger"
                style="font-size: 0.857rem;"
              >
                <p v-for="error of v$.apoyo.horas_fuera.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </div>
            </b-form-group>
          </b-col>

          <!-- Field: CRITERIOS -->
          <b-col
            cols="12"
            md="12"
          >
            <b-form-group
              label="Tipos de apoyo especializado (Recursos materiales y/o profesionales) *"
              label-for="apoyos"
            >
              <b-form-textarea
                id="apoyos"
                placeholder="Ingresa los tipos de apoyo especializado"
                v-model="apoyo.apoyos"
                rows="4"
                :state="v$.apoyo.apoyos.$error === true
                  ? false
                  : null"
                @blur.native="v$.apoyo.apoyos.$touch"
              />
              <b-form-invalid-feedback
                v-if="v$.apoyo.apoyos.$error"
                id="apoyosInfo"
                class="text-right"
              >
                <p v-for="error of v$.apoyo.apoyos.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

        </b-row>

      </b-form>
    </b-overlay>
  </b-modal>
</template>

<script>

// ETIQUETAS
import vSelect from 'vue-select'
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BFormInvalidFeedback,
  BMedia, BButton, BAvatar, BOverlay, BFormDatepicker, BFormTimepicker,
  BFormTextarea, BModal, VBModal, BInputGroupAppend, BInputGroup,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

// VALIDACIONES
import useVuelidate from '@vuelidate/core'
import { required, maxLength, email, helpers, numeric } from '@vuelidate/validators'

// FORMATOS
import { formatos } from '@core/mixins/ui/formatos'

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
    BInputGroup,
    BInputGroupAppend,
    VBModal,
    vSelect,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  mixins: [formatos],
  setup() {
    return {
      v$: useVuelidate(),
    }
  },
  data() {
    return {
      cargando: true,
      asignaturasOption: [
        { id: 1, texto: 'Lenguaje' },
        { id: 2, texto: 'Matemáticas' },
        { id: 3, texto: 'Historia' },
      ],
      ambitosOption: [
        { id: 1, texto: 'Ambito 1' },
        { id: 2, texto: 'Ambito 2' },
        { id: 3, texto: 'Ambito 3' },
      ],
      aprendizajeOption: [
        { id: 1, texto: 'Aprendizaje 1' },
        { id: 2, texto: 'Aprendizaje 2' },
        { id: 3, texto: 'Aprendizaje 3' },
      ],
      // required,
      // email,
      // dependenciasOption: [
      //   { value: 'Municipal', text: 'Municipal' },
      //   { value: 'Paricular', text: 'Paricular' },
      //   { value: 'Particular Subvencionado', text: 'Particular Subvencionado' },
      // ],
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
    apoyo: {
      type: Object,
      required: true,
    },
  },
  validations() {
    return {
      apoyo: {
        id_asignatura: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
        },
        apoyos: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener un máximo de 255 caracteres.', maxLength(255)),
        },
        horas_aula: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
        },
        horas_fuera: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
        },
      }
    }
  },
  methods: {
    submitOption() {
      this.v$.apoyo.$touch()
      if (!this.v$.apoyo.$invalid) {
        this.$emit('processForm', this.apoyo)
      }
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
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
