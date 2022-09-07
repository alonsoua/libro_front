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
      <!-- Form: USUARIO -->
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
              v-model="usuario.rut"
              placeholder="Ingresa el rut"
              :state="v$.usuario.rut.$error === true
              ? false
              : null"
              @blur.native="v$.usuario.rut.$touch"
            />
            <!-- Validaciones -->
            <b-form-invalid-feedback
              v-if="v$.usuario.rut.$error"
              id="rutInfo"
            >
              <p v-for="error of v$.usuario.rut.$errors" :key="error.$uid">
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
            label="Nombre(s) *"
            label-for="nombres"
          >
            <b-form-input
              id="nombres"
              v-model="usuario.nombres"
              placeholder="Ingresa el primer y/o segundo nombre"
              :state="v$.usuario.nombres.$error === true
              ? false
              : null"
              @blur.native="v$.usuario.nombres.$touch"
            />
            <!-- Validaciones -->
            <b-form-invalid-feedback
              v-if="v$.usuario.nombres.$error"
              id="nombresInfo"
            >
              <p v-for="error of v$.usuario.nombres.$errors" :key="error.$uid">
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
              v-model="usuario.primerApellido"
              placeholder="Ingresa el primer apellido"
              :state="v$.usuario.primerApellido.$error === true
              ? false
              : null"
              @blur.native="v$.usuario.primerApellido.$touch"
            />
            <!-- Validaciones -->
            <b-form-invalid-feedback
              v-if="v$.usuario.primerApellido.$error"
              id="primerApellidoInfo"
            >
              <p v-for="error of v$.usuario.primerApellido.$errors" :key="error.$uid">
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
              v-model="usuario.segundoApellido"
              placeholder="Ingresa el segundo apellido"
              :state="v$.usuario.segundoApellido.$error === true
              ? false
              : null"
              @blur.native="v$.usuario.segundoApellido.$touch"
            />
            <!-- Validaciones -->
            <b-form-invalid-feedback
              v-if="v$.usuario.segundoApellido.$error"
              id="segundoApellidoInfo"
            >
              <p v-for="error of v$.usuario.segundoApellido.$errors" :key="error.$uid">
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
              v-model="usuario.celular"
              placeholder="Ingresa el celular"
              :state="v$.usuario.celular.$error === true
              ? false
              : null"
              @blur.native="v$.usuario.celular.$touch"
            />
            <!-- Validaciones -->
            <b-form-invalid-feedback
              v-if="v$.usuario.celular.$error"
              id="celularInfo"
            >
              <p v-for="error of v$.usuario.celular.$errors" :key="error.$uid">
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
              v-model="usuario.correo"
              placeholder="Ingresa el correo"
              :state="v$.usuario.correo.$error === true
              ? false
              : null"
              @blur.native="v$.usuario.correo.$touch"
            />
            <!-- Validaciones -->
            <b-form-invalid-feedback
              v-if="v$.usuario.correo.$error"
              id="correoInfo"
            >
              <p v-for="error of v$.usuario.correo.$errors" :key="error.$uid">
                {{ error.$message }}
              </p>
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>

        <!-- ESTABLECIMIENTO -->
        <b-col
          cols="12"
          md="3"
        >
          <b-form-group
            label="Establecimiento *"
            label-for="establecimiento"
          >
            <b-form-select
              v-model="usuario.idEstablecimiento"
              :options="establecimientoOption"
              :state="v$.usuario.idEstablecimiento.$error === true
              ? false
              : null"
              @blur.native="v$.usuario.idEstablecimiento.$touch"
              @change="changeRol"
            />

            <!-- Validaciones -->
            <b-form-invalid-feedback
              v-if="v$.usuario.idEstablecimiento.$error"
              id="correoInfo"
            >
              <p v-for="error of v$.usuario.idEstablecimiento.$errors" :key="error.$uid">
                {{ error.$message }}
              </p>
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>

        <!-- ROL -->
        <b-col
          cols="12"
          md="3"
        >
          <b-form-group
            label="Rol *"
            label-for="rol"
          >
            <!-- <v-select
              v-model="usuario.idRol"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="title"
              :options="rolesOption"
            /> -->
            <b-form-select
              v-model="usuario.idRol"
              :options="rolesOption"
              :state="v$.usuario.idRol.$error === true
              ? false
              : null"
              @blur.native="v$.usuario.idRol.$touch"
              @change="changeRol"
            />

            <!-- Validaciones -->
            <b-form-invalid-feedback
              v-if="v$.usuario.idRol.$error"
              id="correoInfo"
            >
              <p v-for="error of v$.usuario.idRol.$errors" :key="error.$uid">
                {{ error.$message }}
              </p>
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>

      </b-row>

      <colLinea />

      <!-- COMPONENTS -->
      <form-docente v-if="rolSelected === 5"/>
      <form-profesional-especializado v-if="rolSelected === 7"/>

      <!-- Action Buttons -->
      <btnSubmit
        v-if="cargando"
        variant="primary"
        :btnText="btnSubmit"
        @processBtn="submitOption"
      />
    </b-card>
  </b-overlay>
