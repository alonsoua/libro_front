<template>
  <b-overlay
    :show="!cargando"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
  >
    <b-card
      aria-hidden="true"
      class="mb-0"
    >
      <b-form>
        <!-- Calendario: Input Fields -->
        <b-row>

          <!-- Field: Codigo calendario -->
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Código del calendario *"
              label-for="codigo_calendario"
            >
              <b-form-input
                id="codigo_calendario"
                v-model="calendario.codigo_calendario"
                placeholder="Ingresa el código"
                :state="v$.calendario.codigo_calendario.$error === true
                ? false
                : null"
                @blur.native="v$.calendario.codigo_calendario.$touch"
              />
              <!-- Mensajes Error Validación -->
              <b-form-invalid-feedback
                v-if="v$.calendario.codigo_calendario.$error"
                id="codigo_calendarioInfo"
                class="text-right"
              >
                <p v-for="error of v$.calendario.codigo_calendario.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <!-- Field: Periodo Escolar -->
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Periodo escolar (año) *"
              label-for="periodo_escolar"
            >
              <b-form-input
                id="periodo_escolar"
                v-model="calendario.periodo_escolar"
                placeholder="Ingresa el código"
                @keyup='calendario.periodo_escolar = formatSoloNumeros(calendario.periodo_escolar)'
                type="number"
                :state="v$.calendario.periodo_escolar.$error === true
                ? false
                : null"
                @blur.native="v$.calendario.periodo_escolar.$touch"
              />
              <!-- Mensajes Error Validación -->
              <b-form-invalid-feedback
                v-if="v$.calendario.periodo_escolar.$error"
                id="periodo_escolarInfo"
                class="text-right"
              >
                <p v-for="error of v$.calendario.periodo_escolar.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <!-- Field: Establecimiento -->
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Establecimiento *"
              label-for="id_establecimiento"
            >
              <b-input-group
                class="input-group-merge"
                :class="v$.calendario.id_establecimiento.$error === true ? 'is-invalid' : ''"
              >
                <b-input-group-prepend is-text
                  :state="v$.calendario.id_establecimiento.$error === true
                  ? false
                  : null"
                >
                  +56
                </b-input-group-prepend>
                <b-form-input
                  id="id_establecimiento"
                  v-model="calendario.id_establecimiento"
                  placeholder="Ingresa el id_establecimiento"
                  :state="v$.calendario.id_establecimiento.$error === true
                  ? false
                  : null"
                  @blur.native="v$.calendario.id_establecimiento.$touch"
                />
              </b-input-group>
              <!-- Mensajes Error Validación -->
              <b-form-invalid-feedback
                v-if="v$.calendario.id_establecimiento.$error"
                id="correoInfo"
                class="text-right"
              >
                <p v-for="error of v$.calendario.id_establecimiento.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <!-- Field: fecha_inicio -->
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Fecha inicio *"
              label-for="fecha_inicio"
            >
              <!-- <b-form-input
                id="fecha_inicio"
                v-model="calendario.fecha_inicio"
                placeholder="Ingresa el fecha inicio"
                :state="v$.calendario.fecha_inicio.$error === true
                ? false
                : null"
                @blur.native="v$.calendario.fecha_inicio.$touch"
              /> -->
              <b-form-datepicker
                v-model="calendario.fecha_inicio"
                id="fecha_inicio"
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
                :state="v$.calendario.fecha_inicio.$error === true
                  ? false
                  : null"
                @blur.native="v$.calendario.fecha_inicio.$touch"
              />
              <!-- Mensajes Error Validación -->
              <b-form-invalid-feedback
                v-if="v$.calendario.fecha_inicio.$error"
                id="fecha_inicioInfo"
                class="text-right"
              >
                <p v-for="error of v$.calendario.fecha_inicio.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <!-- Field: Fecha_termino -->
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Fecha termino *"
              label-for="fecha_termino"
            >
              <!-- <b-form-input
                id="fecha_termino"
                v-model="calendario.fecha_termino"
                placeholder="Ingresa la fecha termino"
                :state="v$.calendario.fecha_termino.$error === true
                ? false
                : null"
                @blur.native="v$.calendario.fecha_termino.$touch"
              /> -->

              <b-form-datepicker
                v-model="calendario.fecha_termino"
                id="fecha_termino"
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
                :state="v$.calendario.fecha_termino.$error === true
                  ? false
                  : null"
                @blur.native="v$.calendario.fecha_termino.$touch"
              />
              <!-- Mensajes Error Validación -->
              <b-form-invalid-feedback
                v-if="v$.calendario.fecha_termino.$error"
                id="abreviaturaInfo"
                class="text-right"
              >
                <p v-for="error of v$.calendario.fecha_termino.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

        </b-row>

        <colLinea />

        <!-- Action Buttons -->
        <btnSubmit
          v-if="cargando"
          variant="primary"
          :btnText="btnSubmit"
          @processBtn="submitOption"
        />
      </b-form>
    </b-card>
  </b-overlay>
</template>

<script>

// ETIQUETAS
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BFormInvalidFeedback,
  BMedia, BButton, BAvatar, BOverlay, BCard, BInputGroup, BInputGroupPrepend,
  BFormDatepicker,
} from 'bootstrap-vue'
import vSelect from 'vue-select'

// VALIDACIONES
import useVuelidate from '@vuelidate/core'
import { required
  , maxLength, email, helpers } from '@vuelidate/validators'

// FORMATOS
import { formatos } from '@core/mixins/ui/formatos'

// COMPONENTES RECICLADOS
import btnSubmit from '../../../components/Form/btnSubmit.vue'
import colLinea from '../../../components/Form/colLinea.vue'

export default {
  components: {
    // ETIQUETAS
    BRow,
    BCol,
    BFormGroup,
    BInputGroup,
    BInputGroupPrepend,
    BFormInput,
    BForm,
    BFormInvalidFeedback,
    BMedia,
    BButton,
    BAvatar,
    BOverlay,
    BCard,
    BFormDatepicker,
    vSelect,

    // COMPONENTES RECICLADOS
    btnSubmit,
    colLinea,
  },
  mixins: [formatos],
  data() {
    return {
      cargando: true,
    }
  },
  props: {
    calendario: {
      type: Object,
      required: true,
    },
    btnSubmit: {
      type: String, // Texto del boton
      default: 'Guardar Calendario',
    },
  },

  validations() {
    return {
      calendario: {
        periodo_escolar: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener un máximo de 4 caracteres.'
            , maxLength(4)),
        },
        fecha_inicio: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
        },
        fecha_termino: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
        },
        codigo_calendario: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener un máximo de 50 caracteres.'
            , maxLength(50)),
        },
        id_establecimiento: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
        },
        // id_director: {
        //   $autoDirty: true,
        //   required: helpers.withMessage('El campo es requerido.', required),
        //   maxLength: helpers.withMessage('Debe tener un máximo de 150 caracteres.'
        //     , maxLength(150)),
        // },
      }
    }
  },
  methods: {
    submitOption() {
      this.v$.calendario.$touch()
      if (!this.v$.calendario.$invalid) {
        this.$emit('processForm', this.calendario)
      }
    },
    onFileSelected(e) {
      // Obtiene primera Imagen
      const file = e.target.files[0]
      this.cargarImg(file)
    },
    cargarImg(file) {
      // Objeto que permite trabajar con archivos
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = e => {
        this.calendario.insignia = e.target.result
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
