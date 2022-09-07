<template>
  <b-overlay
    :show="!cargando"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
  >
    <b-form>
      <!-- Reunión Info: Input Fields -->
      <b-row>

        <!-- Field: FECHA -->
        <b-col
          cols="6"
          md="6"
        >
          <b-form-group
            label="Fecha *"
            label-for="fecha"
          >
            <!-- <b-form-input
              id="fecha"
              v-model="reunion.fecha"
              placeholder="Ingresa el fecha"
            /> -->

            <b-form-datepicker
              v-model="reunion.fecha"
              id="fecha"
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
                  <!-- :state="v$.reunion.fecha.$error === true
              ? false
              : null"
              @blur.native="v$.reunion.fecha.$touch" -->
            <!-- Mensajes Error Validación -->
            <!-- <b-form-invalid-feedback
              v-if="v$.reunion.fecha.$error"
              id="fechaInfo"
            >
              <p v-for="error of v$.reunion.fecha.$errors" :key="error.$uid">
                {{ error.$message }}
              </p>
            </b-form-invalid-feedback> -->
          </b-form-group>
        </b-col>

        <!-- Field: HORA -->
        <b-col
          cols="6"
          md="6"
        >
          <b-form-group
            label="Hora *"
            label-for="hora"
          >
            <b-form-timepicker
              v-model='reunion.hora'
              aria-controls='hora'
              placeholder="Selecciona una hora"
              hide-header
              locale='es-CL'
              no-close-button
              hour12
            />
            <!-- :state="v$.reunion.fecha.$error === true
              ? false
              : null"
              @blur.native="v$.reunion.fecha.$touch" -->
            <!-- Mensajes Error Validación -->
            <!-- <b-form-invalid-feedback
              v-if="v$.reunion.fecha.$error"
              id="fechaInfo"
            >
              <p v-for="error of v$.reunion.fecha.$errors" :key="error.$uid">
                {{ error.$message }}
              </p>
            </b-form-invalid-feedback> -->
          </b-form-group>
        </b-col>

        <!-- Field: Asistentes -->
        <b-col
          cols="12"
          md="12"
        >
          <b-form-group
            label="Asistentes *"
            label-for="asistentes"
          >
            <b-form-input
              id="asistentes"
              v-model="reunion.asistentes"
              placeholder="Ingresa los asistentes"
            />
              <!-- :state="v$.reunion.asistentes.$error === true
              ? false
              : null"
              @blur.native="v$.reunion.asistentes.$touch" -->
            <!-- <b-form-invalid-feedback
              v-if="v$.reunion.asistentes.$error"
              id="asistentesInfo"
            >
              <p v-for="error of v$.reunion.asistentes.$errors" :key="error.$uid">
                {{ error.$message }}
              </p>
            </b-form-invalid-feedback> -->
          </b-form-group>
        </b-col>

        <!-- Field: Acuerdos -->
        <b-col
          cols="12"
          md="12"
        >
          <b-form-group
            label="Acuerdos *"
            label-for="acuerdos"
          >
            <b-form-textarea
              id="acuerdos"
              placeholder="Ingresa los acuerdos"
              v-model="reunion.acuerdos"
              rows="4"
            />
              <!-- :state="v$.reunion.acuerdos.$error === true
              ? false
              : null"
              @blur.native="v$.reunion.acuerdos.$touch" -->
            <!-- <b-form-invalid-feedback
              v-if="v$.reunion.acuerdos.$error"
              id="acuerdosInfo"
            >
              <p v-for="error of v$.reunion.acuerdos.$errors" :key="error.$uid">
                {{ error.$message }}
              </p>
            </b-form-invalid-feedback> -->
          </b-form-group>
        </b-col>

      </b-row>

    </b-form>
  </b-overlay>
</template>

<script>

// Etiquetas //
import vSelect from 'vue-select'
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BFormInvalidFeedback,
  BMedia, BButton, BAvatar, BOverlay, BFormDatepicker, BFormTimepicker,
  BFormTextarea
} from 'bootstrap-vue'

// Validaciones //
import useVuelidate from '@vuelidate/core'
import { required, maxLength, email, helpers } from '@vuelidate/validators'

export default {
  components: {
    vSelect,

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
      // dependenciasOption: [
      //   { value: 'Municipal', text: 'Municipal' },
      //   { value: 'Paricular', text: 'Paricular' },
      //   { value: 'Particular Subvencionado', text: 'Particular Subvencionado' },
      // ],
    }
  },
  props: {
    reunion: {
      type: Object,
      required: true,
    },
  },
  validations() {
    return {
      reunion: {
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
    //   console.log('this.v$ :', this.v$.reunion)
    //   this.v$.reunion.$touch()
    //   // if (!this.v$.reunion.$invalid) {
    //   //   this.$emit('processForm', this.reunion)
    //   // }
    // },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
