<template>
  <b-overlay
    :show="!cargando"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
  >
    <!-- Form: DOCENTE -->
    DOCENTE
    <b-row>

      <!-- NOMBRES -->
      <b-col
        cols="12"
        md="4"
      >
        <b-form-group
          label="Título *"
          label-for="nombres"
        >
          <b-form-input
            id="nombres"
            v-model="docente.nombres"
            placeholder="Ingresa los nombres"
            :state="v$.docente.nombres.$error === true
            ? false
            : null"
            @blur.native="v$.docente.nombres.$touch"
          />
          <!-- Validaciones -->
          <b-form-invalid-feedback
            v-if="v$.docente.nombres.$error"
            id="nombresInfo"
          >
            <p v-for="error of v$.docente.nombres.$errors" :key="error.$uid">
              {{ error.$message }}
            </p>
          </b-form-invalid-feedback>
        </b-form-group>
      </b-col>

      <!-- PRIMER APELLIDO -->
      <b-col
        cols="12"
        md="3"
      >
        <b-form-group
          label="Primer Apellido *"
          label-for="primerApellido"
        >
          <b-form-input
            id="primerApellido"
            v-model="docente.primerApellido"
            placeholder="Ingresa los primerApellido"
            :state="v$.docente.primerApellido.$error === true
            ? false
            : null"
            @blur.native="v$.docente.primerApellido.$touch"
          />
          <!-- Validaciones -->
          <b-form-invalid-feedback
            v-if="v$.docente.primerApellido.$error"
            id="primerApellidoInfo"
          >
            <p v-for="error of v$.docente.primerApellido.$errors" :key="error.$uid">
              {{ error.$message }}
            </p>
          </b-form-invalid-feedback>
        </b-form-group>
      </b-col>

      <!-- SEGUNDO APELLIDO -->
      <b-col
        cols="12"
        md="3"
      >
        <b-form-group
          label="Segundo Apellido *"
          label-for="segundoApellido"
        >
          <b-form-input
            id="segundoApellido"
            v-model="docente.segundoApellido"
            placeholder="Ingresa los segundoApellido"
            :state="v$.docente.segundoApellido.$error === true
            ? false
            : null"
            @blur.native="v$.docente.segundoApellido.$touch"
          />
          <!-- Validaciones -->
          <b-form-invalid-feedback
            v-if="v$.docente.segundoApellido.$error"
            id="segundoApellidoInfo"
          >
            <p v-for="error of v$.docente.segundoApellido.$errors" :key="error.$uid">
              {{ error.$message }}
            </p>
          </b-form-invalid-feedback>
        </b-form-group>
      </b-col>

      <!-- Teléfono -->
      <b-col
        cols="12"
        md="2"
      >
        <b-form-group
          label="Celular"
          label-for="celular"
        >
          <b-form-input
            id="celular"
            v-model="docente.celular"
            placeholder="Ingresa los celular"
            :state="v$.docente.celular.$error === true
            ? false
            : null"
            @blur.native="v$.docente.celular.$touch"
          />
          <!-- Validaciones -->
          <b-form-invalid-feedback
            v-if="v$.docente.celular.$error"
            id="celularInfo"
          >
            <p v-for="error of v$.docente.celular.$errors" :key="error.$uid">
              {{ error.$message }}
            </p>
          </b-form-invalid-feedback>
        </b-form-group>
      </b-col>

      <!-- CORREO -->
      <b-col
        cols="12"
        md="4"
      >
        <b-form-group
          label="Correo *"
          label-for="correo"
        >
          <b-form-input
            id="correo"
            v-model="docente.correo"
            placeholder="Ingresa los correo"
            :state="v$.docente.correo.$error === true
            ? false
            : null"
            @blur.native="v$.docente.correo.$touch"
          />
          <!-- Validaciones -->
          <b-form-invalid-feedback
            v-if="v$.docente.correo.$error"
            id="correoInfo"
          >
            <p v-for="error of v$.docente.correo.$errors" :key="error.$uid">
              {{ error.$message }}
            </p>
          </b-form-invalid-feedback>
        </b-form-group>
      </b-col>

    </b-row>

    <colLinea />
  </b-overlay>
</template>

<script>

// Etiquetas //
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BFormInvalidFeedback,
  BMedia, BButton, BAvatar, BOverlay, BCard, BFormSelect,
} from 'bootstrap-vue'

// Validaciones //
import useVuelidate from '@vuelidate/core'
import { required, maxLength, helpers, email } from '@vuelidate/validators'

// Componentes //
import colLinea from '../../../../components/Form/colLinea.vue'

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

    colLinea,
  },
  setup() {
    return {
      v$: useVuelidate(),
    }
  },
  data() {
    return {
      cargando: true,
      docente: [],
      // required,
      // email,
    }
  },
  props: {
  },
  validations() {
    return {
      docente: {
        rut: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener máximo 9 caracteres.', maxLength(9)),
        },
        nombres: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener máximo 150 caracteres.', maxLength(150)),
        },
        primerApellido: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener máximo 100 caracteres.', maxLength(100)),
        },
        segundoApellido: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener máximo 100 caracteres.', maxLength(100)),
        },
        correo: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener máximo 100 caracteres.', maxLength(100)),

          email: helpers.withMessage('Debe ser un correo valido.', email),
        },
        celular: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener máximo 11 caracteres.', maxLength(11)),
        },
        idRol: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
        },
      }
    }
  },
  methods: {
    submitOption() {
      console.log('this.v$ :', this.v$.docente)
      this.v$.docente.$touch()
      // if (!this.v$.docente.$invalid) {
      //   this.$emit('processForm', this.docente)
      // }
    },
  },
}
</script>
