<template>
  <b-overlay
    :show="!cargando"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
  >
    <!-- Form: PROFESIONAL ESPECIALIZADO -->
    PROFESIONAL ESPECIALIZADO
    <b-row>

      <!-- RBD -->
      <b-col
        cols="12"
        md="2"
      >
        <b-form-group
          label="Rut *"
          label-for="rut"
        >
          <b-form-input
            id="rut"
            v-model="profesionalEspecializado.rut"
            placeholder="Ingresa el rut"
            :state="v$.profesionalEspecializado.rut.$error === true
            ? false
            : null"
            @blur.native="v$.profesionalEspecializado.rut.$touch"
          />
          <!-- Validaciones -->
          <b-form-invalid-feedback
            v-if="v$.profesionalEspecializado.rut.$error"
            id="rutInfo"
          >
            <p v-for="error of v$.profesionalEspecializado.rut.$errors" :key="error.$uid">
              {{ error.$message }}
            </p>
          </b-form-invalid-feedback>
        </b-form-group>
      </b-col>

      <!-- NOMBRES -->
      <b-col
        cols="12"
        md="4"
      >
        <b-form-group
          label="Nombres *"
          label-for="nombres"
        >
          <b-form-input
            id="nombres"
            v-model="profesionalEspecializado.nombres"
            placeholder="Ingresa los nombres"
            :state="v$.profesionalEspecializado.nombres.$error === true
            ? false
            : null"
            @blur.native="v$.profesionalEspecializado.nombres.$touch"
          />
          <!-- Validaciones -->
          <b-form-invalid-feedback
            v-if="v$.profesionalEspecializado.nombres.$error"
            id="nombresInfo"
          >
            <p v-for="error of v$.profesionalEspecializado.nombres.$errors" :key="error.$uid">
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
            v-model="profesionalEspecializado.primerApellido"
            placeholder="Ingresa los primerApellido"
            :state="v$.profesionalEspecializado.primerApellido.$error === true
            ? false
            : null"
            @blur.native="v$.profesionalEspecializado.primerApellido.$touch"
          />
          <!-- Validaciones -->
          <b-form-invalid-feedback
            v-if="v$.profesionalEspecializado.primerApellido.$error"
            id="primerApellidoInfo"
          >
            <p v-for="error of v$.profesionalEspecializado.primerApellido.$errors" :key="error.$uid">
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
            v-model="profesionalEspecializado.segundoApellido"
            placeholder="Ingresa los segundoApellido"
            :state="v$.profesionalEspecializado.segundoApellido.$error === true
            ? false
            : null"
            @blur.native="v$.profesionalEspecializado.segundoApellido.$touch"
          />
          <!-- Validaciones -->
          <b-form-invalid-feedback
            v-if="v$.profesionalEspecializado.segundoApellido.$error"
            id="segundoApellidoInfo"
          >
            <p v-for="error of v$.profesionalEspecializado.segundoApellido.$errors" :key="error.$uid">
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
            v-model="profesionalEspecializado.celular"
            placeholder="Ingresa los celular"
            :state="v$.profesionalEspecializado.celular.$error === true
            ? false
            : null"
            @blur.native="v$.profesionalEspecializado.celular.$touch"
          />
          <!-- Validaciones -->
          <b-form-invalid-feedback
            v-if="v$.profesionalEspecializado.celular.$error"
            id="celularInfo"
          >
            <p v-for="error of v$.profesionalEspecializado.celular.$errors" :key="error.$uid">
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
            v-model="profesionalEspecializado.correo"
            placeholder="Ingresa los correo"
            :state="v$.profesionalEspecializado.correo.$error === true
            ? false
            : null"
            @blur.native="v$.profesionalEspecializado.correo.$touch"
          />
          <!-- Validaciones -->
          <b-form-invalid-feedback
            v-if="v$.profesionalEspecializado.correo.$error"
            id="correoInfo"
          >
            <p v-for="error of v$.profesionalEspecializado.correo.$errors" :key="error.$uid">
              {{ error.$message }}
            </p>
          </b-form-invalid-feedback>
        </b-form-group>
      </b-col>

      <!-- CORREO -->
      <b-col
        cols="12"
        md="6"
      >
        <b-form-group
          label="Rol *"
          label-for="rol"
        >
          <!-- <v-select
            v-model="profesionalEspecializado.idRol"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="title"
            :options="rolesOption"
          /> -->
          <!-- <b-form-select
            v-model="profesionalEspecializado.idRol"
            :options="rolesOption"
            :state="v$.profesionalEspecializado.idRol.$error === true
            ? false
            : null"
            @blur.native="v$.profesionalEspecializado.idRol.$touch"
          /> -->

          <!-- Validaciones -->
          <!-- <b-form-invalid-feedback
            v-if="v$.profesionalEspecializado.idRol.$error"
            id="correoInfo"
          >
            <p v-for="error of v$.profesionalEspecializado.idRol.$errors" :key="error.$uid">
              {{ error.$message }}
            </p>
          </b-form-invalid-feedback> -->
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
      profesionalEspecializado: [],
      // required,
      // email,
    }
  },
  props: {
  },
  validations() {
    return {
      profesionalEspecializado: {
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
      console.log('this.v$ :', this.v$.profesionalEspecializado)
      this.v$.profesionalEspecializado.$touch()
      // if (!this.v$.profesionalEspecializado.$invalid) {
      //   this.$emit('processForm', this.profesionalEspecializado)
      // }
    },
  },
}
</script>
