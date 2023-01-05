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
      <b-row class="mt-1 pl-25 pr-25  pt-25 text-left">

        <b-col
          cols="12"
          md="2"
          class="mb-25"
        >
          <b-card-sub-title>
            Información Personal
          </b-card-sub-title>
        </b-col>
        <b-col
          cols="12"
          md="10"
          class="mb-25"
        >
          <b-card-sub-title>
            <hr class="mt-75">
          </b-card-sub-title>
        </b-col>

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
              placeholder="11.111.111-1"
              :state="v$.usuario.rut.$error === true
              ? false
              : null"
              @blur.native="v$.usuario.rut.$touch"
              @keyup="usuario.rut = formatRut(usuario.rut)"
            />
            <!-- Validaciones -->
            <b-form-invalid-feedback
              v-if="v$.usuario.rut.$error"
              id="rutInfo"
              class="pb-0"
            >
              <p
                v-for="error of v$.usuario.rut.$errors"
                :key="error.$uid"
              >
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
            label-for="nombre"
          >
            <b-form-input
              id="nombre"
              v-model="usuario.nombre"
              placeholder="Luis Ignacio"
              :state="v$.usuario.nombre.$error === true
              ? false
              : null"
              @blur.native="v$.usuario.nombre.$touch"
            />
            <!-- Validaciones -->
            <b-form-invalid-feedback
              v-if="v$.usuario.nombre.$error"
              id="nombreInfo"
            >
              <p
                v-for="error of v$.usuario.nombre.$errors"
                :key="error.$uid"
              >
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
            label="Primer apellido *"
            label-for="primer_apellido"
          >
            <b-form-input
              id="primer_apellido"
              v-model="usuario.primer_apellido"
              placeholder="Uribe"
              :state="v$.usuario.primer_apellido.$error === true
              ? false
              : null"
              @blur.native="v$.usuario.primer_apellido.$touch"
            />
            <!-- Validaciones -->
            <b-form-invalid-feedback
              v-if="v$.usuario.primer_apellido.$error"
              id="primer_apellidoInfo"
            >
              <p
                v-for="error of v$.usuario.primer_apellido.$errors"
                :key="error.$uid"
              >
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
            label="Segundo apellido *"
            label-for="segundo_apellido"
          >
            <b-form-input
              id="segundo_apellido"
              v-model="usuario.segundo_apellido"
              placeholder="Perez"
              :state="v$.usuario.segundo_apellido.$error === true
              ? false
              : null"
              @blur.native="v$.usuario.segundo_apellido.$touch"
            />
            <!-- Validaciones -->
            <b-form-invalid-feedback
              v-if="v$.usuario.segundo_apellido.$error"
              id="segundo_apellidoInfo"
            >
              <p
                v-for="error of v$.usuario.segundo_apellido.$errors"
                :key="error.$uid"
              >
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
            label="Correo *"
            label-for="correo"
          >
            <b-input-group
              :class="v$.usuario.correo.$error === false
                ? ''
                : 'is-invalid'"
            >
              <b-input-group-prepend is-text>
                <feather-icon icon="MailIcon" />
              </b-input-group-prepend>
              <b-form-input
                id="correo"
                v-model="usuario.correo"
                placeholder="luis.uribe@gmail.com"
                :class="v$.usuario.correo.$error === false
                  ? ''
                  : 'border-danger rounded-right'"
                @blur.native="v$.usuario.correo.$touch"
                :state="v$.usuario.correo.$error === true
                ? false
                : null"
              />
            </b-input-group>
            <!-- Validaciones -->
            <b-form-invalid-feedback
              v-if="v$.usuario.correo.$error"
              id="correoInfo"
            >
              <p
                v-for="error of v$.usuario.correo.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </p>
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>

        <!-- CELULAR -->
        <b-col
          cols="12"
          md="6"
        >
          <b-form-group
            label="Celular"
            label-for="celular"
          >
            <b-input-group
              :class="v$.usuario.celular.$error === false ? '' : 'is-invalid'"
            >
              <b-input-group-prepend is-text>
                <feather-icon icon="SmartphoneIcon" />
              </b-input-group-prepend>
              <b-form-input
                id="celular"
                v-model="usuario.celular"
                placeholder="56978717595"
                :state="v$.usuario.celular.$error === true
                ? false
                : null"
                @keyup='usuario.celular = formatSoloNumerosMaxLenght(usuario.celular, 11)'
                @blur.native="v$.usuario.celular.$touch"
              />
            </b-input-group>
            <!-- Validaciones -->
            <b-form-invalid-feedback
              v-if="v$.usuario.celular.$error"
              id="celularInfo"
            >
              <p
                v-for="error of v$.usuario.celular.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </p>
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>

        <b-col
          cols="12"
          md="1"
          class="mb-25 mt-2"
        >
          <b-card-sub-title>
            Dirección
          </b-card-sub-title>
        </b-col>
        <b-col
          cols="12"
          md="11"
          class="mb-25 mt-2"
        >
          <b-card-sub-title >
            <hr class="mt-75">
          </b-card-sub-title>
        </b-col>

        <!-- Nombre CALLE -->
        <b-col
          cols="12"
          md="6"
        >
          <b-form-group
            label="Calle *"
            label-for="nombre_calle"
          >
            <b-form-input
              id="nombre_calle"
              v-model="usuario.nombre_calle"
              placeholder="Av. General Borgoño"
              :state="v$.usuario.nombre_calle.$error === true
              ? false
              : null"
              @blur.native="v$.usuario.nombre_calle.$touch"
            />
            <!-- Validaciones -->
            <b-form-invalid-feedback
              v-if="v$.usuario.nombre_calle.$error"
              id="nombre_calleInfo"
            >
              <p
                v-for="error of v$.usuario.nombre_calle.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </p>
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>

        <!-- NUMERO -->
        <b-col
          cols="12"
          md="2"
        >
          <b-form-group
            label="Numeración *"
            label-for="numero"
          >
            <b-input-group
              :class="v$.usuario.numero.$error === false
                ? ''
                : 'is-invalid'"
            >
              <b-input-group-prepend is-text>
                #
              </b-input-group-prepend>
              <b-form-input
                id="numero"
                v-model="usuario.numero"
                placeholder="1305"
                :state="v$.usuario.numero.$error === true
                ? false
                : null"
                @keyup='usuario.numero = formatSoloNumerosMaxLenght(usuario.numero, 8)'
                @blur.native="v$.usuario.numero.$touch"
              />
            </b-input-group>
            <!-- Validaciones -->
            <b-form-invalid-feedback
              v-if="v$.usuario.numero.$error"
              id="numeroInfo"
            >
              <p
                v-for="error of v$.usuario.numero.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </p>
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>

        <!-- BLOCK -->
        <b-col
          cols="12"
          md="2"
        >
          <b-form-group
            label="Block"
            label-for="block"
          >
            <b-form-input
              id="block"
              v-model="usuario.block"
              placeholder="A"
              :state="v$.usuario.block.$error === true
                ? false
                : null"
              @blur.native="v$.usuario.block.$touch"
            />
              <!-- @keyup='usuario.block = formatSoloNumerosMaxLenght(usuario.block, 8)' -->

            <!-- Validaciones -->
            <b-form-invalid-feedback
              v-if="v$.usuario.block.$error"
              id="blockInfo"
            >
              <p
                v-for="error of v$.usuario.block.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </p>
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>

        <!-- DEPARTAMENTO -->
        <b-col
          cols="12"
          md="2"
        >
          <b-form-group
            label="Departamento"
            label-for="departamento"
          >
            <b-input-group>
              <b-input-group-prepend is-text>
                #
              </b-input-group-prepend>
              <b-form-input
                id="departamento"
                v-model="usuario.departamento"
                placeholder="707"
                @keyup='usuario.departamento = formatSoloNumerosMaxLenght(usuario.departamento, 8)'
              />
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col
          cols="12"
          md="1"
          class="mb-25 mt-2"
        >
          <b-card-sub-title>
            Permisos
          </b-card-sub-title>
        </b-col>
        <b-col
          cols="12"
          md="11"
          class="mb-25 mt-2"
        >
          <b-card-sub-title >
            <hr class="mt-75">
          </b-card-sub-title>
        </b-col>

        <!-- ESTABLECIMIENTO -->
        <b-col
          v-if="$can('readEstablecimiento', 'usuarios')"
          cols="12"
          md="12"
        >
          <b-form-group
            label="Establecimiento *"
            label-for="establecimiento"
          >
            <b-form-select
              v-model="usuario.id_establecimiento"
              :options="establecimientoOption"
              :state="v$.usuario.id_establecimiento.$error === true
              ? false
              : null"
              @blur.native="v$.usuario.id_establecimiento.$touch"
              @change="changeRol"
            />

            <!-- Validaciones -->
            <b-form-invalid-feedback
              v-if="v$.usuario.id_establecimiento.$error"
              id="correoInfo"
            >
              <p
                v-for="error of v$.usuario.id_establecimiento.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </p>
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>

        <!-- ROL -->
        <b-col
          cols="12"
          md="12"
        >
          <b-form-group
            label="Cargo *"
            label-for="rol"
          >
            <!-- <v-select
              v-model="usuario.id_rol"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="title"
              :options="rolesOption"
            /> -->
            <b-form-select
              v-model="usuario.id_rol"
              :options="rolesOption"
              :state="v$.usuario.id_rol.$error === true
              ? false
              : null"
              @blur.native="v$.usuario.id_rol.$touch"
              @change="changeRol"
            />

            <!-- Validaciones -->
            <b-form-invalid-feedback
              v-if="v$.usuario.id_rol.$error"
              id="correoInfo"
            >
              <p
                v-for="error of v$.usuario.id_rol.$errors"
                :key="error.$uid"
              >
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
        <!-- v-if="cargando" -->

      <b-row>
        <b-col
          cols="12"
          md="10"
        >
        </b-col>
        <b-col
          cols="12"
          md="2"
        >
          <btnSubmit
            class="float-right"
            variant="primary"
            :btnText="btnSubmit"
            :modulo="nombre_permiso"
            @processBtn="submitOption"
          />
        </b-col>
      </b-row>
    </b-card>
  </b-overlay>
