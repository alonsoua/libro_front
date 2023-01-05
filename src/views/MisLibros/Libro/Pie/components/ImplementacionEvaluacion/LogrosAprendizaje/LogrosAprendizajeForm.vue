<template>
  <b-modal
    :id="nombreModal"
    :title="title"
    centered
    size="xl"
    cancel-title="Cancelar"
    cancel-variant="outline-secondary"
    ok-title="Guardar Logro"
    :ok-disabled="this.v$.logros.$errors.length > 0"
    @ok.prevent="submitOption"
  >
    <b-overlay
      :show="!cargando"
      spinner-variant="primary"
      :variant="$store.state.appConfig.layout.skin"
    >
      <!-- <b-form> -->
        <!-- Reunión Info: Input Fields -->
        <b-row>

          <!-- ESTUDIANTES -->
          <b-col
            cols="12"
            md="12"
          >
            <b-form-group
              label="Estudiante"
              label-for="estudiante"
            >
              <v-select
                v-model="logros.id_persona_rol_alumno"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="nombre_completo"
                input-id="id_persona_rol_alumno"
                :options="optionsEstudiantes"
                placeholder="Selecciona un estudiante..."
                :reduce="option => option.id_persona_rol"
                :class="v$.logros.id_persona_rol_alumno.$error === true
                  ? 'border-danger rounded'
                  : ''"
              />
              <div
                v-if="v$.logros.id_persona_rol_alumno.$error"
                id="id_asignaturaInfo"
                class="text-danger text-right"
                style="font-size: 0.857rem;"
              >
                <p v-for="error of v$.logros.id_persona_rol_alumno.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </div>
            </b-form-group>
          </b-col>

          <!-- LOGROS -->
          <b-col
            cols="12"
            md="12"
          >
            <b-form-group
              label="Logros más relevantes"
              label-for="logros"
            >
              <b-form-input
                id="logros"
                placeholder="Ingresa los logros más relevantes"
                v-model="logros.logros"
                :state="v$.logros.logros.$error === true
                  ? false
                  : null"
                @blur.native="v$.logros.logros.$touch"
              />
              <!-- Mensajes Error Validación -->
              <b-form-invalid-feedback
                v-if="v$.logros.logros.$error"
                id="acuerdoInfo"
                class="text-right"
              >
                <p v-for="error of v$.logros.logros.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <!-- COMNENTARIOS Y SUGERENCIAS -->
          <b-col
            cols="12"
            md="12"
          >
            <b-form-group
              label="Comentarios y sugerencias"
              label-for="comentariosSugerencias"
            >
              <b-form-input
                id="comentariosSugerencias"
                placeholder="Ingresa los comentarios y sugerencias"
                v-model="logros.comentarios"
                :state="v$.logros.comentarios.$error === true
                  ? false
                  : null"
                @blur.native="v$.logros.comentarios.$touch"
              />
              <!-- Mensajes Error Validación -->
              <b-form-invalid-feedback
                v-if="v$.logros.comentarios.$error"
                id="acuerdoInfo"
                class="text-right"
              >
                <p v-for="error of v$.logros.comentarios.$errors" :key="error.$uid">
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
  BFormTextarea, BAlert,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { heightTransition } from '@core/mixins/ui/transition'
import Ripple from 'vue-ripple-directive'

import { mapGetters, mapActions } from 'vuex'

// VALIDACIONES
import useVuelidate from '@vuelidate/core'
import { required, maxLength, email, helpers } from '@vuelidate/validators'

// COMPONENTES RECICLADOS
import firmas from '../../../../../../components/firmas.vue'

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
    BAlert,
    vSelect,

    // COMPONENTES RECICLADOS
    firmas,

  },
  setup() {
    return {
      v$: useVuelidate(),
    }
  },
  directives: {
    Ripple,
  },
  mixins: [heightTransition],
  data() {
    return {
      nombre_permiso: 'pieIII3',
      cargando: true,
      optionsEstudiantes: [],

    }
  },
  props: {
    logros: {
      type: Object,
      required: true,
    },
    nombreModal: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  validations() {
    return {
      logros: {
        id_persona_rol_alumno: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
        },
        logros: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener un máximo de 250 caracteres.', maxLength(250)),
        },
        comentarios: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener un máximo de 250 caracteres.', maxLength(250)),
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
    },
    getAlumnos(val) {
      this.optionsEstudiantes = []
      this.optionsEstudiantes = this.getAlumnos
    },
  },
  mounted() {
    this.cargaEstudiantesPie(this.getLibroSelected.id)
  },
  methods: {
    ...mapActions({
      fetchAlumnosPie: 'personas/fetchAlumnosPie',
    }),
    cargaEstudiantesPie(idCurso) {
      this.fetchAlumnosPie(idCurso).then(() => {})
    },
    submitOption() {
      this.v$.logros.$touch()
        // this.cargando = true
      if (!this.v$.logros.$invalid) {
        this.$emit('processForm', this.logros)
        // this.cargando = false
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

<style lang="scss" scoped>
@import '@core/scss/vue/libs/vue-flatpicker.scss';
@import '@core/scss/vue/libs/vue-select.scss';
.repeater-form {
  overflow: hidden;
  transition: .35s height;
}
</style>
