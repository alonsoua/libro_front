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
        <!-- Libro Info: Input Fields -->
        <b-row >
          <!-- Field: Profesor Jefe -->
          <b-col
            xs="12"
            md="6"
          >
            <b-form-group
              label="Profesor Jefe"
              label-for="profesor"
            >
              <h5 style="padding-top: 10px;">
                	Paula Macarena Saavedra Sandoval
              </h5>
            </b-form-group>
          </b-col>

          <!-- Field: Libro -->
          <b-col
            xs="12"
            md="6"
          >
            <b-form-group
              label="Curso *"
              label-for="curso"
            >
              <!-- <v-select
                v-model="libro.idCurso"
                placeholder="Selecciona el Curso"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="nombre"
                :options="cursosOption"
                :reduce="option => option.id"
                input-id="idCurso"
              /> -->

              <b-form-select
                v-model="libro.idCurso"
                :options="cursosOption"
                variant="primary"
              />
            </b-form-group>
          </b-col>

        </b-row>

      </b-form>
    </b-card>
  </b-overlay>
</template>

<script>

// Etiquetas //
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BFormInvalidFeedback,
  BMedia, BButton, BAvatar, BOverlay, BCard, BFormSelect
} from 'bootstrap-vue'
// import vSelect from 'vue-select'

// Validaciones //
import useVuelidate from '@vuelidate/core'
import { required, maxLength, email, helpers } from '@vuelidate/validators'

// Componentes //

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
    // vSelect,
    BOverlay,
    BCard,
    BFormSelect,
  },
  setup() {
    return {
      v$: useVuelidate(),
    }
  },
  data() {
    return {
      cargando: true,
      // email,
      // required,
      cursosOption: [
        { value: 1, text: '1ero Básico A' },
        { value: 2, text: '1ero Básico B' },
        { value: 3, text: '2do Básico A' },
        { value: 4, text: '2do Básico B' },
        { value: 5, text: '3ero Básico A' },
      ],
    }
  },
  props: {
    libro: {
      type: Object,
      required: true,
    },
  },
  validations() {
    return {
      libro: {
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