</template>

<script>
// ETIQUETAS //
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BFormInvalidFeedback,
  BMedia, BButton, BAvatar, BOverlay, BCard, BFormSelect, BInputGroup,
  BInputGroupPrepend, BCardSubTitle
} from 'bootstrap-vue'

import { mapGetters, mapActions, mapMutations } from 'vuex'

// IMÁGEN //
import { avatarText } from '@core/utils/filter'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref } from '@vue/composition-api'

// VALIDACIONES //
import useVuelidate from '@vuelidate/core'
import { required, maxLength, helpers, email } from '@vuelidate/validators'

// MIXINS
import { rut } from '@core/mixins/ui/rut'
import { formatos } from '@core/mixins/ui/formatos'


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
    BInputGroup,
    BInputGroupPrepend,
    BCardSubTitle,
    btnSubmit,
    colLinea,

    formDocente,
    formProfesionalEspecializado,
  },
  mixins: [rut, formatos],
  data() {
    return {
      cargando: true,
      nombre_permiso: 'usuarios',

      id_rol_user: null,
      id_establecimiento_user: null,

      rolSelected: null,

      rolesOption: [],

      establecimientoOption: [],
    }
  },
  computed: {
    ...mapGetters({
      getRoles: 'roles/getRoles',
      getEstablecimientos: 'establecimientos/getEstablecimientos',
      user: 'auth/user',
    }),
  },
  watch:{
    user (val){
      this.id_rol_user = val.id_rol
      this.id_establecimiento_user = val.id_establecimiento

      this.cargarEstablecimientos(this.id_rol_user)
    },
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
    let establecimiento = new Object()
    if(this.$can('readEstablecimiento', 'usuarios')) {
      establecimiento = {
        $autoDirty: true,
        required: helpers.withMessage('El campo es requerido.', required),
      }
    }

    return {
      usuario: {
        rut: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener máximo 13 caracteres.', maxLength(13)),
        },
        nombre: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener máximo 150 caracteres.', maxLength(150)),
        },
        primer_apellido: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener máximo 100 caracteres.', maxLength(100)),
        },
        segundo_apellido: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener máximo 100 caracteres.', maxLength(100)),
        },
        nombre_calle: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener máximo 100 caracteres.', maxLength(100)),
        },
        numero: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
        },

        block: {
          $autoDirty: true,
          maxLength: helpers.withMessage('Debe tener máximo 10 caracteres.', maxLength(10)),
        },
        correo: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener máximo 100 caracteres.', maxLength(100)),

          email: helpers.withMessage('Debe ser un correo valido.', email),
        },
        celular: {
          $autoDirty: true,
          // maxLength: helpers.withMessage('Debe tener máximo 11 caracteres.', maxLength(11)),
          // required: helpers.withMessage('El campo es requerido.', required),
        },
        id_rol: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
        },
        id_establecimiento: establecimiento,
      }
    }
  },
  mounted() {
    this.cargarDatosUser()
    this.cargaRoles()
    this.setRut()
    console.log('this.usuario :', this.usuario)
  },
  methods: {
    ...mapActions({
      fetchRolesDirectivos: 'roles/fetchRolesDirectivos',
      fetchEstablecimientos: 'establecimientos/fetchEstablecimientos',
      attempt: 'auth/attempt',
    }),
    setRut(){
      if (this.usuario.rut !== '' && this.usuario.dv !== '') {
        this.usuario.rut = this.formatRut(this.usuario.rut+''+this.usuario.dv)
      }
    },
    cargarEstablecimientos(id_rol_user) {
      // || id_rol_user === 5 || id_rol_user === 14
      if (id_rol_user === 1 ) {
        this.fetchEstablecimientos().then(() => {
        this.establecimientoOption = [{value: null, text: 'Selecciona un establecimiento...' }]
        this.getEstablecimientos.forEach(establecimiento => {
          this.establecimientoOption.push(
            {
              value: establecimiento.id,
              text: establecimiento.nombre
            }
          )
        })
      })
      }
    },
    cargarDatosUser() {
      this.attempt()
    },
    cargaRoles(){
      this.fetchRolesDirectivos().then(() => {
        this.rolesOption = [{value: null, text: 'Selecciona un cargo...' }]
        this.getRoles.forEach(rol => {
          this.rolesOption.push(
            {
              value: rol.id,
              text: rol.nombre
            }
          )
        })
      })
    },
    changeRol() {
      this.rolSelected = this.usuario.id_rol
    },
    submitOption() {
      this.v$.usuario.$touch()
      if (!this.v$.usuario.$invalid) {
        // inspector
        // || id_rol_user === 8
        if (this.id_rol_user === 3 || this.id_rol_user === 4) {
          this.usuario.id_establecimiento = this.id_establecimiento_user
        }
        if (this.usuario.id_establecimiento !== null) {
          const rutNum = this.usuario.rut.replace('-', '')
                         .replace('.', '').replace('.', '')
          const rutSinDv = rutNum.substring(0, rutNum.length - 1)
          const dv = rutNum.substring(rutNum.length - 1, rutNum.length)

          let {
            rut,
            ...usuario
          } = this.usuario

          usuario.rut = rutSinDv
          usuario.dv = dv
          this.$emit('processForm', usuario)
        } else {
          console.log('-- ERROR: Usted no tiene permisos para crear nuevos usuarios! --')
        }
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
        this.usuario.insignia = e.target.result
      }
    },
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
}
</script>
