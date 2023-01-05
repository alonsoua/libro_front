<template>
  <b-modal
    :id="nombreModal"
    :title="title"
    centered
    size="lg"
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
            cols="6"
            md="12"
            sm="12"
          >
            <b-form-group
              label="Descripción *"
              label-for="descripcion"
            >
              <b-form-input
                id="descripcion"
                placeholder="Ingresa la descripción del plan de apoyo individual"
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
                <p
                  v-for="error of v$.planApoyo.descripcion.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </p>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <!-- Field: FECHA TERMINO (S) -->
          <b-col
            cols="3"
            md="6"
            sm="12"
          >
            <b-form-group
              label="Fecha inicio *"
              label-for="fecha_inicio"
            >
              <b-form-datepicker
                v-model="planApoyo.fecha_inicio"
                id="fecha_inicio"
                placeholder="Abrir calendario"
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
                :state="v$.planApoyo.fecha_inicio.$error === true
                  ? false
                  : null"
                @blur.native="v$.planApoyo.fecha_inicio.$touch"
              />
              <b-form-invalid-feedback
                v-if="v$.planApoyo.fecha_inicio.$error"
                id="fecha_inicioInfo"
                class="text-right"
              >
                <p
                  v-for="error of v$.planApoyo.fecha_inicio.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </p>
              </b-form-invalid-feedback>

            </b-form-group>
          </b-col>

          <!-- Field: FECHA TERMINO (S) -->
          <b-col
            cols="3"
            md="6"
            sm="6"
          >
            <b-form-group
              label="Fecha termino *"
              label-for="fecha_termino"
            >
              <b-form-datepicker
                v-model="planApoyo.fecha_termino"
                id="fecha_termino"
                placeholder="Abrir calendario"
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
                :state="v$.planApoyo.fecha_termino.$error === true
                  ? false
                  : null"
                @blur.native="v$.planApoyo.fecha_termino.$touch"
              />
              <b-form-invalid-feedback
                v-if="v$.planApoyo.fecha_termino.$error"
                id="fecha_terminoInfo"
                class="text-right"
              >
                <p
                  v-for="error of v$.planApoyo.fecha_termino.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </p>
              </b-form-invalid-feedback>

            </b-form-group>
          </b-col>

          <!-- Field: ALUMNO -->
          <b-col
            cols="6"
            md="6"
            sm="12"
          >
            <b-form-group
              label="Estudiante *"
              label-for="alumno"
            >
              <v-select
                v-model="planApoyo.alumno"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="title"
                :options="optionsAlumnos"
                placeholder="Selecciona un estudiante..."
                :class="v$.planApoyo.alumno.$error === true
                    ? 'border-danger rounded'
                    : ''"
                @blur.native="v$.planApoyo.alumno.$touch"
              />
              <!-- Mensajes Error Validación -->
              <div
                v-if="v$.planApoyo.alumno.$error"
                id="alumnoInfo"
                class="text-danger text-right"
                style="font-size: 0.857rem;"
              >
                <p
                  v-for="error of v$.planApoyo.alumno.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </p>
              </div>

            </b-form-group>
          </b-col>

          <!-- Field: APOYO ESPECIALIZADO REQUERIDO -->
          <b-col
            cols="6"
            md="6"
            sm="12"
          >
            <b-form-group
              label="Apoyo(s) especializado(s) requerido(s) *"
              label-for="apoyoEspecializado"
            >
              <v-select
                v-model="planApoyo.apoyoEspecializado"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                multiple
                label="title"
                :options="optionsEspecialistas"
                placeholder="Selecciona los apoyos especializados..."
                :class="v$.planApoyo.apoyoEspecializado.$error === true
                    ? 'border-danger rounded'
                    : ''"
                @blur.native="v$.planApoyo.apoyoEspecializado.$touch"
              />
              <!-- Mensajes Error Validación -->
              <div
                v-if="v$.planApoyo.apoyoEspecializado.$error"
                id="alumnoInfo"
                class="text-danger text-right"
                style="font-size: 0.857rem;"
              >
                <p
                  v-for="error of v$.planApoyo.apoyoEspecializado.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </p>
              </div>

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
                <p
                  v-for="error of v$.planApoyo.observaciones.$errors"
                  :key="error.$uid"
                >
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
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BFormInvalidFeedback,
  BMedia, BButton, BAvatar, BOverlay, BFormDatepicker, BFormTimepicker,
  BFormTextarea, BModal, VBModal
} from 'bootstrap-vue'

