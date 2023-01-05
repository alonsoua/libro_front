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
        <!-- Horario Info: Input Fields -->
        <b-row>

          <!-- Field: RBD -->
          <b-col
            cols="12"
            md="2"
          >
            <b-form-group
              label="RBD *"
              label-for="rbd"
            >
              <b-form-input
                id="rbd"
                v-model="horario.rbd"
                placeholder="Ingresa el rbd"
                :state="v$.horario.rbd.$error === true
                ? false
                : null"
                @blur.native="v$.horario.rbd.$touch"
              />
              <!-- Mensajes Error Validación -->
              <b-form-invalid-feedback
                v-if="v$.horario.rbd.$error"
                id="rbdInfo"
              >
                <p v-for="error of v$.horario.rbd.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <!-- Field: Nombre -->
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Nombre *"
              label-for="nombre"
            >
              <b-form-input
                id="nombre"
                v-model="horario.nombre"
                placeholder="Ingresa el nombre"
                :state="v$.horario.nombre.$error === true
                ? false
                : null"
                @blur.native="v$.horario.nombre.$touch"
              />
              <!-- Mensajes Error Validación -->
              <b-form-invalid-feedback
                v-if="v$.horario.nombre.$error"
                id="nombreInfo"
              >
                <p v-for="error of v$.horario.nombre.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          </b-col>

          </calendar>
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

// Etiquetas //
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BFormInvalidFeedback,
  BMedia, BButton, BAvatar, BOverlay, BCard,
} from 'bootstrap-vue'
import vSelect from 'vue-select'

// Imágen //
import { avatarText } from '@core/utils/filter'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref } from '@vue/composition-api'

// Validaciones //
import useVuelidate from '@vuelidate/core'
import { required, maxLength, email, helpers } from '@vuelidate/validators'

// Componentes //
import calendar from '../components/Calendar.vue'
import btnSubmit from '../../../components/Form/btnSubmit.vue'
import colLinea from '../../../components/Form/colLinea.vue'

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
    vSelect,
    BOverlay,
    BCard,
    calendar,
    btnSubmit,
    colLinea,
  },
  setup(props) {
    // ? Demo Purpose => Update image on click of update
    const refInputEl = ref(null)
    const previewEl = ref(null)

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, base64 => {
      // eslint-disable-next-line no-param-reassign
      props.horario.insignia = base64
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
    horario: {
      type: Object,
      required: true,
    },
    btnSubmit: {
      type: String, // Texto del boton
      default: 'Guardar Horario',
    },
  },
  validations() {
    return {
      horario: {
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
        // correo: {
        //   required,
        //   email,
        //   maxLength: maxLength(80),
        // },
        // telefono: {
        //   required,
        //   maxLength: maxLength(25),
        // },
        // direccion: {
        //   required,
        //   maxLength: maxLength(250),
        // },
        // dependencia: {
        //   required,
        // },
        // estado: {},
  methods: {
    submitOption() {
      console.log('this.v$ :', this.v$.horario)
      this.v$.horario.$touch()
      // if (!this.v$.horario.$invalid) {
      //   this.$emit('processForm', this.horario)
      // }
    },
  },
}
</script>
