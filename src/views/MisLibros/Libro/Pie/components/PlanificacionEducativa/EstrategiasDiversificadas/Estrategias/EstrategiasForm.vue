<template>
  <b-overlay
    :show="!cargando"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
  >
    <b-form>
      <!-- Reunión Info: Input Fields -->
      <b-row>

        <!-- Field: ESTRATEGIA -->
        <b-col
          cols="12"
          md="12"
        >
          <b-form-group
            label="Estrategia *"
            label-for="estrategia"
          >
            <b-form-textarea
              id="estrategia"
              placeholder="Ingresa la estrategia"
              v-model="estrategia.estrategia"
              rows="2"
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

        <!-- Field: AMBITO -->
        <b-col
          cols="12"
          md="12"
        >
          <b-form-group
            label="Ámbito o asignatura donde se aplicará *"
            label-for="ambitoasignatura"
          >
            <b-form-input
              id="ambitoasignatura"
              v-model="estrategia.ambitoasignatura"
              placeholder="Ingresa el ámbito o asignatura"
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

        <!-- Field: PERIODO -->
        <b-col
          cols="12"
          md="12"
        >
          <b-form-group
            label="Período de tiempo en que se aplicará *"
            label-for="periodo"
          >
            <b-form-input
              id="periodo"
              v-model="estrategia.periodo"
              placeholder="Ingresa el periodo"
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

        <!-- Field: CRITERIOS -->
        <b-col
          cols="12"
          md="12"
        >
          <b-form-group
            label="Criterios para la evaluación de la estrategia *"
            label-for="criterios"
          >
            <b-form-textarea
              id="criterios"
              placeholder="Ingresa los criterios"
              v-model="estrategia.criterios"
              rows="2"
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
    estrategia: {
      type: Object,
      required: true,
    },
  },
  validations() {
    return {
      estrategia: {
        // rbd: {
        //   $autoDirty: true,
        //   required: helpers.withMessage('El campo es requerido.', required),
        //   maxLength: helpers.withMessage('Debe tener un máximo de 8 caracteres.', maxLength(8)),
        // },
        // nombre: {
        //   $autoDirty: true,
        //   required: helpers.withMessage('El campo es requerido.', required),
        //   maxLength: helpers.withMessage('Debe tener un máximo de 250 caracteres.', maxLength(250)),
        // },
        // abreviatura: {
        //   $autoDirty: true,
        //   required: helpers.withMessage('El campo es requerido.', required),
        //   maxLength: helpers.withMessage('Debe tener un máximo de 10 caracteres.', maxLength(10)),
        // },
        // correo: {
        //   $autoDirty: true,
        //   required: helpers.withMessage('El campo es requerido.', required),
        //   email: helpers.withMessage('Debe ser un correo valido.', email),
        // },
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