</template>

<script>
// ETIQUETAS //
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BFormInvalidFeedback,
  BMedia, BButton, BAvatar, BOverlay, BCard, BFormSelect,
} from 'bootstrap-vue'
// import vSelect from 'vue-select'

// IMÁGEN //
import { avatarText } from '@core/utils/filter'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref } from '@vue/composition-api'

// VALIDACIONES //
import useVuelidate from '@vuelidate/core'
import { required, maxLength, helpers, email } from '@vuelidate/validators'

// COMPONENTS //
import btnSubmit from '../../../components/Form/btnSubmit.vue'
import colLinea from '../../../components/Form/colLinea.vue'

import formDocente from './Form/FormDocente.vue'
import formProfesionalEspecializado from './Form/FormProfesionalEspecializado.vue'

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

    btnSubmit,
    colLinea,

    formDocente,
    formProfesionalEspecializado,
  },
  setup(props) {
    // ? Demo Purpose => Update image on click of update
    const refInputEl = ref(null)
    const previewEl = ref(null)

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, base64 => {
      // eslint-disable-next-line no-param-reassign
      props.usuario.insignia = base64
    })

    return {
      v$: useVuelidate(),
      avatarText,
      previewEl,
      refInputEl,
      inputImageRenderer,
    }
  },
  data() {
    return {
      cargando: true,
      rolSelected: null,
      // required,
      // email,
      rolesOption: [
        { value: null, text: 'Selecciona el rol...' },
        { value: 1, text: 'Super Admin' },
        { value: 2, text: 'Administrador Servicio Local' },
        { value: 3, text: 'Director' },
        { value: 4, text: 'Jefe UTP' },
        { value: 5, text: 'Docente' },
        { value: 6, text: 'Profesor Especializado' },
        { value: 7, text: 'Profesional Especializado' },
        { value: 8, text: 'Administrativo Matriculas' },
      ],
      establecimientoOption: [
        { value: null, text: 'Selecciona el establecimiento...' },
        { value: 1, text: 'Escuela Básica La Laguna' },
        { value: 2, text: 'Escuela Básica El Rincón' },
        { value: 2, text: 'Escuela Básica La Chocota' },
      ],
    }
  },
  props: {
    usuario: {
      type: Object,
      required: true,
    },
    btnSubmit: {
      type: String, // Texto del boton
      default: 'Guardar Usuario',
    },
  },
  validations() {
    return {
      usuario: {
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
        idEstablecimiento: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
        },
      }
    }
  },
  methods: {
    changeRol() {
      this.rolSelected = this.usuario.idRol
    },
    submitOption() {
      console.log('this.v$ :', this.v$.usuario)
      this.v$.usuario.$touch()
      this.$emit('processForm', this.usuario)
      // if (!this.v$.usuario.$invalid) {
      // }
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
        this.usuario.insignia = e.target.result
      }
    },
  },
}
</script>