import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'

import { mapGetters, mapActions } from 'vuex'

// VALIDACIONES
import useVuelidate from '@vuelidate/core'
import { required, maxLength, email, helpers } from '@vuelidate/validators'

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

  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      cargando: true,
      horarios: [],
      // required,
      // email,
      optionsAlumnos: [],

      optionsEspecialistas: [],
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
      default: 'Guardar Plan de Apoyo',
    },
    planApoyo: {
      type: Object,
      required: true,
    },
  },
  validations() {
    return {
      planApoyo: {
        descripcion: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener un máximo de 50 caracteres.'
            , maxLength(50)),
        },
        fecha_inicio: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
        },
        fecha_termino: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
        },
        alumno: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
        },
        apoyoEspecializado: {
          // $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
        },
        observaciones: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener un máximo de 550 caracteres.'
            , maxLength(550)),
        },

      }
    }
  },
  computed: {
    ...mapGetters({
      getPlanApoyos: 'II_4_plan_apoyo/getPlanApoyos',
      getLibroSelected: 'libros/getLibroSelected',
      getAlumnos: 'personas/getAlumnos',
    }),
  },
  watch: {
    getLibroSelected() {
      this.cargaEstudiantesPie(this.getLibroSelected.id)
      this.cargarApoyos(this.getLibroSelected.id)
    },
    getPlanApoyos() {
      // this.setPlanApoyo(this.getPlanApoyos)
      this.cargarApoyos(this.getLibroSelected.id)
      this.v$.planApoyo.$reset()
    },
  },
  mounted() {
    this.cargaEstudiantesPie(this.getLibroSelected.id)
    this.cargarApoyos(this.getLibroSelected.id)
  },
  methods: {
    ...mapActions({
      fetchAlumnosPie: 'personas/fetchAlumnosPie',
    }),
    cargaEstudiantesPie(idCurso) {
      // fetchAlumnosPie
      this.optionsAlumnos = []
      this.fetchAlumnosPie(idCurso).then(() => {
        this.getAlumnos.forEach(alumno => {
          const title = alumno.nombre+' '+alumno.primer_apellido+' '+alumno.segundo_apellido
          this.optionsAlumnos.push({
            value: alumno.id_persona_rol,
            title,
          })
        })
      })
    },
    cargarApoyos(idCurso) {
      this.optionsEspecialistas = []
      const especialistas = [
        {
          value: 15, // id_persona_rol
          id: 15,
          title: 'Consuelo Contreras Baeza - Fonoaudiólogo/a',
        },
        {
          value: 16, // id_persona_rol
          id: 16,
          title: 'Karen Quiroga - Terapeuta ocupacional',
        },
        {
          value: 17, // id_persona_rol
          id: 17,
          title: 'Camila Rivera - Psicólogo/a',
        },
      ]
      especialistas.forEach(especialista => {
        if (typeof this.planApoyo.apoyoEspecializado !== 'undefined' || this.planApoyo.apoyoEspecializado.length !== 0) {
          const apoyoIngresado = this.planApoyo.apoyoEspecializado.find(a => a.value === especialista.value)

          if (apoyoIngresado) {
            this.optionsEspecialistas.push({
              value: especialista.value,
              title: especialista.title,
              disabled: true,
            })
          } else {
            this.optionsEspecialistas.push({
              value: especialista.value,
              title: especialista.title,
            })
          }
        } else {
          this.optionsEspecialistas.push({
            value: especialista.value,
            title: especialista.title,
          })
        }
      })
    },
    submitOption() {
      this.v$.planApoyo.$touch()
      if (!this.v$.planApoyo.$invalid) {
        const data = {
          descripcion: this.planApoyo.descripcion,
          observaciones: this.planApoyo.observaciones,
          fecha_inicio: this.planApoyo.fecha_inicio,
          fecha_termino: this.planApoyo.fecha_termino,
          alumno: this.planApoyo.alumno,
          apoyoEspecializado: this.planApoyo.apoyoEspecializado,
          horarios: this.horarios,
        }
        this.$emit('processForm', data)
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
